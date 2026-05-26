import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import DemoBanner from './DemoBanner'
import AnimatedBackground from './AnimatedBackground'

export default function Layout() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="flex h-screen overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <DemoBanner />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
