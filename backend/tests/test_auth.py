import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_register_and_login():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        reg = await client.post("/api/v1/auth/register", json={
            "email": "test@stylemirror.in",
            "password": "TestPass123",
            "full_name": "Test User",
            "city": "Mumbai",
        })
        assert reg.status_code == 200
        assert "access_token" in reg.json()

        login = await client.post("/api/v1/auth/login", json={
            "email": "test@stylemirror.in",
            "password": "TestPass123",
        })
        assert login.status_code == 200
        token = login.json()["access_token"]
        assert token

        me = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert me.status_code == 200
        assert me.json()["email"] == "test@stylemirror.in"


@pytest.mark.asyncio
async def test_login_wrong_password():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.post("/api/v1/auth/login", json={
            "email": "test@stylemirror.in",
            "password": "WrongPass",
        })
        assert resp.status_code == 401


@pytest.mark.asyncio
async def test_me_without_token():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/api/v1/auth/me")
        assert resp.status_code == 403
