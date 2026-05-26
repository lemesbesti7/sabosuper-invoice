export const NETWORK = 'Ethereum Sepolia Testnet'
export const TOKEN = 'USDC'
export const DISCL = 'DEMO DOCUMENT ONLY — NOT A REAL RECEIPT OR PROOF OF PAYMENT'

export const wallets = {
  sender:   '0xAI3nt0k3n11111111111111111111111111111111',
  receiver: '0xAI3nt0k3n22222222222222222222222222222222',
}

export const sampleItems = [
  { description: 'AI-Powered DEX Analytics',      detail: 'Machine learning volume predictions, smart money signals',   unitPrice: 750 },
  { description: 'Neural Wallet Risk Scoring',    detail: 'AI risk classification for wallet addresses',               unitPrice: 300 },
  { description: 'On-Chain Anomaly Detection',    detail: 'Real-time anomaly detection across DeFi protocols',        unitPrice: 500 },
  { description: 'AI Contract Audit Report',      detail: 'LLM-powered smart contract vulnerability analysis',        unitPrice: 1200 },
]

export function genTxHash() {
  const hex = [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
  return '0x' + hex
}

export function genInvoiceNumber(i) {
  return `INV-SS-2026-${String(i).padStart(4, '0')}`
}

export function genReceiptNumber(i) {
  return `RCPT-SS-2026-${String(i).padStart(4, '0')}`
}

function genInvoice(id, status, createdAt, items, networkFee = 0.002) {
  const subtotal = items.reduce((s, it) => s + it.unitPrice * it.qty, 0)
  return {
    id,
    invoiceNumber: genInvoiceNumber(id),
    receiptNumber: genReceiptNumber(id),
    status,
    createdAt,
    paidAt: status === 'paid' ? createdAt : null,
    company: { name: 'SaboSuper AI Labs', email: 'billing@sabosuper-ai.test', city: 'Demo City, Blockchain Network' },
    client:  { name: 'Demo DAO Organization', email: 'client@demo-dao.test', city: 'Jawa Tengah, Indonesia' },
    senderWallet:   wallets.sender,
    receiverWallet: wallets.receiver,
    txHash:    status === 'paid' ? genTxHash() : null,
    network:   NETWORK,
    token:     TOKEN,
    items,
    subtotal,
    networkFee,
    total:     subtotal,
    currency:  TOKEN,
  }
}

const statusOrder = ['paid', 'pending', 'paid', 'draft', 'paid', 'failed', 'pending', 'paid']

export const dummyInvoices = Array.from({ length: 8 }, (_, i) => {
  const items = [sampleItems[i % sampleItems.length]].map(it => ({ ...it, qty: 1 }))
  const day = String(20 + i).padStart(2, '0')
  return genInvoice(i + 1, statusOrder[i], `2026-03-${day}`, items)
})
