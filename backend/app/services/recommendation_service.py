from openai import AsyncOpenAI
import httpx
import json
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
from app.models.garment import Garment
from app.models.outfit import Outfit, OutfitItem
from app.models.feedback import Feedback
from app.services.weather_service import get_weather


SYSTEM_PROMPT = """You are StyleMirror, an expert personal stylist specializing in Indian fashion.
You deeply understand Indian office culture, ethnic occasions, Bollywood-inspired trends, 
regional dress codes, and Indian climate (summer heat, monsoon humidity, North Indian winters).
You ONLY suggest outfits using garments the user already owns (referenced by ID).
Respond ONLY with valid JSON, no markdown, no explanation outside the JSON."""


def _build_garment_list(garments: List[Garment]) -> str:
    lines = []
    for g in garments:
        last_worn = g.last_worn_at.strftime("%Y-%m-%d") if g.last_worn_at else "Never"
        lines.append(
            f"ID:{g.id} | {g.category} - {g.name} | "
            f"Colors: {', '.join(g.colors)} | Warmth: {g.warmth}/5 | "
            f"Formality: {g.formality}/5 | Occasions: {', '.join(g.occasions)} | "
            f"Seasons: {', '.join(g.seasons)} | Worn: {g.worn_count}x | Last worn: {last_worn}"
        )
    return "\n".join(lines)


def _build_feedback_summary(feedbacks: List[Feedback]) -> str:
    liked = [f for f in feedbacks if f.rating == "like"]
    skipped = [f for f in feedbacks if f.rating == "skip"]
    return f"Liked {len(liked)} outfits, skipped {len(skipped)} outfits recently."


async def generate_outfit_recommendations(
    db: AsyncSession,
    user_id: int,
    city: str,
    occasion: str,
) -> List[dict]:
    garments_result = await db.execute(
        select(Garment).where(Garment.user_id == user_id, Garment.is_active == True)
    )
    garments = list(garments_result.scalars().all())

    if len(garments) < 2:
        return []

    feedback_result = await db.execute(
        select(Feedback).where(Feedback.user_id == user_id).order_by(Feedback.created_at.desc()).limit(20)
    )
    feedbacks = list(feedback_result.scalars().all())

    weather = await get_weather(city)
    garment_list = _build_garment_list(garments)
    feedback_summary = _build_feedback_summary(feedbacks)

    prompt = f"""Create 3 complete outfit recommendations for an Indian user.

CONTEXT:
- Occasion: {occasion}
- City: {weather['city']}
- Weather: {weather['description']}, {weather['temp']}°C (feels like {weather['feels_like']}°C), {weather['humidity']}% humidity
- Feedback history: {feedback_summary}

AVAILABLE WARDROBE (use ONLY these garment IDs):
{garment_list}

RULES:
1. Each outfit needs at minimum: top + bottom + footwear (use actual IDs from wardrobe)
2. Colors must harmonize — complementary, analogous, or neutral combos
3. Formality must match occasion: office=3-5, party=3-5, casual=1-3, ethnic/festive=any, sports=1-2
4. Warmth must suit weather: above 30°C pick warmth 1-2, 20-30°C warmth 2-3, below 20°C warmth 3-5
5. Vary items across 3 outfits (don't repeat the same garments)
6. Prioritize items not worn recently
7. For Indian ethnic/festive occasions, include ethnic wear if available

RESPOND WITH EXACTLY:
{{
    "outfits": [
        {{
            "garment_ids": [1, 2, 3],
            "outfit_name": "Smart Casual Monday",
            "reason": "2-3 sentences on why this complete look works",
            "style_tip": "One actionable tip to elevate the outfit",
            "occasion_fit_score": 9,
            "weather_fit_score": 8
        }}
    ],
    "weather": {{
        "city": "{weather['city']}",
        "temp": {weather['temp']},
        "feels_like": {weather['feels_like']},
        "humidity": {weather['humidity']},
        "description": "{weather['description']}",
        "icon": "{weather['icon']}"
    }}
}}"""

    http_client = httpx.AsyncClient(verify=False)
    client = AsyncOpenAI(
        api_key=settings.GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1",
        http_client=http_client,
    )

    response = await client.chat.completions.create(
        model=settings.GROQ_MODEL,
        max_tokens=4000,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )

    text_block = response.choices[0].message.content
    if not text_block:
        return []

    parsed = json.loads(text_block)
    garment_map = {g.id: g for g in garments}

    saved_outfits = []
    for o in parsed.get("outfits", []):
        valid_ids = [gid for gid in o["garment_ids"] if gid in garment_map]
        if len(valid_ids) < 2:
            continue

        outfit = Outfit(
            user_id=user_id,
            name=o.get("outfit_name"),
            occasion=occasion,
            weather_context=parsed.get("weather", weather),
            reason=o.get("reason"),
            style_tip=o.get("style_tip"),
            occasion_fit_score=o.get("occasion_fit_score", 0),
            weather_fit_score=o.get("weather_fit_score", 0),
        )
        db.add(outfit)
        await db.flush()

        for gid in valid_ids:
            db.add(OutfitItem(outfit_id=outfit.id, garment_id=gid))

        await db.flush()
        await db.refresh(outfit)
        saved_outfits.append(outfit)

    return saved_outfits
