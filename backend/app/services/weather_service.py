import httpx
from app.config import settings


async def get_weather(city: str) -> dict:
    if not settings.OPENWEATHERMAP_API_KEY:
        return _mock_weather(city)

    url = f"{settings.OPENWEATHERMAP_BASE_URL}/weather"
    params = {
        "q": f"{city},IN",
        "appid": settings.OPENWEATHERMAP_API_KEY,
        "units": "metric",
    }

    try:
        async with httpx.AsyncClient(timeout=10.0, verify=False) as client:
            resp = await client.get(url, params=params)
    except Exception:
        return _mock_weather(city)

    if resp.status_code != 200:
        return _mock_weather(city)

    data = resp.json()
    return {
        "city": data["name"],
        "temp": round(data["main"]["temp"], 1),
        "feels_like": round(data["main"]["feels_like"], 1),
        "humidity": data["main"]["humidity"],
        "description": data["weather"][0]["description"].capitalize(),
        "icon": data["weather"][0]["icon"],
        "wind_speed": data.get("wind", {}).get("speed", 0),
    }


def _mock_weather(city: str) -> dict:
    return {
        "city": city,
        "temp": 28.0,
        "feels_like": 31.0,
        "humidity": 75,
        "description": "Partly cloudy",
        "icon": "02d",
        "wind_speed": 12.0,
    }
