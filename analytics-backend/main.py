from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import kpis, rows, websocket

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://barakwork95.github.io",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(kpis.router)
app.include_router(rows.router)
app.include_router(websocket.router)