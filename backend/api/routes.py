from fastapi import APIRouter

router = APIRouter()

@router.post("/sos")
async def trigger_sos(payload: dict):
    # This might trigger a background task or just return an acknowledgment
    # The real-time updates happen over WebSocket
    return {"status": "success", "message": "SOS received, agents activating."}

@router.post("/hazard-detect")
async def detect_hazard():
    return {"status": "success", "hazards": []}
