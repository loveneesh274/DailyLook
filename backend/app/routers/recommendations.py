from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.schemas.recommendation import RecommendationRequest
from app.services.recommendation_service import generate_outfit_recommendations
from app.models.outfit import Outfit, OutfitItem
from app.core.dependencies import get_current_user
from app.models.user import User
from typing import List

router = APIRouter()


@router.post("")
async def get_recommendations(
    data: RecommendationRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    outfits = await generate_outfit_recommendations(
        db=db,
        user_id=current_user.id,
        city=current_user.city,
        occasion=data.occasion,
    )

    result = await db.execute(
        select(Outfit)
        .where(Outfit.id.in_([o.id for o in outfits]))
        .options(selectinload(Outfit.items).selectinload(OutfitItem.garment))
    )
    loaded = list(result.scalars().all())
    return {"outfits": [_serialize_outfit(o) for o in loaded]}


def _serialize_outfit(outfit: Outfit) -> dict:
    return {
        "id": outfit.id,
        "name": outfit.name,
        "occasion": outfit.occasion,
        "weather_context": outfit.weather_context,
        "reason": outfit.reason,
        "style_tip": outfit.style_tip,
        "occasion_fit_score": outfit.occasion_fit_score,
        "weather_fit_score": outfit.weather_fit_score,
        "items": [
            {
                "id": item.id,
                "garment_id": item.garment_id,
                "garment": {
                    "id": item.garment.id,
                    "name": item.garment.name,
                    "category": item.garment.category,
                    "colors": item.garment.colors,
                    "image_url": item.garment.image_url,
                    "brand": item.garment.brand,
                },
            }
            for item in outfit.items
        ],
        "created_at": outfit.created_at.isoformat(),
    }
