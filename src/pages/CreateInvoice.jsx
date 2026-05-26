import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Eye, Zap } from 'lucide-react'
import { wallets, NETWORK, TOKEN, sampleItems, genTxHash, genInvoiceNumber, genReceiptNumber } from '../data/dummy'
import { calcSubtotal, formatUSD } from '../utils/calculations'

const blankItem = { description: '', detail: '', qty: 1, unitPrice: 0 }

export default function CreateInvoice() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    clientName: '', clientEmail: '', clientCity: '',
    items: [{ ...blankItem }],
    networkFee: 0.002, status: 'draft',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const itemUpdate = (idx, k, v) => {
    setForm(f => {
      const items = [...f.items]
      items[idx] = { ...items[idx], [k]: v }
      return { ...f, items }
    })
  }

  const addItem    = () => set('items', [...form.items, { ...blankItem }])
  const removeItem = (i) => set('items', form.items.filter((_, idx) => idx !== i))
  const useSample  = (i) => {
    const s = sampleItems[i]
    set('items', [...form.items, { description: s.description, detail: s.detail, qty: 1, unitPrice: s.unitPrice }])
  }

  const subtotal = calcSubtotal(form.items)

  const handleSubmit = () => {
    const id = Date.now()
    const invoice = {
      id,
      invoiceNumber: genInvoiceNumber(id),
      receiptNumber: genReceiptNumber(id),
      status: form.status,
      createdAt: new Date().toISOString().slice(0, 10),
      paidAt: null,
      company: { name: 'SaboSuper AI Labs', email: 'billing@sabosuper-ai.test', city: 'Demo City, Blockchain Network' },
      client: { name: form.clientName || 'Demo Client', email: form.clientEmail || 'client@test.demo', city: form.clientCity || 'Jawa Tengah, Indonesia' },
      senderWallet: wallets.sender, receiverWallet: wallets.receiver,
      txHash: null, network: NETWORK, token: TOKEN,
      items: form.items.filter(it => it.description),
      subtotal, networkFee: form.networkFee, total: subtotal, currency: TOKEN,
    }
    navigate(`/preview/${id}`, { state: { invoice } })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-noir-400" /> Create Invoice
        </h1>
        <p className="text-sm text-gray-500 mt-1">AI-powered Web3 invoice generator</p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-base font-semibold text-white">Client Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <input className="input" placeholder="Client name"    value={form.clientName}  onChange={e => set('clientName', e.target.value)} />
          <input className="input" placeholder="Client email"   value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)} />
          <input className="input" placeholder="City / Country" value={form.clientCity}  onChange={e => set('clientCity', e.target.value)} />
        </div>
      </div>

      <div className="card space-y-3">
        <h2 className="text-base font-semibold text-white">Wallet Details</h2>
        <p className="text-xs text-gray-500">Auto-populated with dummy demo wallets</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Sender Wallet</label>
            <input className="input font-mono text-xs" value={wallets.sender} disabled />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Receiver Wallet</label>
            <input className="input font-mono text-xs" value={wallets.receiver} disabled />
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Line Items</h2>
          <div className="flex gap-2 flex-wrap justify-end">
            <span className="text-xs text-gray-500 mr-1 py-1">Quick add:</span>
            {sampleItems.map((s, i) => (
              <button key={i} className="btn-ghost text-xs py-1 px-2" onClick={() => useSample(i)}>
                + {s.description.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {form.items.map((it, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <div className="flex-1 grid grid-cols-4 gap-3">
              <input className="input" placeholder="Description" value={it.description} onChange={e => itemUpdate(idx, 'description', e.target.value)} />
              <input className="input" placeholder="Detail"       value={it.detail}      onChange={e => itemUpdate(idx, 'detail', e.target.value)} />
              <input className="input" type="number" min="1" placeholder="Qty" value={it.qty} onChange={e => itemUpdate(idx, 'qty', Number(e.target.value))} />
              <input className="input" type="number" min="0" step="0.01" placeholder="Price (USDC)" value={it.unitPrice} onChange={e => itemUpdate(idx, 'unitPrice', Number(e.target.value))} />
            </div>
            <button className="btn-ghost text-red-400 hover:bg-red-500/10 mt-1" onClick={() => removeItem(idx)}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button className="btn-secondary text-sm" onClick={addItem}>
          <Plus className="w-4 h-4" /> Add Item
        </button>

        <div className="border-t border-surface-border pt-4 flex justify-end">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span><span className="font-mono">{formatUSD(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Network fee</span><span className="font-mono">{form.networkFee} ETH</span>
            </div>
            <div className="flex justify-between text-white font-semibold border-t border-surface-border pt-2">
              <span>Total</span><span className="font-mono">{formatUSD(subtotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Status:</span>
          {['draft', 'pending', 'paid', 'failed'].map(s => (
            <button key={s} onClick={() => set('status', s)}
              className={`btn text-xs py-1.5 px-3 ${form.status === s ? 'bg-noir-500/30 border border-noir-400/50 text-noir-300' : 'bg-surface-light text-gray-500 border border-surface-border'}`}>
              {s === 'paid' ? 'Demo Paid' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={handleSubmit}>
          <Eye className="w-4 h-4" /> Preview Invoice
        </button>
      </div>
    </div>
  )
}
