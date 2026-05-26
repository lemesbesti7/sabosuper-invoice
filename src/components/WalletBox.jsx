export default function WalletBox({ invoice }) {
  return (
    <div className="bg-noir-950/60 backdrop-blur-sm border border-surface-border rounded-xl p-5 font-mono text-xs space-y-2">
      <div className="flex items-center gap-2 text-gray-400">
        <span className="text-noir-400 font-semibold">Network</span>
        <span>Ethereum Sepolia Testnet</span>
      </div>
      <div className="flex items-start gap-2 text-gray-400">
        <span className="text-noir-400 font-semibold shrink-0">From</span>
        <span className="break-all text-gray-300">{invoice.senderWallet}</span>
      </div>
      <div className="flex items-start gap-2 text-gray-400">
        <span className="text-noir-400 font-semibold shrink-0">To</span>
        <span className="break-all text-gray-300">{invoice.receiverWallet}</span>
      </div>
      {invoice.txHash && (
        <div className="flex items-start gap-2 text-gray-400">
          <span className="text-noir-400 font-semibold shrink-0">TX Hash</span>
          <span className="break-all text-accent-cyan">{invoice.txHash}</span>
        </div>
      )}
    </div>
  )
}
