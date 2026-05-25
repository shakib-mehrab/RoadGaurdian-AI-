Goal Description
Develop the complete backend infrastructure for RoadGuardian AI as outlined in the CloudCamp MVP Execution Blueprint. This covers "Ema's Part," which is heavily focused on AI Orchestration, WebSockets, RAG, and MCP integrations using FastAPI and LangGraph.

The core objective is to maximize the "AI Depth" and "Architecture Maturity" scores by building a realistic, streaming, multi-agent emergency orchestration backend that the frontend (Zahid's part) can consume.

User Review Required
IMPORTANT

Please review the chosen tools and framework structure. We are using FastAPI for the backend, LangGraph for orchestration, Groq for fast inference, and ChromaDB for local vector search. Are you ready to initialize the repository and begin Day 1 execution?

Proposed Implementation Plan
The plan is divided based on the hackathon days to ensure maximum velocity and demo-readiness.

Phase 1: Foundation (Day 1)
Goal: First working orchestration demo with WebSocket streaming.

Repository Setup: Initialize a standard Python FastAPI project (backend/).
FastAPI Setup:
Configure CORS for the Vite frontend.
Create base REST routes (POST /sos, POST /hazard-detect).
Create the core WebSocket route (WS /stream) for real-time streaming of agent activities.
Groq + LangGraph Skeleton:
Initialize the Groq client.
Define the LangGraph State (messages, emergency context, active agent, tools).
Build a dummy Orchestrator node that simply routes a request and streams a fake JSON payload back via WebSockets.
Phase 2: Core AI & RAG (Day 2)
Goal: Implement retrieval and tool calling.

RAG Pipeline:
Set up local ChromaDB.
Use sentence-transformers/all-MiniLM-L6-v2 for embeddings.
Create an ingestion script for WHO/first-aid PDFs.
Implement vector search with citations (returning chunk metadata).
MCP (Model Context Protocol) Server:
Implement mock MCP tools: notify_family(), find_hospital(), dispatch_emergency().
Ensure the LLM can invoke these tools and return structured JSON.
Phase 3: True Multi-Agent Orchestration (Day 3)
Goal: Build out the individual agents and wire them into LangGraph.

Orchestrator Agent: Routes the incoming emergency to parallel lanes.
Triage Agent: Analyzes the situation and severity.
Guidance Agent: Connects to the RAG pipeline to provide step-by-step first aid.
Locate/Dispatch Agents (Wrappers): Connect to MCP tools to simulate dispatching ambulances or locating hospitals.
Graph Wiring: Wire all nodes together in LangGraph and ensure all outputs are yielded/streamed to the WebSocket connection so the frontend Dashboard updates in real-time.
Phase 4: Polish & Deployment (Day 4-5)
Goal: Stable deployment for demo day.

Integrate YOLOv8n (or Gemini Flash) for the POST /hazard-detect endpoint.
Deploy the FastAPI application to Railway.
Perform end-to-end integration testing with Zahid's frontend.
The Master Prompt (For Ema)
You can copy and paste the following prompt to an AI assistant to immediately kickstart the backend codebase:

Act as Ema, a Senior AI Backend Engineer participating in the CloudCamp Hackathon.

Our project is "RoadGuardian AI" – an offline-first, multi-agent emergency copilot. I need you to generate the complete foundational backend for Phase 1 of our execution blueprint.

Tech Stack: FastAPI, LangGraph, LangChain, Groq API, Python 3.11+.

Requirements for this initial generation:

Create the standard backend folder structure (api/, agents/, websocket/, core/).
Write the main.py FastAPI entrypoint with CORS enabled.
Implement a WebSocket endpoint at ws://localhost:8000/stream.
Set up a basic LangGraph state graph.
Create a simple "Orchestrator Agent" node using the Groq API (llama3-8b-8192 or similar fast model) that accepts an emergency SOS message.
Wire the LangGraph execution so that as the Orchestrator thinks or triggers fake sub-agents, the state updates are streamed directly back to the WebSocket client in real-time JSON format (e.g., {"agent": "orchestrator", "status": "analyzing", "message": "..."}).
Please output the exact files, folder structure, and requirements.txt needed to run this so I can start the server immediately and hand over the WebSocket URL to my frontend developer. Do not overcomplicate it yet—focus on speed, websockets, and LangGraph integration.

Verification Plan
Automated Tests
Run pytest for basic route health checks.
Create a simple python websocket client script (scripts/test_ws.py) to simulate the frontend connecting to /stream and sending an SOS payload. Verify it receives streaming JSON chunks back from LangGraph.
Manual Verification
Confirm with Zahid that the frontend successfully connects to the local FastAPI WebSocket.
Trigger the SOS flow from the frontend UI and visually verify that the orchestration steps appear in the dashboard.