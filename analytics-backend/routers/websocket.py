import asyncio
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from data.generator import generate_kpis, generate_row

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    index = 0
    try:
        while True:
            # every 2 seconds send a new row
            new_row = generate_row(index)
            await ws.send_text(json.dumps({
                "type": "new_row",
                "payload": new_row.model_dump(),
            }))

            # every 10 seconds update KPIs
            if index % 5 == 0:
                kpis = generate_kpis()
                await ws.send_text(json.dumps({
                    "type": "kpi_update",
                    "payload": [k.model_dump() for k in kpis],
                }))

            index += 1
            await asyncio.sleep(2)

    except WebSocketDisconnect:
        print("Client disconnected")