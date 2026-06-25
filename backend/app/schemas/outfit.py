from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schemas.garment import GarmentResponse


class OutfitItemResponse(BaseModel):
    id: int
    garment_id: int
    garment: GarmentResponse

    model_config = {"from_attributes": True}


class OutfitResponse(BaseModel):
    id: int
    name: Optional[str]
    occasion: str
    weather_context: dict
    reason: Optional[str]
    style_tip: Optional[str]
    occasion_fit_score: int
    weather_fit_score: int
    items: List[OutfitItemResponse]
    created_at: datetime

    model_config = {"from_attributes": True}


class FeedbackCreate(BaseModel):
    outfit_id: int
    rating: str
    worn_date: Optional[datetime] = None


class FeedbackResponse(BaseModel):
    id: int
    outfit_id: int
    rating: str
    worn_date: Optional[datetime]
    created_at: datetime

    model_config = {"from_attributes": True}
