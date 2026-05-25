import asyncio
from typing import Dict, Any
from langgraph.graph import StateGraph, END
from backend.core.state import EmergencyState

async def orchestrator_node(state: EmergencyState) -> Dict[str, Any]:
    """
    A dummy orchestrator node for Phase 1.
    In a real scenario, this uses an LLM (e.g. Groq) to decide the next step.
    For now, we simulate thinking and routing.
    """
    # Simulate LLM thinking delay
    await asyncio.sleep(1)
    
    return {
        "active_agent": "orchestrator",
        "status": "analyzing",
        "messages": [{"role": "ai", "content": "Analyzing emergency situation..."}]
    }
    
async def triage_node(state: EmergencyState) -> Dict[str, Any]:
    """
    A dummy triage node to simulate the next step in the pipeline.
    """
    await asyncio.sleep(1.5)
    return {
        "active_agent": "triage",
        "status": "assessing",
        "messages": [{"role": "ai", "content": "Assessing severity and required response..."}]
    }

def build_graph():
    builder = StateGraph(EmergencyState)
    
    # Add nodes
    builder.add_node("orchestrator", orchestrator_node)
    builder.add_node("triage", triage_node)
    
    # Set edges
    builder.set_entry_point("orchestrator")
    builder.add_edge("orchestrator", "triage")
    builder.add_edge("triage", END)
    
    return builder.compile()
