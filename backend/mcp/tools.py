import math
import random
import asyncio
from typing import Dict, Any
from backend.core.websocket_manager import ws_manager

async def notify_family(contact_info: str) -> Dict[str, Any]:
    """
    Simulates sending an SMS/Viber emergency alert to the victim's family.
    """
    print(f"[MCP TOOL] notify_family activated with: {contact_info}")
    
    # Broadcast progress
    await ws_manager.broadcast_event(
        event_type="agent_activated",
        agent="dispatch",
        status="running",
        message=f"Notifying family contacts: {contact_info}...",
        metadata={"priority": "high", "details": {"action": "send_sms"}}
    )
    
    await asyncio.sleep(1.0)
    
    return {
        "tool": "notify_family",
        "status": "success",
        "recipient": contact_info,
        "message": "Emergency broadcast successfully sent to family member."
    }

async def find_hospital(lat: float, lng: float) -> Dict[str, Any]:
    """
    Simulates finding the nearest trauma hospital based on GPS coordinates.
    Specifically uses major hospital nodes in Bangladesh for believable context.
    """
    print(f"[MCP TOOL] find_hospital activated with coordinates: ({lat}, {lng})")
    
    # Broadcast locate start
    await ws_manager.broadcast_event(
        event_type="agent_activated",
        agent="locate",
        status="running",
        message="Locating nearest emergency medical facilities...",
        metadata={"priority": "high", "coordinates": {"lat": lat, "lng": lng}}
    )
    
    await asyncio.sleep(1.2)
    
    # Mock hospital database (focused on Bangladesh)
    hospitals = [
        {"name": "Tangail General Hospital", "lat": 24.2498, "lng": 89.9196, "specialty": "General & Trauma Emergency"},
        {"name": "Sheikh Hasina Medical College Hospital, Tangail", "lat": 24.2385, "lng": 89.9231, "specialty": "Level 2 Trauma Care"},
        {"name": "Sylhet Trauma Center", "lat": 24.89, "lng": 91.86, "specialty": "Trauma & Orthopedic Surgery"},
        {"name": "Dhaka Medical College Hospital", "lat": 23.72, "lng": 90.39, "specialty": "Level 1 Trauma & Burn Care"},
        {"name": "Evercare Hospital Chittagong", "lat": 22.37, "lng": 91.84, "specialty": "Full Emergency Suite"},
        {"name": "Zindabazar Emergency Clinic", "lat": 24.90, "lng": 91.87, "specialty": "Minor Injuries & Triage"}
    ]
    
    # Find closest based on Euclidean distance
    closest = None
    min_dist = float('inf')
    for h in hospitals:
        dist = math.sqrt((h["lat"] - lat)**2 + (h["lng"] - lng)**2)
        if dist < min_dist:
            min_dist = dist
            closest = h
            
    # Calculate mock travel details
    eta_mins = int(max(2, round(min_dist * 110 * 1.5))) # 1 degree ~110km, driving multiplier
    if eta_mins < 2:
        eta_mins = 2
    eta_str = f"{eta_mins} mins"
    distance_km = round(min_dist * 110, 1)
    if distance_km < 0.1:
        distance_km = 0.1
    
    # Broadcast completion
    await ws_manager.broadcast_event(
        event_type="agent_activated",
        agent="locate",
        status="completed",
        message=f"Nearest hospital identified: {closest['name']} ({distance_km} km away).",
        metadata={
            "priority": "high",
            "hospital": closest["name"],
            "specialty": closest["specialty"],
            "distance_km": distance_km,
            "eta": eta_str,
            "lat": closest["lat"],
            "lng": closest["lng"]
        }
    )
    
    return {
        "tool": "find_hospital",
        "status": "success",
        "hospital": closest["name"],
        "specialty": closest["specialty"],
        "distance_km": distance_km,
        "eta": eta_str,
        "lat": closest["lat"],
        "lng": closest["lng"]
    }

async def dispatch_emergency(hospital_name: str, lat: float, lng: float) -> Dict[str, Any]:
    """
    Simulates triggering a rapid responder/ambulance dispatch.
    """
    print(f"[MCP TOOL] dispatch_emergency to hospital: {hospital_name}")
    
    # Broadcast dispatch start
    await ws_manager.broadcast_event(
        event_type="dispatch_started",
        agent="dispatch",
        status="running",
        message=f"Requesting rapid ambulance dispatch from {hospital_name}...",
        metadata={
            "targetHospital": hospital_name,
            "notificationSentToFamily": True
        }
    )
    
    await asyncio.sleep(1.5)
    
    vehicle_id = f"AMB-{random.randint(100, 999)}"
    eta_mins = random.randint(8, 15)
    eta_str = f"{eta_mins} mins"
    
    # Broadcast dispatch completion
    await ws_manager.broadcast_event(
        event_type="dispatch_completed",
        agent="dispatch",
        status="completed",
        message=f"Ambulance {vehicle_id} dispatched from {hospital_name}. ETA: {eta_str}.",
        metadata={
            "hospital": hospital_name,
            "eta": eta_str,
            "vehicleId": vehicle_id,
            "status": "dispatched"
        }
    )
    
    return {
        "tool": "dispatch_emergency",
        "status": "success",
        "hospital": hospital_name,
        "eta": eta_str,
        "vehicle_id": vehicle_id
    }

async def create_hazard_report(hazard_type: str, lat: float, lng: float, severity: str) -> Dict[str, Any]:
    """
    Simulates logging a road hazard alert (e.g. pothole, accident scene)
    and pinpoints it on the shared dashboard map.
    """
    print(f"[MCP TOOL] create_hazard_report: {hazard_type} | Severity: {severity}")
    
    # Broadcast hazard detection
    await ws_manager.broadcast_event(
        event_type="hazard_detected",
        agent="hazard",
        status="completed",
        message=f"New hazard logged: {hazard_type} ({severity} severity) mapped at ({lat}, {lng}).",
        metadata={
            "hazard_type": hazard_type,
            "severity": severity,
            "location": {"lat": lat, "lng": lng}
        }
    )
    
    return {
        "tool": "create_hazard_report",
        "status": "success",
        "hazard_type": hazard_type,
        "severity": severity,
        "location": {"lat": lat, "lng": lng}
    }
