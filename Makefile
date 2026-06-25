# Prerequisite: PostgreSQL running locally on port 5432
# Create DB once: psql -U postgres -c "CREATE USER stylemirror WITH PASSWORD 'stylemirror123';"
#                 psql -U postgres -c "CREATE DATABASE stylemirror OWNER stylemirror;"

.PHONY: backend frontend install migrate seed test

backend:
	cd backend && uvicorn app.main:app --reload --port 8000

frontend:
	cd frontend && npm run dev

install:
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

migrate:
	cd backend && alembic upgrade head

seed:
	cd backend && python -m app.seed

test-backend:
	cd backend && pytest -v

test-frontend:
	cd frontend && npm test

logs:
	docker-compose logs -f
