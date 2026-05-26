export function calcSubtotal(items) {
  return items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0)
}

export function calcTotal(items, networkFee = 0.002) {
  return calcSubtotal(items)
}

export function formatUSD(n) {
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
