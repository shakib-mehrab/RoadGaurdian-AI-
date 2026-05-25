import json
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from backend.agents.orchestrator import build_graph

router = APIRouter()

@router.websocket("/stream")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    graph = build_graph()
    
    try:
        while True:
            data = await websocket.receive_text()
            try:
                payload = json.loads(data)
            except json.JSONDecodeError:
                payload = {"message": data}
            
            # Start execution of the graph with initial state
            initial_state = {
                "messages": [{"role": "user", "content": payload.get("message", "SOS")}],
                "active_agent": "system",
                "status": "received",
                "emergency_type": None
            }
            
            # Acknowledge receipt
            await websocket.send_json({
                "node": "system",
                "state_update": {"status": "processing_started"}
            })
            
            # Use LangGraph's async stream to yield real-time updates
            async for output in graph.astream(initial_state):
                for node_name, state_update in output.items():
                    # Stream each agent's activity to the frontend
                    await websocket.send_json({
                        "node": node_name,
                        "state_update": state_update
                    })
                    # Brief pause for visual effect in the demo dashboard
                    await asyncio.sleep(0.5) 
                    
            # Complete execution
            await websocket.send_json({
                "node": "system", 
                "state_update": {"status": "completed"}
            })
            
    except WebSocketDisconnect:
        print("Client disconnected from /stream")
    except Exception as e:
        print(f"WebSocket Error: {e}")
        try:
            await websocket.close()
        except:
            pass
