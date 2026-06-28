# Daily Look 👔

AI-powered wardrobe assistant for daily outfit suggestions, weather-aware styling, and smart buy-next recommendations with Amazon.in, Flipkart, Myntra, and Ajio affiliate links.

## Tech Stack

- **Frontend**: React 19 + MUI v7 + Redux Toolkit + Vite
- **Backend**: FastAPI (Python 3.11) + PostgreSQL 16 + SQLAlchemy 2
- **AI**: Anthropic Claude (with extended thinking)
- **Storage**: AWS S3
- **Weather**: OpenWeatherMap API

## Quick Start (No Docker)

### 1. Prerequisites
- Python 3.11+ → https://python.org
- Node 20+ → https://nodejs.org
- PostgreSQL 16 → https://www.postgresql.org/download/windows/

### 2. Create the Database (one-time)

Open **psql** or **pgAdmin** and run:
```sql
CREATE USER dailylook WITH PASSWORD 'dailylook123';
CREATE DATABASE dailylook OWNER dailylook;
GRANT ALL PRIVILEGES ON DATABASE dailylook TO dailylook;
```

Or via psql CLI on Windows:
```powershell
psql -U postgres -c "CREATE USER dailylook WITH PASSWORD 'dailylook123';"
psql -U postgres -c "CREATE DATABASE dailylook OWNER dailylook;"
```

### 3. Backend Setup
```powershell
cd backend
copy .env.example .env
# Open .env and fill in your API keys (see table below)
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

### 4. Frontend Setup
```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

App runs at: http://localhost:5173  
API docs at: http://localhost:8000/docs

## Required API Keys (in backend/.env)

| Key | Where to get |
|-----|-------------|
| `ANTHROPIC_API_KEY` | https://console.anthropic.com |
| `OPENWEATHERMAP_API_KEY` | https://openweathermap.org/api (free tier) |
| `AWS_ACCESS_KEY_ID` | AWS IAM Console |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Console |
| `AWS_S3_BUCKET` | AWS S3 Console |
| `REMOVE_BG_API_KEY` | https://www.remove.bg/api (free: 50/month) |
| `AMAZON_AFFILIATE_TAG` | https://affiliate-program.amazon.in |

## Features

- **Wardrobe Management** — Add clothes with photo, category, color, occasion tags
- **Daily Suggestions** — 3 AI-curated outfits per day based on weather + occasion
- **Like/Skip Feedback** — Claude learns your taste over time
- **Buy-Next Gaps** — Identifies wardrobe gaps + affiliate links (Amazon, Flipkart, Myntra, Ajio)
- **India-First** — Ethnic wear, monsoon handling, Indian occasion types

## Project Structure

```
DailyLook/
├── backend/          # FastAPI app
├── frontend/         # React app
├── infra/            # Docker, CI configs
└── docker-compose.yml
```








# Database — local PostgreSQL (no Docker needed)
# Format: postgresql+psycopg://USER:PASSWORD@HOST:PORT/DBNAME
# Default port is 5432. Change user/password to match what you created in psql/pgAdmin.
DATABASE_URL=sqlite+aiosqlite:///./stylemirror.db

# JWT Auth
SECRET_KEY=change-this-to-a-long-random-string-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
# Groq (free)
GROQ_API_KEY=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
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_MODEL=llama-3.3-70b-versatile
# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=stylemirror-uploads
# OpenWeatherMap (free tier)
OPENWEATHERMAP_API_KEY=your-openweathermap-key
OPENWEATHERMAP_BASE_URL=https://api.openweathermap.org/data/2.5
# Remove.bg (free: 50 images/month)
REMOVE_BG_API_KEY=your-removebg-key
# Affiliate IDs (India)
AMAZON_AFFILIATE_TAG=your-amazon-tag-21
FLIPKART_AFFILIATE_ID=your-flipkart-id
MYNTRA_AFFILIATE_ID=your-myntra-id
AJIO_AFFILIATE_ID=your-ajio-id
# App
APP_ENV=development
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
