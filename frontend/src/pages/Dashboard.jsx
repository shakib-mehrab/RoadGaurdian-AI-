import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import AgentTimeline from '../components/AgentTimeline'
import LiveMap from '../components/LiveMap'
import GuidanceStream from '../components/GuidanceStream'
import TriagePanel from '../components/TriagePanel'
import HospitalPanel from '../components/HospitalPanel'
import MCPToolsPanel from '../components/MCPToolsPanel'

export default function Dashboard() {
  const navigate = useNavigate()
  const { sosActive, wsConnected, resetIncident, triggerSOS, location } = useStore()

  const handleReset = () => {
    resetIncident()
    navigate('/emergency')
  }

  const handleQuickDemo = () => {
    // Trigger with Tangail coordinates
    triggerSOS({ lat: 24.2502, lng: 89.9167 })
  }

  return (
    <div className="page-container" style={{ padding: '24px 16px', background: 'var(--bg-primary)', minHeight: '92vh' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 12 }}>
            📊 Mission Control Dashboard
            <span className={`badge ${wsConnected ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>
              <span className={`status-dot ${wsConnected ? 'done' : 'active'}`} style={{ width: 6, height: 6 }} />
              {wsConnected ? 'WebSocket Live' : 'Mock Simulator Mode'}
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Real-time parallel agent orchestration timeline and RAG first-aid delivery.
          </p>
        </div>

        {sosActive && (
          <button onClick={handleReset} className="btn btn-ghost" style={{ minHeight: 40, padding: '8px 16px', fontSize: '0.82rem', borderColor: 'var(--red-400)', color: 'var(--red-400)' }}>
            ⚠️ Terminate SOS / Reset
          </button>
        )}
      </div>

      {!sosActive ? (
        /* Empty State / Trigger Prompt */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', padding: 24, textAlign: 'center' }}>
          <div className="glass-card animate-float-up" style={{ padding: 48, maxWidth: 540, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ fontSize: '3rem' }}>📡</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>
              No Active Rescue Operations
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              The RoadGuardian AI network is currently on standby. Run a simulation using local data, or proceed to the Emergency console to initiate a real SOS dispatch.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
              <button onClick={() => navigate('/emergency')} className="btn btn-danger" style={{ minHeight: 44, padding: '10px 24px' }}>
                🚨 Go to SOS Console
              </button>
              <button onClick={handleQuickDemo} className="btn btn-primary" style={{ minHeight: 44, padding: '10px 24px' }}>
                ⚡ Run Quick Simulation
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Emergency Console Grid */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="animate-fade-in">
          
          {/* Agent Timeline Swimlane (Horizontal) */}
          <div style={{ gridColumn: 'span 2' }}>
            <AgentTimeline />
          </div>

          {/* Map and Main Logs (Grid Layout) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {/* We will layout left/right panels conditionally or using CSS grids */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, alignItems: 'start' }}>
              
              {/* Left Column panels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <TriagePanel />
                <HospitalPanel />
                <MCPToolsPanel />
              </div>

              {/* Right Column panels (Map and guidance) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                {/* Live Leaflet Map */}
                <div className="glass-card" style={{ border: '1px solid var(--border)', padding: 12 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>📍 Real-time Geographical Plot</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--blue-400)', textTransform: 'none' }}>
                      Locked coords: {location ? `${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E` : 'N/A'}
                    </span>
                  </div>
                  <LiveMap height={320} />
                </div>

                {/* Streamed RAG Guidance */}
                <GuidanceStream />
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}
