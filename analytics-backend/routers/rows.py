from fastapi import APIRouter, Query
from data.generator import generate_rows

router = APIRouter(prefix="/api")

@router.get("/rows")
def get_rows(
    region: str | None = Query(default=None),
    status: str | None = Query(default=None),
    limit: int = Query(default=1000, le=10000),
):
    rows = generate_rows(limit)

    if region:
        rows = [r for r in rows if r.region == region]
    if status:
        rows = [r for r in rows if r.status == status]

    return rows