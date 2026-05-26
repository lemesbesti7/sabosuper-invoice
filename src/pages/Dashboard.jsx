import { Link } from 'react-router-dom'
import { FilePlus2, TrendingUp, CheckCircle2, Clock, XCircle, ArrowRight, Sparkles } from 'lucide-react'
import { dummyInvoices } from '../data/dummy'
import { formatUSD } from '../utils/calculations'
import StatusBadge from '../components/StatusBadge'

const stats = [
  { label: 'Total Invoices',  icon: TrendingUp,   color: 'text-noir-400',    bg: 'bg-noir-400/10',   value: dummyInvoices.length },
  { label: 'Demo Paid',       icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', value: dummyInvoices.filter(i => i.status === 'paid').length },
  { label: 'Pending',         icon: Clock,        color: 'text-amber-400',   bg: 'bg-amber-400/10',   value: dummyInvoices.filter(i => i.status === 'pending').length },
  { label: 'Failed',          icon: XCircle,      color: 'text-red-400',     bg: 'bg-red-400/10',     value: dummyInvoices.filter(i => i.status === 'failed').length },
]

export default function Dashboard() {
  const recent = [...dummyInvoices].reverse().slice(0, 5)
  const totalRevenue = dummyInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-noir-400" /> Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">SaboSuper AI Invoice — Web3 Demo Overview</p>
        </div>
        <Link to="/create" className="btn-primary">
          <FilePlus2 className="w-4 h-4" /> New Invoice
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card flex items-center gap-4 hover:border-noir-500/30 transition-colors">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div className="card">
        <p className="text-sm text-gray-500 mb-1">Total Revenue (Demo Paid)</p>
        <p className="text-3xl font-bold gradient-text">{formatUSD(totalRevenue)}</p>
      </div>

      {/* Recent */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Invoices</h2>
          <Link to="/history" className="text-sm text-noir-400 hover:text-noir-300 flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-border text-gray-500">
              <th className="text-left py-3 font-medium">Invoice #</th>
              <th className="text-left py-3 font-medium">Client</th>
              <th className="text-left py-3 font-medium">Date</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-right py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(inv => (
              <tr key={inv.id} className="border-b border-surface-border/50 hover:bg-surface-light/30 transition-colors">
                <td className="py-3 font-mono text-noir-300">
                  <Link to={`/preview/${inv.id}`} className="hover:underline">{inv.invoiceNumber}</Link>
                </td>
                <td className="py-3 text-gray-300">{inv.client.name}</td>
                <td className="py-3 text-gray-400">{new Date(inv.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td className="py-3"><StatusBadge status={inv.status} /></td>
                <td className="py-3 text-right font-mono text-gray-300">{formatUSD(inv.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
