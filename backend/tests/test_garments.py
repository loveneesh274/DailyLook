import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

GARMENT_PAYLOAD = {
    "name": "White Formal Shirt",
    "category": "top",
    "subcategory": "formal_shirt",
    "colors": ["white"],
    "warmth": 2,
    "formality": 4,
    "seasons": ["summer", "winter"],
    "occasions": ["office", "party"],
    "brand": "Peter England",
    "size": "M",
    "purchase_price": 1200.0,
}


async def _get_token(client: AsyncClient) -> str:
    await client.post("/api/v1/auth/register", json={
        "email": "garment@stylemirror.in",
        "password": "TestPass123",
        "full_name": "Garment Tester",
        "city": "Delhi",
    })
    resp = await client.post("/api/v1/auth/login", json={
        "email": "garment@stylemirror.in",
        "password": "TestPass123",
    })
    return resp.json()["access_token"]


@pytest.mark.asyncio
async def test_add_and_list_garments():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        token = await _get_token(client)
        headers = {"Authorization": f"Bearer {token}"}

        create_resp = await client.post("/api/v1/garments", json=GARMENT_PAYLOAD, headers=headers)
        assert create_resp.status_code == 201
        garment = create_resp.json()
        assert garment["name"] == "White Formal Shirt"
        assert garment["formality"] == 4

        list_resp = await client.get("/api/v1/garments", headers=headers)
        assert list_resp.status_code == 200
        assert len(list_resp.json()) >= 1


@pytest.mark.asyncio
async def test_update_garment():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        token = await _get_token(client)
        headers = {"Authorization": f"Bearer {token}"}

        create_resp = await client.post("/api/v1/garments", json=GARMENT_PAYLOAD, headers=headers)
        garment_id = create_resp.json()["id"]

        update_resp = await client.patch(
            f"/api/v1/garments/{garment_id}",
            json={"brand": "Van Heusen"},
            headers=headers,
        )
        assert update_resp.status_code == 200
        assert update_resp.json()["brand"] == "Van Heusen"


@pytest.mark.asyncio
async def test_delete_garment():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        token = await _get_token(client)
        headers = {"Authorization": f"Bearer {token}"}

        create_resp = await client.post("/api/v1/garments", json=GARMENT_PAYLOAD, headers=headers)
        garment_id = create_resp.json()["id"]

        del_resp = await client.delete(f"/api/v1/garments/{garment_id}", headers=headers)
        assert del_resp.status_code == 204
