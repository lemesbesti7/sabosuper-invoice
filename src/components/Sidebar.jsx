import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FilePlus2,
  History,
  Sparkles,
} from 'lucide-react'

const links = [
  { to: '/',        icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/create',  icon: FilePlus2,       label: 'Create Invoice' },
  { to: '/history', icon: History,         label: 'Invoice History' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-surface/90 backdrop-blur-xl border-r border-surface-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-noir-500/20 border border-noir-400/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-noir-400" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">SaboSuper</h1>
            <p className="text-[11px] text-accent-cyan -mt-0.5">AI Invoice Demo</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-noir-500/15 text-noir-300 border border-noir-500/30'
                  : 'text-gray-400 hover:bg-surface-light hover:text-gray-200'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-surface-border">
        <div className="text-[11px] text-gray-600 space-y-0.5">
          <p className="text-amber-400 font-medium">DEMO ONLY</p>
          <p>No real payments</p>
          <p>All data is fictitious</p>
          <p className="text-noir-400 mt-2">AI Neural Background Active</p>
        </div>
      </div>
    </aside>
  )
}
