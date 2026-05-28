from fastapi import APIRouter
from data.generator import generate_kpis

router = APIRouter(prefix="/api")

@router.get("/kpis")
def get_kpis():
    return generate_kpis()