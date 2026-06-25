from pydantic import BaseModel, EmailStr
from typing import Optional


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    city: str = "Mumbai"
    gender: str = "unspecified"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    city: str
    country: str
    gender: str

    model_config = {"from_attributes": True}


class MeResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    city: str
    country: str
    gender: str
    is_active: bool

    model_config = {"from_attributes": True}
