import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Receipt, History } from 'lucide-react'
import { dummyInvoices } from '../data/dummy'
import { formatUSD } from '../utils/calculations'
import StatusBadge from '../components/StatusBadge'

export default function InvoiceHistory() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  let list = [...dummyInvoices].reverse()

  if (filter !== 'all') list = list.filter(i => i.status === filter)
  if (search)           list = list.filter(i => i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || i.client.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <History className="w-6 h-6 text-noir-400" /> Invoice History
        </h1>
        <p className="text-sm text-gray-500 mt-1">All demo invoices — {dummyInvoices.length} total</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input className="input pl-10 text-sm" placeholder="Search invoice # or client..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['all', 'draft', 'pending', 'paid', 'failed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`btn text-xs py-1.5 px-3 ${filter === s ? 'bg-noir-500/30 border border-noir-400/50 text-noir-300' : 'bg-surface-light text-gray-500 border border-surface-border'}`}>
              {s === 'all' ? 'All' : s === 'paid' ? 'Demo Paid' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-border text-gray-500">
              <th className="text-left py-3 font-medium">Invoice #</th>
              <th className="text-left py-3 font-medium">Client</th>
              <th className="text-left py-3 font-medium">Date</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-right py-3 font-medium">Amount</th>
              <th className="text-right py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(inv => (
              <tr key={inv.id} className="border-b border-surface-border/50 hover:bg-surface-light/30 transition-colors">
                <td className="py-3 font-mono text-noir-300">
                  <Link to={`/preview/${inv.id}`} className="hover:underline">{inv.invoiceNumber}</Link>
                </td>
                <td className="py-3 text-gray-300">{inv.client.name}</td>
                <td className="py-3 text-gray-400">{new Date(inv.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                <td className="py-3"><StatusBadge status={inv.status} /></td>
                <td className="py-3 text-right font-mono text-gray-300">{formatUSD(inv.total)}</td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/preview/${inv.id}`} className="btn-ghost p-1.5"><Eye className="w-4 h-4" /></Link>
                    {inv.status === 'paid' && (
                      <Link to={`/receipt/${inv.id}`} className="btn-ghost p-1.5 text-emerald-400"><Receipt className="w-4 h-4" /></Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-gray-500">No invoices found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
