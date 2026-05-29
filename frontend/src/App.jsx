import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import OfflineBanner from './components/OfflineBanner'
import Home from './pages/Home'
import Emergency from './pages/Emergency'
import Dashboard from './pages/Dashboard'
import HazardReport from './pages/HazardReport'
import Accessibility from './pages/Accessibility'
import DemoGraph from './pages/DemoGraph'

function App() {
  return (
    <>
      {/* Global Navigation Bar */}
      <Nav />

      {/* Main Page Layout */}
      <main id="main-content" style={{ flex: 1, position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hazard" element={<HazardReport />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/demo-graph" element={<DemoGraph />} />
        </Routes>
      </main>

      {/* Floating Offline Status Banner */}
      <OfflineBanner />
    </>
  )
}

export default App
