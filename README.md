# 🚑 RoadGuardian AI

### Autonomous Emergency Intelligence for Inclusive Road Safety

<p align="center">
  <img src="docs/assets/banner.png" alt="RoadGuardian AI Banner" width="100%" />
</p>

<p align="center">

![Hackathon](https://img.shields.io/badge/CloudCamp-InfinityFest-blueviolet)
![Status](https://img.shields.io/badge/Status-Active-success)
![AI](https://img.shields.io/badge/AI-Multi--Agent-orange)
![RAG](https://img.shields.io/badge/RAG-ChromaDB-red)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

> **RoadGuardian AI is an AI-native emergency intelligence infrastructure platform designed for underserved and accessibility-critical regions.**

An offline-first, multi-agent emergency coordination system that combines realtime AI orchestration, RAG-powered medical guidance, MCP-based dispatch infrastructure, accessibility-first UX, and hazard intelligence into a unified emergency response platform.

---

# 🎥 Demo Preview

🎬 **Demo Video:** Coming Soon

📸 **Mission Control Dashboard Preview**

```text
[ Dashboard Screenshot Placeholder ]
```

📸 **SOS Emergency Activation**

```text
[ SOS Flow Screenshot Placeholder ]
```

📸 **Realtime Multi-Agent Orchestration**

```text
[ Orchestration Screenshot Placeholder ]
```

---

# 🌍 Why RoadGuardian AI Matters

Road accidents kill over **300,000 people annually across BIMSTEC countries** and injure millions more. Most preventable deaths occur because victims do not receive help during the **golden hour** — the first 60 minutes after a crash when survival chances decrease sharply with every passing minute.

Current emergency systems fail because they assume:

* stable internet connectivity
* able-bodied users
* voice-based communication
* urban infrastructure access

But the people who most urgently need emergency support are often:

* rural residents
* specially abled users
* unconscious crash victims
* cross-border travelers
* people with limited connectivity

RoadGuardian AI was built specifically for them.

---

# 🚨 Problem Statement

Five critical infrastructure failures drive emergency response failures across underserved regions:

1. **Bystanders freeze during emergencies** because existing apps provide little actionable real-time guidance.

2. **Emergency systems depend on stable internet connectivity**, which is unavailable on many rural highways and mountain roads.

3. **Current emergency platforms exclude specially abled users** such as deaf, visually impaired, speech-impaired, and elderly individuals.

4. **Language barriers prevent tourists and cross-border travelers** from communicating with responders during emergencies.

5. **No widely accessible emergency system autonomously coordinates rescue workflows** when victims are unconscious or unable to communicate.

The result is devastating:

> The people who most urgently need emergency help are the people current emergency systems fail completely.

---

# 💡 Solution Overview

RoadGuardian AI provides a realtime multi-agent emergency orchestration platform capable of:

* 🧠 AI-powered emergency triage
* 📡 Realtime orchestration streaming
* 📚 RAG-based first-aid guidance
* 🛰️ MCP-enabled dispatch coordination
* 🌐 Offline-first emergency support
* ♿ Accessibility-native emergency UX
* 🛣️ AI-powered hazard detection
* 🗺️ Live emergency intelligence mapping

When an SOS is triggered, multiple AI agents activate in parallel to coordinate emergency workflows autonomously.

---

# ✨ Key Features

| Feature                        | Description                                 |
| ------------------------------ | ------------------------------------------- |
| 🧠 Multi-Agent Orchestrator    | Coordinates emergency workflows in realtime |
| 📚 RAG Emergency Guidance      | Retrieves contextual first-aid instructions |
| 📡 WebSocket Streaming         | Streams live orchestration events           |
| 🚑 MCP Dispatch System         | Coordinates emergency tools & responders    |
| 🌐 Offline Emergency Support   | Works in low-connectivity environments      |
| ♿ Accessibility Modes          | Supports specially abled users              |
| 🛣️ Hazard Detection           | Detects potholes & road hazards             |
| 🗺️ Mission Control Dashboard  | Live AI emergency visualization             |
| ⚡ Parallel Agent Execution     | Multiple AI agents operate simultaneously   |
| 🔄 Realtime Emergency Timeline | Tracks orchestration lifecycle live         |

---

# 🧠 Why This Is NOT Just Another Emergency App

Unlike traditional emergency apps, RoadGuardian AI combines:

* Multi-agent AI orchestration
* Realtime infrastructure streaming
* Offline-first emergency workflows
* Accessibility-native UX
* RAG-powered medical intelligence
* MCP-based dispatch coordination
* Emergency infrastructure simulation

This project is designed as:

> **AI-native emergency infrastructure**, not a chatbot.

---

# 🏗️ System Architecture

## High-Level Architecture

```text
USER
 ↓
SOS ACTIVATION
 ↓
ORCHESTRATOR AGENT
 ├── TRIAGE AGENT
 ├── GUIDANCE AGENT
 ├── LOCATE AGENT
 ├── DISPATCH AGENT
 └── HAZARD DETECTION AGENT
 ↓
RAG + MCP + VECTOR DATABASE
 ↓
WEBSOCKET STREAMING
 ↓
MISSION CONTROL DASHBOARD
```

---

## Realtime Orchestration Lifecycle

```text
SOS Trigger
 ↓
Orchestrator Activation
 ↓
Parallel Agent Execution
 ├── Triage
 ├── Guidance
 ├── Locate
 └── Dispatch
 ↓
RAG Retrieval
 ↓
MCP Tool Invocation
 ↓
Streaming Emergency Guidance
 ↓
Emergency Resolution
```

---

## RAG Pipeline

```text
Emergency Query
      ↓
Semantic Chunking
      ↓
Embedding Generation
      ↓
ChromaDB Vector Search
      ↓
Confidence Ranking
      ↓
Context Injection
      ↓
LLM Guidance Generation
      ↓
Realtime Streaming Response
```

---

# 🤖 AI Architecture

RoadGuardian AI uses a realtime multi-agent orchestration system built using:

* LangGraph StateGraph
* FastAPI async orchestration
* ChromaDB vector retrieval
* SentenceTransformers embeddings
* WebSocket event streaming
* Groq-hosted Llama inference
* MCP emergency tooling

The system is designed to feel like:

> An AI-native emergency operations infrastructure platform.

---

# 🧩 Multi-Agent System

| Agent                      | Responsibility                     |
| -------------------------- | ---------------------------------- |
| 🧠 Orchestrator Agent      | Coordinates emergency workflows    |
| 🚑 Triage Agent            | Analyzes emergency severity        |
| 📚 Guidance Agent          | Retrieves medical guidance via RAG |
| 📍 Locate Agent            | Finds nearby hospitals/responders  |
| 🚨 Dispatch Agent          | Executes MCP dispatch workflows    |
| 🛣️ Hazard Detection Agent | Detects dangerous road conditions  |

---

# 📚 RAG Pipeline

The Retrieval-Augmented Generation (RAG) system enables realtime emergency medical guidance using verified emergency datasets.

## Features

* Semantic chunking
* Embedding generation
* Vector search
* Confidence scoring
* Streaming citations
* Emergency-focused retrieval prompts

## Data Sources

* WHO emergency guidelines
* Red Cross first-aid protocols
* Trauma response documentation

## Vector Database

* ChromaDB

## Embedding Model

* sentence-transformers/all-MiniLM-L6-v2

---

# 🔌 MCP Infrastructure

RoadGuardian AI uses MCP-style emergency tooling for structured orchestration.

## MCP Tools

```python
notify_family()
find_hospital()
dispatch_emergency()
create_hazard_report()
```

These tools integrate directly into the LangGraph orchestration lifecycle and stream structured events to the frontend Mission Control Dashboard.

---

# ♿ Accessibility Innovation

RoadGuardian AI was designed with accessibility as a core infrastructure requirement.

## Accessibility Features

* High contrast mode
* Dyslexia-friendly typography
* Large emergency controls
* Voice guidance UI
* Vibration-based emergency interaction
* Reduced motion mode
* Offline emergency fallback
* Panic-state optimized UX

This is one of the strongest differentiators of the platform.

---

# 🌐 Offline-First Emergency Infrastructure

RoadGuardian AI is built for:

* rural highways
* low-connectivity environments
* mountain roads
* underserved regions

The system supports:

* offline emergency workflows
* cached emergency guidance
* websocket reconnection
* progressive web app behavior

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose             |
| ------------- | ------------------- |
| React + Vite  | Frontend framework  |
| TailwindCSS   | UI styling          |
| Framer Motion | Realtime animations |
| Zustand       | State management    |
| Leaflet.js    | Live maps           |
| Workbox       | PWA support         |

---

## Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| FastAPI    | Backend APIs              |
| LangGraph  | Multi-agent orchestration |
| WebSockets | Realtime streaming        |
| LangChain  | RAG workflows             |

---

## AI Infrastructure

| Technology           | Purpose          |
| -------------------- | ---------------- |
| Groq + Llama 3.1     | AI inference     |
| ChromaDB             | Vector database  |
| SentenceTransformers | Embeddings       |
| YOLOv8               | Hazard detection |

---

## Deployment

| Platform | Usage              |
| -------- | ------------------ |
| Railway  | Backend hosting    |
| Vercel   | Frontend hosting   |
| Supabase | Database & storage |

---

### Deploy Frontend to Vercel

1. Click the Vercel deployment link: https://vercel.com/new?teamSlug=shakera-projects
2. Import the `zahid-frontend` directory.
3. Set environment variables:
   - `VITE_API_URL` → Your backend URL (e.g., Railway deployment URL)
   - `VITE_WS_URL` → Your backend WebSocket URL (e.g., `wss://<your-backend>.railway.app/stream`)
4. Deploy. Use the generated preview URL as the hackathon demo link.


# 📂 Repository Structure

```text
roadguardian-ai/
├── zahid-frontend/
├── ema-backend/
├── shared-contracts/
└── docs/
```

## Why This Structure?

* Independent frontend/backend development
* Merge-safe architecture
* Shared websocket contracts
* Parallel hackathon development

---

# ⚙️ Installation & Setup

## Backend Setup

```bash
cd ema-backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python rag/ingest/seed_rag.py

uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd zahid-frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

## Backend `.env`

```env
GROQ_API_KEY=your_api_key_here
CHROMA_DB_PATH=./chroma_db
```

---

## Frontend `.env.local`

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/stream
```

---

# 🚀 Running the Project

## Step 1 — Start Backend

```bash
uvicorn main:app --reload
```

---

## Step 2 — Start Frontend

```bash
npm run dev
```

---

## Step 3 — Verify WebSocket Connection

Open:

```text
http://localhost:5173
```

Verify:

* websocket connects
* Mission Control activates
* realtime events stream

---

# 🎬 Demo Flow

## Scenario:

A deaf motorcyclist crashes on a rural highway with unstable internet connectivity.

### RoadGuardian AI:

1. Activates SOS automatically
2. Launches realtime AI orchestration
3. Streams emergency guidance
4. Retrieves first-aid protocols
5. Coordinates dispatch workflows
6. Detects nearby hazards
7. Continues operating offline
8. Provides accessibility-safe emergency interaction

---

# 📡 API Documentation

## POST `/sos`

```json
{
  "user_id": "user_001",
  "emergency_type": "accident",
  "location": {
    "lat": 23.91,
    "lng": 90.21
  }
}
```

---

## POST `/hazard-detect`

```json
{
  "image": "base64_image"
}
```

---

## WebSocket `/stream`

Streams realtime orchestration events.

---

# 📨 Example WebSocket Events

## agent_activated

```json
{
  "event": "agent_activated",
  "agent": "triage",
  "status": "running",
  "message": "Analyzing trauma severity"
}
```

---

## rag_chunk_stream

```json
{
  "event": "rag_chunk_stream",
  "agent": "guidance",
  "status": "streaming",
  "message": "Apply pressure to the wound..."
}
```

---

# ✅ Current Implementation Status

## Backend

* [x] FastAPI backend
* [x] LangGraph orchestration
* [x] WebSocket streaming
* [x] ChromaDB retrieval
* [x] MCP tooling
* [x] Parallel agents
* [x] Token monitoring
* [x] Schema validation

---

## Frontend

* [ ] Final Mission Control integration
* [ ] Accessibility polish
* [ ] Full realtime visualization
* [ ] PWA optimization

---

# 🏆 CloudCamp Innovation Highlights

RoadGuardian AI combines:

* Multi-agent orchestration
* Accessibility-first AI
* Offline emergency intelligence
* Realtime infrastructure streaming
* RAG-powered emergency guidance
* MCP-based dispatch coordination

into a single emergency coordination platform.

---

# 🔮 Future Roadmap

* Real hospital integrations
* Offline local LLMs
* Multilingual expansion
* Automatic crash detection
* Municipal hazard intelligence
* Smart traffic emergency analytics

---

# 👥 Team

| Member | Role                        |
| ------ | --------------------------- |
| Zahid Hasan | Frontend & UX               |
| Shakera Ema    | Backend & AI Infrastructure |
| Mehrab Shakib | Researcher, Planner |

---

# 📜 License

MIT License

---

# 🙏 Acknowledgements

* WHO
* Red Cross
* OpenStreetMap
* LangGraph
* LangChain
* ChromaDB
* Open-source AI ecosystem

---

# 🌟 Final Vision

RoadGuardian AI aims to become:

> A realtime AI-native emergency intelligence infrastructure layer for underserved and accessibility-critical regions.

Built for:

* rural communities
* specially abled users
* low-connectivity environments
* emergency-critical situations

Designed not just to respond to emergencies —
but to coordinate intelligent rescue infrastructure itself.
