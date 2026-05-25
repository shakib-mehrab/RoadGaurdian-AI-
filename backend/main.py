from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.websocket.stream import router as websocket_router
from backend.api.routes import router as api_router

app = FastAPI(title="RoadGuardian AI Backend")

# Allow CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(websocket_router)

@app.get("/")
def read_root():
    return {"status": "running", "message": "RoadGuardian AI Backend is active."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
