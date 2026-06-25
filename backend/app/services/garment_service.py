from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.models.garment import Garment
from app.schemas.garment import GarmentCreate, GarmentUpdate
from typing import List, Optional


async def create_garment(db: AsyncSession, user_id: int, data: GarmentCreate) -> Garment:
    garment = Garment(user_id=user_id, **data.model_dump())
    db.add(garment)
    await db.flush()
    await db.refresh(garment)
    return garment


async def get_garments(
    db: AsyncSession,
    user_id: int,
    category: Optional[str] = None,
    occasion: Optional[str] = None,
    active_only: bool = True,
) -> List[Garment]:
    query = select(Garment).where(Garment.user_id == user_id)

    if active_only:
        query = query.where(Garment.is_active == True)
    if category:
        query = query.where(Garment.category == category)

    result = await db.execute(query.order_by(Garment.created_at.desc()))
    garments = list(result.scalars().all())

    if occasion:
        garments = [g for g in garments if occasion in (g.occasions or [])]

    return garments


async def get_garment_by_id(db: AsyncSession, garment_id: int, user_id: int) -> Garment:
    result = await db.execute(
        select(Garment).where(Garment.id == garment_id, Garment.user_id == user_id)
    )
    garment = result.scalar_one_or_none()
    if not garment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Garment not found")
    return garment


async def update_garment(db: AsyncSession, garment_id: int, user_id: int, data: GarmentUpdate) -> Garment:
    garment = await get_garment_by_id(db, garment_id, user_id)
    updates = data.model_dump(exclude_none=True)
    for key, value in updates.items():
        setattr(garment, key, value)
    await db.flush()
    await db.refresh(garment)
    return garment


async def delete_garment(db: AsyncSession, garment_id: int, user_id: int) -> None:
    garment = await get_garment_by_id(db, garment_id, user_id)
    garment.is_active = False
    await db.flush()
