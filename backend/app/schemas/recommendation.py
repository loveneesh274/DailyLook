from pydantic import BaseModel
from typing import Optional, List
from datetime import date


class RecommendationRequest(BaseModel):
    occasion: str
    target_date: Optional[date] = None


class AffiliateLink(BaseModel):
    platform: str
    name: str
    url: str
    logo_url: str


class GapItem(BaseModel):
    category: str
    reason: str
    priority: str
    price_range: str
    affiliate_links: List[AffiliateLink]


class GapsResponse(BaseModel):
    gaps: List[GapItem]
    generated_at: str


class WeatherInfo(BaseModel):
    city: str
    temp: float
    feels_like: float
    humidity: int
    description: str
    icon: str
