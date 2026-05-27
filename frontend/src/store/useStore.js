import { create } from 'zustand'

const AGENTS = [
  { id: 'orchestrator', name: 'Orchestrator',  icon: '🧠', color: '#0A84FF', desc: 'LangGraph StateGraph Master' },
  { id: 'triage',       name: 'Triage',        icon: '🩺', color: '#FF9F0A', desc: 'Medical AI — injury severity' },
  { id: 'locate',       name: 'Locate',        icon: '📍', color: '#30D158', desc: 'Geo AI — nearest facilities' },
  { id: 'dispatch',     name: 'Dispatch',      icon: '📡', color: '#FF375F', desc: 'MCP Hub — ambulance & police' },
  { id: 'guidance',     name: 'Guidance',      icon: '💬', color: '#64D2FF', desc: 'RAG + LLM — first-aid stream' },
  { id: 'hazard',       name: 'Hazard',        icon: '⚠️',  color: '#FFD60A', desc: 'Vision AI — road detection' },
  { id: 'guard',        name: 'SafeGuard',     icon: '🛡️',  color: '#BF5AF2', desc: 'NeMo Guardrails — safety' },
]

const INCIDENT_STATES = ['IDLE', 'DETECTED', 'TRIAGED', 'DISPATCHED', 'GUIDED', 'RESOLVED']

const MOCK_LOG_MESSAGES = {
  orchestrator: [
    'Incident triggered — classifying severity...',
    'Severity: CRITICAL (Level 4) — parallelizing sub-agents',
    'State: DETECTED → TRIAGED',
    'All agents acknowledged. Monitoring...',
    'State: DISPATCHED → GUIDED',
    'Incident state: RESOLVED ✓',
  ],
  triage: [
    'Analyzing reported symptoms...',
    'RAG retrieval: WHO Trauma Protocol §3.2',
    'Identified: possible head trauma + laceration',
    'Severity: HIGH — immediate attention required',
    'Flags: DO NOT move patient. Airway clear?',
    'Triage complete ✓',
  ],
  locate: [
    'Acquiring GPS coordinates...',
    'GPS locked: 23.8103°N, 90.4125°E',
    'Querying OSM Overpass API...',
    'Found 4 trauma centers within 8km',
    'Ranked by: accessibility + ETA + specialization',
    'Nearest: Dhaka Medical College (2.3km, ~6 min) ✓',
  ],
  dispatch: [
    'Connecting to MCP server...',
    'MCP tool: dispatch_ambulance() → calling',
    'Payload: {gps, severity:4, blood_group:"B+"}',
    'MCP tool: notify_family() → calling',
    'MCP tool: send_police_alert() → calling',
    'All dispatch tools acknowledged ✓',
  ],
  guidance: [
    'Embedding query: "head trauma bleeding"...',
    'HyDE expansion complete',
    'Vector search: Qdrant cosine similarity',
    'Retrieved 5 chunks — reranking...',
    'Cross-encoder score: 0.94',
    'Streaming first-aid guidance... ✓',
  ],
  hazard: [
    'Road image received — running YOLOv8n...',
    'Detected: pothole (conf: 0.91)',
    'Detected: debris (conf: 0.78)',
    'Geo-tagging hazard at incident location',
    'Hazard report created in Supabase',
    'n8n webhook triggered → municipal digest ✓',
  ],
  guard: [
    'Monitoring all agent outputs...',
    'Validating medical advice against guidelines',
    'No hallucinated hospital names detected',
    'Dosage check: PASS',
    'Confidence score: 0.94 — within threshold',
    'All outputs cleared ✓',
  ],
}

const MOCK_TRIAGE_RESULT = {
  severity: 4,
  label: 'CRITICAL',
  injuries: ['Head trauma', 'Laceration — left forearm', 'Possible concussion'],
  actions: [
    'Call emergency services immediately',
    'Do NOT move the patient',
    'Apply direct pressure to forearm wound',
    'Keep patient conscious — talk to them',
    'Monitor breathing every 30 seconds',
  ],
  warnings: ['DO NOT remove helmet if wearing one', 'Avoid giving food or water'],
  doNotMove: true,
  confidence: 0.93,
}

const MOCK_HOSPITALS = [
  { name: 'Dhaka Medical College Hospital', dist: '2.3 km', eta: '6 min', type: 'Trauma Center', accessible: true, blood: true },
  { name: 'Square Hospital', dist: '3.8 km', eta: '10 min', type: 'Multi-specialty', accessible: true, blood: true },
  { name: 'Evercare Hospital', dist: '5.1 km', eta: '14 min', type: 'ICU specialist', accessible: false, blood: true },
]

const MOCK_MCP_TOOLS = [
  { tool: 'dispatch_ambulance', status: 'success', payload: { location: '23.8103N,90.4125E', severity: 4 }, response: 'AMB-4721 dispatched — ETA 6 min' },
  { tool: 'notify_family', status: 'success', payload: { contacts: 2, message: 'Emergency SOS triggered' }, response: 'SMS sent to 2 contacts' },
  { tool: 'send_police_alert', status: 'success', payload: { type: 'road_accident', location: 'Mirpur Rd' }, response: 'Unit 7B alerted' },
]

const MOCK_GUIDANCE_STREAM = `**Immediate First Aid for Head Trauma**

*Source: WHO First Aid Guidelines, §4.3 | Confidence: 94%*

---

**Step 1 — Ensure Scene Safety** 🔴
Before approaching, check for traffic, fuel leaks, or unstable vehicles. Only approach when safe.

**Step 2 — Check Responsiveness**
Tap their shoulder firmly and call out. If unconscious, send someone to call emergency services immediately.

**Step 3 — Do NOT Move the Patient** ⚠️
If spinal injury is possible (vehicle crash, fall), **keep the head still**. Only move if there is immediate danger.

**Step 4 — Control Bleeding**
For the forearm laceration: apply firm, direct pressure with a clean cloth. Elevate the arm if possible. Do NOT remove the cloth — add more on top.

**Step 5 — Monitor Airway**
Ensure the airway is clear. If unconscious but breathing, place in the **recovery position** (only if no spinal injury suspected).

**Step 6 — Keep Them Warm & Calm**
Cover with a jacket or blanket. Keep talking to them to maintain consciousness.

*Next ambulance update in 2 minutes. Stay on the line.*`

export const useStore = create((set, get) => ({
  // ---- WebSocket State ----
  wsConnected: false,
  wsEvents: [],
  setWsConnected: (connected) => set({ wsConnected: connected }),
  addWsEvent: (event) => set(s => ({ wsEvents: [...s.wsEvents, event] })),

  // ---- Accessibility ----
  a11yMode: 'standard',
  setA11yMode: (mode) => set({ a11yMode: mode }),

  // ---- Incident State Machine ----
  incidentState: 'IDLE',
  incidentStates: INCIDENT_STATES,
  setIncidentState: (s) => set({ incidentState: s }),

  // ---- Agents ----
  agents: AGENTS,
  agentStatuses: Object.fromEntries(AGENTS.map(a => [a.id, 'idle'])),
  agentLogs:     Object.fromEntries(AGENTS.map(a => [a.id, []])),
  agentProgress: Object.fromEntries(AGENTS.map(a => [a.id, 0])),

  // ---- SOS Flow ----
  sosActive: false,
  sosTimestamp: null,
  location: null,
  bloodGroup: 'Unknown',
  emergencyType: '',

  setBloodGroup: (bg) => set({ bloodGroup: bg }),
  setEmergencyType: (et) => set({ emergencyType: et }),

  // ---- RAG ----
  ragQuery: '',
  ragResponse: '',
  ragSources: [],
  ragStreaming: false,
  ragLanguage: 'en',
  setRagQuery: (q) => set({ ragQuery: q }),
  setRagLanguage: (l) => set({ ragLanguage: l }),

  // ---- Triage ----
  triageResult: null,
  hospitals: [],
  mcpTools: [],
  guidanceStream: '',

  // ---- Hazard ----
  hazards: [],
  addHazard: (h) => set(s => ({ hazards: [h, ...s.hazards] })),

  // ---- Offline ----
  isOnline: navigator.onLine,
  setOnline: (v) => set({ isOnline: v }),

  // ---- Reset ----
  resetIncident: () => set({
    sosActive: false,
    sosTimestamp: null,
    incidentState: 'IDLE',
    agentStatuses: Object.fromEntries(AGENTS.map(a => [a.id, 'idle'])),
    agentLogs:     Object.fromEntries(AGENTS.map(a => [a.id, []])),
    agentProgress: Object.fromEntries(AGENTS.map(a => [a.id, 0])),
    triageResult: null,
    hospitals: [],
    mcpTools: [],
    guidanceStream: '',
  }),

  // ---- WebSocket Event Interpreter ----
  setAgentFromWs: (data) => {
    const { event, agent, status, message, metadata } = data
    if (!event) return

    // 1. SOS Triggered Event
    if (event === 'sos_triggered') {
      set({
        sosActive: true,
        sosTimestamp: Date.now(),
        location: metadata?.location || null,
        a11yMode: metadata?.accessibilityMode || 'standard',
        incidentState: 'DETECTED',
        agentStatuses: Object.fromEntries(AGENTS.map(a => [a.id, 'idle'])),
        agentLogs: Object.fromEntries(AGENTS.map(a => [a.id, []])),
        agentProgress: Object.fromEntries(AGENTS.map(a => [a.id, 0])),
        triageResult: null,
        hospitals: [],
        mcpTools: [],
        guidanceStream: '',
      })
      return
    }

    // 2. Orchestrator Started Event
    if (event === 'orchestrator_started') {
      set(s => ({
        agentStatuses: { ...s.agentStatuses, orchestrator: 'active' },
        agentLogs: { ...s.agentLogs, orchestrator: [...(s.agentLogs.orchestrator || []), message] },
        agentProgress: { ...s.agentProgress, orchestrator: 20 },
        incidentState: 'DETECTED',
      }))
      return
    }

    // 3. Agent Activated Event
    if (event === 'agent_activated') {
      const activeAgent = agent
      const newStatus = status === 'running' ? 'active' : status === 'completed' ? 'done' : status === 'failed' ? 'error' : 'idle'
      set(s => {
        const prevLogs = s.agentLogs[activeAgent] || []
        const updatedLogs = message ? [...prevLogs, message] : prevLogs
        const newProgress = newStatus === 'done' ? 100 : newStatus === 'active' ? 50 : 0
        return {
          agentStatuses: { ...s.agentStatuses, [activeAgent]: newStatus },
          agentLogs: { ...s.agentLogs, [activeAgent]: updatedLogs },
          agentProgress: { ...s.agentProgress, [activeAgent]: newProgress },
        }
      })

      // Special metadata updates for triage & locate
      if (activeAgent === 'triage' && status === 'completed' && metadata) {
        set({
          triageResult: {
            severity: metadata.severity === 'high' ? 4 : metadata.severity === 'medium' ? 2 : 1,
            label: metadata.severity?.toUpperCase() || 'UNKNOWN',
            injuries: metadata.summary ? [metadata.summary] : [],
            actions: metadata.vital_checks || [],
            warnings: [],
            doNotMove: metadata.severity === 'high',
            confidence: 0.9
          }
        })
      }

      if (activeAgent === 'locate' && status === 'completed' && metadata) {
        set({
          hospitals: [
            {
              name: metadata.hospital || 'Sylhet Trauma Center',
              dist: metadata.distance_km ? `${metadata.distance_km} km` : 'Unknown',
              eta: metadata.eta || 'Calculating...',
              type: metadata.specialty || 'General Emergency',
              accessible: true,
              blood: true
            }
          ]
        })
      }
      return
    }

    // 4. RAG Retrieval Started Event
    if (event === 'rag_retrieval_started') {
      set(s => ({
        agentStatuses: { ...s.agentStatuses, guidance: 'active' },
        agentLogs: { ...s.agentLogs, guidance: [...(s.agentLogs.guidance || []), message] },
        agentProgress: { ...s.agentProgress, guidance: 10 },
        ragStreaming: true,
      }))
      return
    }

    // 5. RAG Chunk Stream Event
    if (event === 'rag_chunk_stream') {
      set(s => {
        const currentStream = s.guidanceStream || ''
        const chunk = metadata?.chunk || message || ''
        const newStream = currentStream + (currentStream ? ' ' : '') + chunk
        return {
          agentStatuses: { ...s.agentStatuses, guidance: 'active' },
          guidanceStream: newStream,
          ragResponse: newStream,
          agentProgress: { ...s.agentProgress, guidance: 50 },
        }
      })
      return
    }

    // 6. RAG Completed Event
    if (event === 'rag_completed') {
      set(s => ({
        agentStatuses: { ...s.agentStatuses, guidance: 'done' },
        agentLogs: { ...s.agentLogs, guidance: [...(s.agentLogs.guidance || []), message] },
        agentProgress: { ...s.agentProgress, guidance: 100 },
        guidanceStream: metadata?.fullGuidance || s.guidanceStream,
        ragResponse: metadata?.fullGuidance || s.ragResponse,
        ragSources: metadata?.citations || [],
        ragStreaming: false,
      }))
      return
    }

    // 7. Dispatch Started Event
    if (event === 'dispatch_started') {
      set(s => ({
        agentStatuses: { ...s.agentStatuses, dispatch: 'active' },
        agentLogs: { ...s.agentLogs, dispatch: [...(s.agentLogs.dispatch || []), message] },
        agentProgress: { ...s.agentProgress, dispatch: 30 },
        incidentState: 'DISPATCHED',
      }))
      return
    }

    // 8. Dispatch Completed Event
    if (event === 'dispatch_completed') {
      set(s => {
        const toolLog = {
          tool: 'dispatch_emergency',
          status: 'success',
          payload: { hospital: metadata?.hospital },
          response: `Vehicle ${metadata?.vehicleId || 'AMB'} dispatched. ETA ${metadata?.eta || 'N/A'}`
        }
        return {
          agentStatuses: { ...s.agentStatuses, dispatch: 'done' },
          agentLogs: { ...s.agentLogs, dispatch: [...(s.agentLogs.dispatch || []), message] },
          agentProgress: { ...s.agentProgress, dispatch: 100 },
          mcpTools: [...(s.mcpTools || []), toolLog]
        }
      })
      return
    }

    // 9. Hazard Detected Event
    if (event === 'hazard_detected') {
      set(s => {
        const newHazard = {
          type: metadata?.hazard_type || 'Accident Obstruction',
          severity: metadata?.severity || 'medium',
          location: metadata?.location || s.location,
        }
        return {
          agentStatuses: { ...s.agentStatuses, hazard: 'done' },
          agentLogs: { ...s.agentLogs, hazard: [...(s.agentLogs.hazard || []), message] },
          agentProgress: { ...s.agentProgress, hazard: 100 },
          hazards: [newHazard, ...s.hazards],
        }
      })
      return
    }

    // 10. Emergency Resolved Event
    if (event === 'emergency_resolved') {
      set(s => ({
        agentStatuses: { ...s.agentStatuses, orchestrator: 'done' },
        agentLogs: { ...s.agentLogs, orchestrator: [...(s.agentLogs.orchestrator || []), message] },
        agentProgress: { ...s.agentProgress, orchestrator: 100 },
        incidentState: 'RESOLVED',
      }))
      return
    }

    // 11. System Error Event
    if (event === 'system_error') {
      set(s => ({
        agentStatuses: { ...s.agentStatuses, system: 'error' },
        agentLogs: { ...s.agentLogs, system: [...(s.agentLogs.system || []), message] },
      }))
      return
    }
  },

  // ---- SOS Trigger (mock orchestration) ----
  triggerSOS: (location) => {
    const store = get()
    if (store.sosActive) return

    set({ sosActive: true, sosTimestamp: Date.now(), location, incidentState: 'DETECTED' })

    const delay = (ms) => new Promise(r => setTimeout(r, ms))
    const agentOrder = ['orchestrator', 'triage', 'locate', 'dispatch', 'guidance', 'hazard', 'guard']

    const runAgent = async (agentId, startDelay) => {
      await delay(startDelay)
      set(s => ({
        agentStatuses: { ...s.agentStatuses, [agentId]: 'active' },
      }))

      const messages = MOCK_LOG_MESSAGES[agentId] || []
      for (let i = 0; i < messages.length; i++) {
        await delay(600 + Math.random() * 400)
        set(s => ({
          agentLogs:     { ...s.agentLogs,     [agentId]: [...s.agentLogs[agentId], messages[i]] },
          agentProgress: { ...s.agentProgress, [agentId]: Math.round(((i + 1) / messages.length) * 100) },
        }))
      }

      set(s => ({ agentStatuses: { ...s.agentStatuses, [agentId]: 'done' } }))
    }

    // Orchestrator first, then parallel fan-out
    ;(async () => {
      await runAgent('orchestrator', 200)
      set({ incidentState: 'TRIAGED' })

      // Parallel agents
      await Promise.all([
        runAgent('triage',   200),
        runAgent('locate',   400),
        runAgent('dispatch', 600),
        runAgent('guidance', 800),
        runAgent('hazard',   1000),
        runAgent('guard',    300),
      ])

      set({ incidentState: 'DISPATCHED' })
      await delay(800)

      // Dynamically calculate nearest hospitals based on coordinates
      const loc = location || { lat: 24.2502, lng: 89.9167 }
      const localHospitalsDB = [
        { name: "Tangail General Hospital", lat: 24.2498, lng: 89.9196, type: "General & Trauma Emergency", accessible: true, blood: true },
        { name: "Sheikh Hasina Medical College Hospital, Tangail", lat: 24.2385, lng: 89.9231, type: "Level 2 Trauma Care", accessible: true, blood: true },
        { name: "Sylhet MAG Osmani Medical College", lat: 24.8997, lng: 91.8624, type: "Level 1 Trauma & Surgical Care", accessible: true, blood: true },
        { name: "Sylhet Trauma Center", lat: 24.8872, lng: 91.8615, type: "Trauma & Orthopedic Surgery", accessible: true, blood: true },
        { name: "Dhaka Medical College Hospital", lat: 23.7258, lng: 90.3980, type: "Level 1 Trauma & Burn Care", accessible: true, blood: true },
        { name: "Square Hospital Dhaka", lat: 23.7516, lng: 90.3815, type: "Multi-specialty Emergency", accessible: true, blood: true }
      ]

      const simulatedHospitals = localHospitalsDB.map(h => {
        const distDeg = Math.sqrt((h.lat - loc.lat)**2 + (h.lng - loc.lng)**2)
        const distKm = Math.round(distDeg * 110 * 10) / 10
        const etaMins = Math.max(2, Math.round(distKm * 1.5))
        return {
          name: h.name,
          dist: distKm < 0.1 ? "0.1 km" : `${distKm} km`,
          eta: `${etaMins} min`,
          type: h.type,
          accessible: h.accessible,
          blood: h.blood,
          lat: h.lat,
          lng: h.lng
        }
      }).sort((a, b) => parseFloat(a.dist) - parseFloat(b.dist)).slice(0, 3)

      set({
        triageResult: MOCK_TRIAGE_RESULT,
        hospitals: simulatedHospitals,
        mcpTools: MOCK_MCP_TOOLS
      })

      // Stream guidance
      set({ incidentState: 'GUIDED', guidanceStream: '' })
      const words = MOCK_GUIDANCE_STREAM.split(' ')
      for (let i = 0; i < words.length; i++) {
        await delay(40 + Math.random() * 30)
        set(s => ({ guidanceStream: s.guidanceStream + (i === 0 ? '' : ' ') + words[i] }))
      }

      await delay(1500)
      set({ incidentState: 'RESOLVED' })
    })()
  },

  // ---- RAG Query (mock) ----
  queryRAG: async (question, language) => {
    set({ ragStreaming: true, ragResponse: '', ragSources: [] })

    await new Promise(r => setTimeout(r, 800))

    const sources = [
      { title: 'WHO First Aid Manual 2024', section: '§4.3 Head Trauma', score: 0.94, chunk: 'For head trauma injuries, the primary concern is maintaining airway, breathing, and circulation...' },
      { title: 'Bangladesh DGHS Emergency Protocol', section: 'Road Accident Response', score: 0.88, chunk: 'Bystander first aid in road accidents should prioritize scene safety before patient assessment...' },
      { title: 'Red Cross First Aid Guidelines', section: 'Bleeding Control', score: 0.81, chunk: 'Direct pressure is the most effective method for controlling external bleeding...' },
    ]

    set({ ragSources: sources })

    const response = language === 'bn'
      ? `**মাথার আঘাতের জন্য প্রাথমিক চিকিৎসা**\n\n*উৎস: WHO প্রথম সহায়তা নির্দেশিকা | নির্ভরযোগ্যতা: ৯৪%*\n\n**পদক্ষেপ ১:** রোগীকে সরাবেন না — মেরুদণ্ডে আঘাত হতে পারে।\n\n**পদক্ষেপ ২:** শ্বাস-প্রশ্বাস পরীক্ষা করুন। শ্বাসনালী পরিষ্কার রাখুন।\n\n**পদক্ষেপ ৩:** রক্তক্ষরণ নিয়ন্ত্রণ করুন — সরাসরি চাপ দিন।\n\n**পদক্ষেপ ৪:** জরুরি সেবা কল করুন — ৯৯৯ বা ১৯৯।\n\n**পদক্ষেপ ৫:** রোগীকে সচেতন রাখুন — কথা বলুন।`
      : MOCK_GUIDANCE_STREAM

    const words = response.split(' ')
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 35 + Math.random() * 25))
      set(s => ({ ragResponse: s.ragResponse + (i === 0 ? '' : ' ') + words[i] }))
    }

    set({ ragStreaming: false })
  },
}))
