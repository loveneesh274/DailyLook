from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.database import get_db
from app.schemas.garment import GarmentCreate, GarmentUpdate, GarmentResponse
from app.services import garment_service
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("", response_model=List[GarmentResponse])
async def list_garments(
    category: Optional[str] = Query(None),
    occasion: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await garment_service.get_garments(db, current_user.id, category, occasion)


@router.post("", response_model=GarmentResponse, status_code=201)
async def add_garment(
    data: GarmentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await garment_service.create_garment(db, current_user.id, data)


@router.get("/{garment_id}", response_model=GarmentResponse)
async def get_garment(
    garment_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await garment_service.get_garment_by_id(db, garment_id, current_user.id)


@router.patch("/{garment_id}", response_model=GarmentResponse)
async def update_garment(
    garment_id: int,
    data: GarmentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await garment_service.update_garment(db, garment_id, current_user.id, data)


@router.delete("/{garment_id}", status_code=204)
async def delete_garment(
    garment_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    await garment_service.delete_garment(db, garment_id, current_user.id)
