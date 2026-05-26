# SaboSuper Invoice — Web3 AI Invoice Generator

> DEMO DOCUMENT ONLY — NOT A REAL RECEIPT OR PROOF OF PAYMENT

AI-powered Web3 invoice generator for demo purposes. Generates fictional invoices and receipts with dummy wallet addresses, transaction hashes, and testnet references.

## Features

- 🧾 Create & preview Web3 invoices with dummy data
- 📄 Export invoices and receipts as standalone HTML files
- 💼 Dark Web3 UI with animated neural mesh background
- 🔗 Dummy wallet addresses & transaction hashes (Sepolia Testnet)
- ✅ Status tracking: Draft, Pending, Demo Paid, Failed
- 🤖 AI-powered quick-add for Web3 service items

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3
- React Router 6
- Lucide Icons
- Canvas API (animated background)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
npx vite preview
```

## ⚠️ Disclaimer

**DEMO WEB3 DOCUMENT ONLY — NOT A REAL RECEIPT OR PROOF OF PAYMENT**

This project generates fictional Web3 payment documents for UI/layout testing only. It is not valid for:

- Payment verification
- Reimbursement proof
- Tax reporting
- Subscription confirmation

All wallet addresses, transaction hashes, amounts, and data are **100% fictitious**.

## Project Structure

```
src/
├── pages/
│   ├── Dashboard.jsx         # Overview with stats & recent invoices
│   ├── CreateInvoice.jsx     # Invoice creation form
│   ├── InvoicePreview.jsx    # Preview & export invoice
│   ├── ReceiptPreview.jsx    # Preview & export receipt
│   └── InvoiceHistory.jsx    # Search & filter all invoices
├── components/
│   ├── Layout.jsx            # App shell with sidebar & animated bg
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── AnimatedBackground.jsx# Canvas neural mesh animation
│   ├── DemoBanner.jsx        # Demo disclaimer banner
│   ├── StatusBadge.jsx       # Invoice status badge
│   └── WalletBox.jsx         # Wallet/tx info display
├── data/
│   └── dummy.js              # Fictitious wallets, invoices, items
└── utils/
    ├── calculations.js       # Math & formatting helpers
    └── export.js             # HTML export for invoices/receipts
```

## License

MIT — Demo purposes only.
