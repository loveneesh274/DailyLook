from sqlalchemy import Integer, String, DateTime, Text, ForeignKey
from sqlalchemy import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.database import Base


class Outfit(Base):
    __tablename__ = "outfits"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=True)
    occasion: Mapped[str] = mapped_column(String(50), nullable=False)
    weather_context: Mapped[dict] = mapped_column(JSON, default=dict)
    reason: Mapped[str] = mapped_column(Text, nullable=True)
    style_tip: Mapped[str] = mapped_column(Text, nullable=True)
    occasion_fit_score: Mapped[int] = mapped_column(Integer, default=0)
    weather_fit_score: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="outfits")
    items: Mapped[list["OutfitItem"]] = relationship(back_populates="outfit", cascade="all, delete-orphan")
    feedbacks: Mapped[list["Feedback"]] = relationship(back_populates="outfit")


class OutfitItem(Base):
    __tablename__ = "outfit_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    outfit_id: Mapped[int] = mapped_column(ForeignKey("outfits.id"), nullable=False)
    garment_id: Mapped[int] = mapped_column(ForeignKey("garments.id"), nullable=False)

    outfit: Mapped["Outfit"] = relationship(back_populates="items")
    garment: Mapped["Garment"] = relationship(back_populates="outfit_items")
