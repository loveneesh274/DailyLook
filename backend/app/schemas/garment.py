from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class GarmentCreate(BaseModel):
    name: str
    category: str
    subcategory: Optional[str] = None
    colors: List[str] = []
    warmth: int = 2
    formality: int = 2
    seasons: List[str] = []
    occasions: List[str] = []
    brand: Optional[str] = None
    size: Optional[str] = None
    purchase_price: Optional[float] = None
    image_url: Optional[str] = None
    notes: Optional[str] = None


class GarmentUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    colors: Optional[List[str]] = None
    warmth: Optional[int] = None
    formality: Optional[int] = None
    seasons: Optional[List[str]] = None
    occasions: Optional[List[str]] = None
    brand: Optional[str] = None
    size: Optional[str] = None
    purchase_price: Optional[float] = None
    image_url: Optional[str] = None
    notes: Optional[str] = None
    is_active: Optional[bool] = None


class GarmentResponse(BaseModel):
    id: int
    name: str
    category: str
    subcategory: Optional[str]
    colors: List[str]
    warmth: int
    formality: int
    seasons: List[str]
    occasions: List[str]
    brand: Optional[str]
    size: Optional[str]
    purchase_price: Optional[float]
    image_url: Optional[str]
    worn_count: int
    last_worn_at: Optional[datetime]
    is_active: bool
    notes: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}
