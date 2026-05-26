const statusConfig = {
  draft:   { bg: 'bg-gray-500/15',    text: 'text-gray-400',    border: 'border-gray-500/30',    label: 'Draft' },
  pending: { bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-amber-500/30',   label: 'Pending' },
  paid:    { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Demo Paid' },
  failed:  { bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/30',     label: 'Failed' },
}

export default function StatusBadge({ status }) {
  const s = statusConfig[status] || statusConfig.draft
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
      {s.label}
    </span>
  )
}
