import { useLocation, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Receipt } from 'lucide-react'
import { dummyInvoices, DISCL } from '../data/dummy'
import { formatUSD, formatDate } from '../utils/calculations'
import { exportReceiptHTML } from '../utils/export'
import WalletBox from '../components/WalletBox'

export default function ReceiptPreview() {
  const { id } = useParams()
  const { state } = useLocation()
  const inv = state?.invoice || dummyInvoices.find(i => i.id === Number(id))

  if (!inv) {
    return (
      <div className="card text-center py-16">
        <p className="text-gray-400">Receipt not found.</p>
        <Link to="/history" className="btn-primary mt-4">Back to History</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/preview/${inv.id}`} className="btn-ghost p-2"><ArrowLeft className="w-4 h-4" /></Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-accent-green" /> Receipt Preview
            </h1>
            <p className="text-xs text-gray-500">{inv.receiptNumber}</p>
          </div>
        </div>
        <button className="btn-secondary text-sm" onClick={() => exportReceiptHTML(inv)}>
          <Download className="w-4 h-4" /> Export HTML
        </button>
      </div>

      <div className="card max-w-4xl">
        <div className="demo-banner mb-6">{DISCL}</div>
        <h2 className="text-2xl font-bold gradient-text mb-2">Web3 AI Payment Receipt</h2>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div><span className="text-gray-500">Invoice #:</span> <span className="text-gray-200">{inv.invoiceNumber}</span></div>
          <div><span className="text-gray-500">Receipt #:</span> <span className="text-gray-200">{inv.receiptNumber}</span></div>
          <div><span className="text-gray-500">Date paid:</span> <span className="text-gray-200">{formatDate(inv.paidAt || inv.createdAt)}</span></div>
          <div>
            <span className="text-gray-500">Status:</span>{' '}
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Demo Paid
            </span>
          </div>
        </div>

        <div className="text-2xl font-bold gradient-text mb-6">
          {formatUSD(inv.total)} paid on {formatDate(inv.paidAt || inv.createdAt)}
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
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="font-mono">{formatUSD(inv.subtotal)}</span></div>
            <div className="flex justify-between text-gray-400"><span>Network fee</span><span className="font-mono">{inv.networkFee} ETH</span></div>
            <div className="flex justify-between text-white font-semibold text-base border-t border-surface-border pt-2"><span>Total</span><span className="font-mono">{formatUSD(inv.total)}</span></div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-white mb-3">On-chain Payment History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border text-gray-500">
                <th className="text-left py-2 font-medium">Method</th>
                <th className="text-left py-2 font-medium">Network</th>
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-right py-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-surface-border/50">
                <td className="py-2 text-gray-300">Demo Wallet</td>
                <td className="py-2 text-gray-400">Sepolia Testnet</td>
                <td className="py-2 text-gray-400">{formatDate(inv.paidAt || inv.createdAt)}</td>
                <td className="py-2 text-right font-mono text-gray-200">{formatUSD(inv.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
