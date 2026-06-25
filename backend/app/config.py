from pydantic_settings import BaseSettings
from typing import List
import json


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080

    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "ap-south-1"
    AWS_S3_BUCKET: str = "dailylook-uploads"

    OPENWEATHERMAP_API_KEY: str = ""
    OPENWEATHERMAP_BASE_URL: str = "https://api.openweathermap.org/data/2.5"

    REMOVE_BG_API_KEY: str = ""

    AMAZON_AFFILIATE_TAG: str = ""
    FLIPKART_AFFILIATE_ID: str = ""
    MYNTRA_AFFILIATE_ID: str = ""
    AJIO_AFFILIATE_ID: str = ""

    APP_ENV: str = "development"
    CORS_ORIGINS: str = '["http://localhost:5173","http://localhost:5174","http://localhost:3000","http://127.0.0.1:8000"]'

    def get_cors_origins(self) -> List[str]:
        return json.loads(self.CORS_ORIGINS)

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
