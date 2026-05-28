# Analytics Dashboard

Real-time analytics dashboard built with React 18, FastAPI, and WebSockets.

## Tech Stack

**Frontend**

- React 18 + TypeScript
- Vite
- TanStack Query — server state & caching
- TanStack Virtual — virtual scrolling for 10K+ rows
- Zustand — client state
- Recharts — charts
- Tailwind CSS

**Backend**

- FastAPI (Python)
- WebSockets — live data streaming
- Uvicorn — ASGI server

## Getting Started

### Backend

```bash
cd analytics-backend
source venv/bin/activate
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`
API docs available at `http://localhost:8000/docs`

### Frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Features

- KPI cards with live updates via WebSocket
- Revenue chart derived from real data
- DataTable with virtual scrolling (10K+ rows)
- Filters by region and status
- Export filtered data to CSV
- Skeleton loading & error states
- WebSocket connection indicator
