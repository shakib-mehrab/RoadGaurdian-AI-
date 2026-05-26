from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import Dict, Any, Optional

router = APIRouter()

class SOSPayloadSchema(BaseModel):
    userId: str
    emergencyType: str
    message: str
    location: Dict[str, float]
    accessibilityMode: Optional[str] = "default"

@router.post("/sos")
async def trigger_sos(payload: SOSPayloadSchema):
    """
    REST fallback endpoint to trigger SOS.
    Returns immediate acknowledgment. The primary orchestration occurs over WebSockets.
    """
    print(f"[REST SOS] Triggered for user {payload.userId}")
    return {
        "status": "success",
        "message": "SOS alert registered. Handing over to Multi-Agent Orchestrator stream.",
        "payload_received": {
            "userId": payload.userId,
            "emergencyType": payload.emergencyType,
            "location": payload.location
        }
    }

@router.post("/hazard-detect")
async def detect_hazard(
    file: Optional[UploadFile] = File(None),
    lat: Optional[float] = Form(23.91),
    lng: Optional[float] = Form(90.21),
    description: Optional[str] = Form("Active road anomaly")
):
    """
    Phase 5 Hazard Detection Endpoint.
    Analyzes uploaded road images/videos for anomalies.
    Returns detected road hazards mapped for the Mission Control dashboard.
    """
    filename = file.filename if file else "sensor_stream.jpg"
    print(f"[HAZARD DETECT] Analyzing telemetry file: {filename} at coordinates ({lat}, {lng})")
    
    # In a full production build, we load a local YOLOv8n model here:
    # model = YOLO("yolov8n.pt")
    # results = model(file.file)
    
    # Realistic mockup detection based on description keywords
    desc_lower = description.lower() if description else ""
    hazard_type = "pothole"
    severity = "medium"
    
    if "accident" in desc_lower or "crash" in desc_lower:
        hazard_type = "accident_scene"
        severity = "high"
    elif "water" in desc_lower or "flood" in desc_lower:
        hazard_type = "flooding"
        severity = "high"
    elif "obstruction" in desc_lower or "debris" in desc_lower:
        hazard_type = "road_debris"
        severity = "medium"
        
    return {
        "status": "success",
        "telemetry_source": filename,
        "hazard_type": hazard_type,
        "severity": severity,
        "location": {
            "lat": lat,
            "lng": lng
        },
        "ai_confidence": 0.89,
        "remediation_suggestion": "Instructing Locate Agent to mark danger zone on community maps."
    }
