import { useLocation, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Sparkles } from 'lucide-react'
import { dummyInvoices, DISCL } from '../data/dummy'
import { formatUSD, formatDate } from '../utils/calculations'
import { exportInvoiceHTML } from '../utils/export'
import StatusBadge from '../components/StatusBadge'
import WalletBox from '../components/WalletBox'

export default function InvoicePreview() {
  const { id } = useParams()
  const { state } = useLocation()
  const inv = state?.invoice || dummyInvoices.find(i => i.id === Number(id))

  if (!inv) {
    return (
      <div className="card text-center py-16">
        <p className="text-gray-400">Invoice not found.</p>
        <Link to="/history" className="btn-primary mt-4">Back to History</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-ghost p-2"><ArrowLeft className="w-4 h-4" /></Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-noir-400" /> Invoice Preview
            </h1>
            <p className="text-xs text-gray-500">{inv.invoiceNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={inv.status} />
          <button className="btn-secondary text-sm" onClick={() => exportInvoiceHTML(inv)}>
            <Download className="w-4 h-4" /> Export HTML
          </button>
          {inv.status === 'paid' && (
            <Link to={`/receipt/${inv.id}`} className="btn-primary text-sm">View Receipt</Link>
          )}
        </div>
      </div>

      <div className="card max-w-4xl">
        <div className="demo-banner mb-6">{DISCL}</div>
        <h2 className="text-2xl font-bold gradient-text mb-4">Web3 AI Invoice</h2>

        <div className="flex justify-between mb-8">
          <div>
            <strong className="text-white">{inv.company.name}</strong>
            <p className="text-sm text-gray-400">{inv.company.city}</p>
            <p className="text-sm text-gray-400">{inv.company.email}</p>
          </div>
          <div className="text-right">
            <strong className="text-gray-400">Bill to</strong>
            <p className="text-sm text-white">{inv.client.name}</p>
            <p className="text-sm text-gray-400">{inv.client.city}</p>
            <p className="text-sm text-gray-400">{inv.client.email}</p>
          </div>
        </div>

        <WalletBox invoice={inv} />

        <table className="w-full text-sm mt-6">
          <thead>
            <tr className="border-b border-surface-border text-gray-500">
              <th className="text-left py-3 font-medium">Description</th>
              <th className="text-center py-3 font-medium w-16">Qty</th>
              <th className="text-right py-3 font-medium w-32">Unit Price</th>
              <th className="text-right py-3 font-medium w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.items.map((it, i) => (
              <tr key={i} className="border-b border-surface-border/50">
                <td className="py-3 text-gray-200">
                  {it.description}
                  <p className="text-xs text-gray-500">{it.detail}</p>
                </td>
                <td className="py-3 text-center text-gray-400">{it.qty}</td>
                <td className="py-3 text-right font-mono text-gray-400">{it.unitPrice} USDC</td>
                <td className="py-3 text-right font-mono text-gray-200">{it.unitPrice * it.qty} USDC</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span><span className="font-mono">{formatUSD(inv.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Network fee</span><span className="font-mono">{inv.networkFee} ETH</span>
            </div>
            <div className="flex justify-between text-white font-semibold text-base border-t border-surface-border pt-2">
              <span>Total</span><span className="font-mono">{formatUSD(inv.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
