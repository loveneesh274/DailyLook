from openai import AsyncOpenAI
import httpx
import json
from urllib.parse import urlencode
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
from app.models.garment import Garment
from datetime import datetime


AFFILIATE_CONFIG = {
    "amazon": {
        "name": "Amazon.in",
        "logo_url": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
        "build_url": lambda q, tag: f"https://www.amazon.in/s?{urlencode({'k': q, 'tag': tag})}",
    },
    "flipkart": {
        "name": "Flipkart",
        "logo_url": "https://upload.wikimedia.org/wikipedia/commons/8/86/Flipkart_logo.svg",
        "build_url": lambda q, _: f"https://www.flipkart.com/search?{urlencode({'q': q})}",
    },
    "myntra": {
        "name": "Myntra",
        "logo_url": "https://aartisto.com/wp-content/uploads/2020/08/myntra.png",
        "build_url": lambda q, _: f"https://www.myntra.com/{q.replace(' ', '-')}",
    },
    "ajio": {
        "name": "Ajio",
        "logo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/AJIO.svg/512px-AJIO.svg.png",
        "build_url": lambda q, _: f"https://www.ajio.com/search/?{urlencode({'text': q})}",
    },
}


def _build_affiliate_links(search_terms: dict) -> List[dict]:
    links = []
    affiliate_map = {
        "amazon_in": ("amazon", settings.AMAZON_AFFILIATE_TAG),
        "flipkart": ("flipkart", settings.FLIPKART_AFFILIATE_ID),
        "myntra": ("myntra", settings.MYNTRA_AFFILIATE_ID),
        "ajio": ("ajio", settings.AJIO_AFFILIATE_ID),
    }
    for key, (platform, tag) in affiliate_map.items():
        query = search_terms.get(key, "")
        if query and platform in AFFILIATE_CONFIG:
            cfg = AFFILIATE_CONFIG[platform]
            links.append({
                "platform": cfg["name"],
                "name": cfg["name"],
                "url": cfg["build_url"](query, tag),
                "logo_url": cfg["logo_url"],
            })
    return links


async def find_wardrobe_gaps(db: AsyncSession, user_id: int, city: str) -> dict:
    result = await db.execute(
        select(Garment).where(Garment.user_id == user_id, Garment.is_active == True)
    )
    garments = list(result.scalars().all())

    categories = {}
    for g in garments:
        categories[g.category] = categories.get(g.category, 0) + 1

    wardrobe_summary = "\n".join([
        f"- {cat}: {count} item(s)" for cat, count in categories.items()
    ])

    prompt = f"""You are a wardrobe consultant for an Indian professional in {city}.

CURRENT WARDROBE SUMMARY:
{wardrobe_summary}

Total items: {len(garments)}

Identify 4-5 key missing items that would make this wardrobe more versatile for:
- Office/work in India
- Casual weekend outings  
- Ethnic/festive occasions (very important in India)
- Sports/gym

For each gap, provide India-specific search terms for Amazon.in, Flipkart, Myntra, and Ajio.

RESPOND WITH EXACTLY:
{{
    "gaps": [
        {{
            "category": "Formal Trouser",
            "reason": "2 sentences on why this is missing and how it helps",
            "priority": "high",
            "price_range": "₹800-₹2000",
            "search_terms": {{
                "amazon_in": "formal trousers men slim fit",
                "flipkart": "formal trousers men",
                "myntra": "formal trousers men slim",
                "ajio": "formal trousers slim fit"
            }}
        }}
    ]
}}"""

    http_client = httpx.AsyncClient(verify=False)
    client = AsyncOpenAI(
        api_key=settings.GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1",
        http_client=http_client,
    )

    response = await client.chat.completions.create(
        model=settings.GROQ_MODEL,
        max_tokens=2000,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a wardrobe consultant. Respond ONLY with valid JSON, no markdown."},
            {"role": "user", "content": prompt},
        ],
    )

    text_block = response.choices[0].message.content
    if not text_block:
        return {"gaps": []}

    parsed = json.loads(text_block)

    gaps_with_links = []
    for gap in parsed.get("gaps", []):
        search_terms = gap.pop("search_terms", {})
        gap["affiliate_links"] = _build_affiliate_links(search_terms)
        gaps_with_links.append(gap)

    return {
        "gaps": gaps_with_links,
        "generated_at": datetime.utcnow().isoformat(),
    }
