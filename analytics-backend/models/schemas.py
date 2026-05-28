from pydantic import BaseModel
from typing import Literal

class KPIMetric(BaseModel):
    id: str
    label: str
    value: float
    previousValue: float
    unit: Literal["currency", "percentage", "number"]
    trend: Literal["up", "down", "neutral"]

class DataRow(BaseModel):
    id: str
    timestamp: str
    userId: str
    event: str
    region: str
    value: float
    status: Literal["success", "error", "pending"]

class WSMessage(BaseModel):
    type: Literal["kpi_update", "new_row", "error"]
    payload: list[KPIMetric] | DataRow | str