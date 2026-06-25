from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.schemas.outfit import FeedbackCreate, FeedbackResponse
from app.models.feedback import Feedback
from app.models.outfit import Outfit
from app.models.garment import Garment
from app.core.dependencies import get_current_user
from app.models.user import User
from datetime import datetime

router = APIRouter()


@router.post("", response_model=FeedbackResponse, status_code=201)
async def submit_feedback(
    data: FeedbackCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    outfit_result = await db.execute(
        select(Outfit).where(Outfit.id == data.outfit_id, Outfit.user_id == current_user.id)
    )
    outfit = outfit_result.scalar_one_or_none()
    if not outfit:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Outfit not found")

    if data.rating not in ("like", "skip", "wore"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Rating must be like, skip, or wore")

    fb = Feedback(
        user_id=current_user.id,
        outfit_id=data.outfit_id,
        rating=data.rating,
        worn_date=data.worn_date,
    )
    db.add(fb)

    if data.rating == "wore":
        from sqlalchemy.orm import selectinload
        from app.models.outfit import OutfitItem
        outfit_with_items = await db.execute(
            select(Outfit).where(Outfit.id == data.outfit_id).options(
                selectinload(Outfit.items).selectinload(OutfitItem.garment)
            )
        )
        loaded_outfit = outfit_with_items.scalar_one_or_none()
        if loaded_outfit:
            for item in loaded_outfit.items:
                item.garment.worn_count += 1
                item.garment.last_worn_at = data.worn_date or datetime.utcnow()

    await db.flush()
    await db.refresh(fb)
    return fb
