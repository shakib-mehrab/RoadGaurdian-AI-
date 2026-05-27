import os
import sys
from langchain_community.vectorstores import Chroma

# Absolute paths
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(os.path.dirname(CURRENT_DIR))
CHROMA_DB_DIR = os.path.join(BACKEND_DIR, "rag", "chroma_db")

# Import embeddings
sys.path.append(BACKEND_DIR)
from rag.embeddings.model import get_embedding_model

_vector_store = None

def get_vector_store():
    """
    Singleton for accessing the active Chroma database.
    """
    global _vector_store
    if _vector_store is None:
        embeddings = get_embedding_model()
        if not os.path.exists(CHROMA_DB_DIR) or not os.listdir(CHROMA_DB_DIR):
            raise RuntimeError(
                f"ChromaDB directory at {CHROMA_DB_DIR} is empty. "
                "Please run seed_rag.py first to build the database index!"
            )
        _vector_store = Chroma(
            persist_directory=CHROMA_DB_DIR,
            embedding_function=embeddings,
            collection_name="emergency_protocols"
        )
    return _vector_store

def retrieve_guidelines(query: str, k: int = 3):
    """
    Retrieves the top k semantic chunks from the first aid/trauma Chroma DB.
    
    Transforms the raw distance score to a normalized confidence score [0.0 - 1.0].
    Returns:
        List of dicts, each with keys:
            - "content": raw chunk text
            - "source": citation name (e.g. WHO Trauma Response Section 2)
            - "title": protocol name
            - "confidence": normalized similarity score [0.0 to 1.0]
    """
    try:
        db = get_vector_store()
    except Exception as e:
        print(f"Error initializing vector database: {e}")
        # Return fallback mock guidelines if database is not seeded
        return get_offline_fallback(query)
        
    # Search Chroma with scores (Chroma returns L2 distances)
    results = db.similarity_search_with_score(query, k=k)
    
    retrieved_items = []
    for doc, distance in results:
        # Calculate a calibrated confidence score
        # For L2 distance on normalized embeddings, distance is in [0, 2]
        # We calibrate so that a distance of 0.8 is around 0.6 confidence, and 0.4 is around 0.9 confidence.
        raw_confidence = 1.0 - (distance / 2.0)
        confidence = float(max(0.1, min(0.99, round(raw_confidence, 2))))
        
        retrieved_items.append({
            "content": doc.page_content,
            "source": doc.metadata.get("source", "Unknown Emergency Protocol"),
            "title": doc.metadata.get("title", "First Aid Protocol"),
            "confidence": confidence
        })
        
    if not retrieved_items:
        return get_offline_fallback(query)
        
    return retrieved_items

def get_offline_fallback(query: str):
    """
    Graceful offline backup if Chroma database is unseeded or encounters issues.
    """
    print(f"Vector search warning: utilizing hardcoded fallback for query '{query}'")
    query_lower = query.lower()
    
    if "bleed" in query_lower or "blood" in query_lower or "wound" in query_lower:
        return [{
            "content": "Title: Severe Bleeding & Arterial Hemorrhage Control\nProtocol: Apply firm, direct pressure to the wound with a clean cloth. Elevate the bleeding limb. Do not remove blood-soaked dressings; overlay them with additional layers. Apply tourniquet if bleeding is life-threatening.",
            "source": "WHO Trauma Response Protocol Section 2.1 (Offline Fallback)",
            "title": "Severe Bleeding Control",
            "confidence": 0.85
        }]
    elif "cpr" in query_lower or "breath" in query_lower or "choke" in query_lower or "heart" in query_lower:
        return [{
            "content": "Title: Basic Life Support & CPR\nProtocol: Lay patient flat on a firm surface. Perform chest compressions in center of chest at a rate of 100-120 per minute, pressing 2 inches deep. Tilt head and Chin to open airway.",
            "source": "Red Cross Emergency CPR Guidelines 2025 (Offline Fallback)",
            "title": "Basic Life Support & CPR",
            "confidence": 0.88
        }]
    else:
        return [{
            "content": "Title: Shock Management and Prevention\nProtocol: Have the patient lie flat on their back. Elevate feet and legs 12 inches to encourage blood flow to vital organs. Keep warm with a blanket. Do not give food or drink.",
            "source": "WHO Trauma Response Protocol Section 3.2 (Offline Fallback)",
            "title": "Shock Management",
            "confidence": 0.75
        }]
