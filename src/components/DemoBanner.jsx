import { AlertTriangle } from 'lucide-react'

export default function DemoBanner() {
  return (
    <div className="demo-banner flex items-center justify-center gap-2 mb-6">
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <span>DEMO DOCUMENT ONLY — NOT A REAL RECEIPT OR PROOF OF PAYMENT</span>
      <AlertTriangle className="w-4 h-4 shrink-0" />
    </div>
  )
}
