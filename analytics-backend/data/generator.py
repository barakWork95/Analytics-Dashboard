import random
from datetime import datetime, timedelta
from models.schemas import KPIMetric, DataRow

REGIONS = ["US", "EU", "APAC", "IL"]
EVENTS = ["page_view", "click", "purchase", "login"]
STATUSES = ["success", "error", "pending"]

def generate_kpis() -> list[KPIMetric]:
    return [
        KPIMetric(
            id="1",
            label="Total Revenue",
            value=round(random.uniform(40000, 60000), 2),
            previousValue=43000,
            unit="currency",
            trend="up",
        ),
        KPIMetric(
            id="2",
            label="Active Users",
            value=round(random.uniform(2000, 5000)),
            previousValue=3500,
            unit="number",
            trend="down",
        ),
        KPIMetric(
            id="3",
            label="Error Rate",
            value=round(random.uniform(1, 5), 1),
            previousValue=2.4,
            unit="percentage",
            trend="neutral",
        ),
        KPIMetric(
            id="4",
            label="Avg Response Time",
            value=round(random.uniform(80, 200)),
            previousValue=140,
            unit="number",
            trend="up",
        ),
    ]

def generate_row(index: int) -> DataRow:
    timestamp = datetime.now() - timedelta(seconds=index)
    return DataRow(
        id=f"row-{index}-{random.randint(1000, 9999)}",
        timestamp=timestamp.strftime("%H:%M:%S"),
        userId=f"user_{random.randint(1, 999)}",
        event=random.choice(EVENTS),
        region=random.choice(REGIONS),
        value=round(random.uniform(1, 1000), 2),
        status=random.choice(STATUSES),
    )

def generate_rows(count: int = 1000) -> list[DataRow]:
    return [generate_row(i) for i in range(count)]