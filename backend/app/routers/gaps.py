from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.gap_service import find_wardrobe_gaps
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("")
async def get_gaps(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await find_wardrobe_gaps(db, current_user.id, current_user.city)
