---
title: RoadGuardian AI
emoji: 🚨
colorFrom: red
colorTo: black
sdk: docker
app_port: 7860
---

# 🚨 RoadGuardian AI

### Autonomous Emergency Intelligence for Inclusive Road Safety

> **One-Line Pitch:** A multi-agent AI emergency copilot that autonomously coordinates rescue, delivers offline-first multilingual guidance, and learns from every road incident — built for 3 billion underserved road users across BIMSTEC nations.

---

## 📖 Public Summary

RoadGuardian AI is an autonomous, multi-agent emergency response platform combining real-time AI triage, RAG-powered multilingual first-aid guidance, Model Context Protocol (MCP)-connected hospital/police dispatch APIs, computer vision road hazard detection, and accessibility-first inclusive design into a single life-saving system. 

It operates in low-bandwidth environments, supports deaf, visually impaired, speech-impaired, and elderly users, and uses a coordinated swarm of specialized AI agents to compress emergency response coordination times from **15+ minutes down to under 90 seconds**.

---

## 🛠️ Key Architectural Components

The application is powered by a **7-Agent swarm** orchestrated dynamically:

1. **Orchestrator Agent (LangGraph StateGraph)**: Routes context, assigns sub-agents, and drives state progression: `DETECTED` ➔ `TRIAGED` ➔ `DISPATCHED` ➔ `GUIDED` ➔ `RESOLVED`.
2. **Triage Agent (Medical AI)**: Conducts severity assessments and outputs clinical indicators (WHO protocols).
3. **Locate Agent (Geo AI)**: Finds the nearest trauma centers using OpenStreetMap/Nominatim coordinates.
4. **Dispatch Agent (MCP Hub)**: Connects to Twilio, Hospital dispatch, and Police nodes using Model Context Protocol (MCP) to fire dispatch tools.
5. **Guidance Agent (RAG + LLM)**: Streams step-by-step first-aid guidance to the user.
6. **Hazard Detection Agent (Vision AI)**: Runs road anomaly classifications (e.g. potholes, debris) via YOLOv8.
7. **Safety Guard Agent (Guardrails)**: Validates medical advice output safety using NeMo Guardrails.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Tailwind Variables, Glassmorphism, animations)
- **Maps**: Leaflet.js + OpenStreetMap
- **State Management**: Zustand
- **Storage**: IndexedDB (Dexie.js) for offline caching
- **Routing**: React Router DOM v7

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Agent Orchestration**: LangGraph StateGraph
- **RAG & Search**: ChromaDB (Vector Store) + LangChain + BM25 Sparse Search
- **AI Models**: Groq Cloud (Llama 3.1 8B/70B) & Gemini 1.5 Flash (Multimodal)
- **Streaming**: WebSockets (Asynchronous Event Broker)

---

## 🏁 Quick Start & Run Guide

### Prerequisite Setup
Make sure you have Python 3.11+ and Node.js (v18+) installed.

Create a `.env` file inside the `backend` folder matching the `.env.example`:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 1. Running the Backend Server
From the project root:
```bash
# Navigate to backend directory
cd backend

# Create & activate python virtual environment (if not already done)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```
The backend API and WebSocket server will be live at `http://localhost:8000`.

### 2. Running the Frontend App
Open a new terminal window at the project root:
```bash
# Navigate to frontend directory
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```
The dashboard frontend will be active at `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is occupied).

---

## 🛡️ License
Designed and developed for the CloudCamp Hackathon. All rights reserved.