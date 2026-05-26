import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CreateInvoice from './pages/CreateInvoice'
import InvoicePreview from './pages/InvoicePreview'
import ReceiptPreview from './pages/ReceiptPreview'
import InvoiceHistory from './pages/InvoiceHistory'

export default function App() {
  return (
    <>
      {/* AI animated background layers */}
      <div className="bg-ai-gradient" />
      <div className="ai-orb ai-orb-1" />
      <div className="ai-orb ai-orb-2" />
      <div className="ai-orb ai-orb-3" />
      
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateInvoice />} />
          <Route path="/preview/:id" element={<InvoicePreview />} />
          <Route path="/receipt/:id" element={<ReceiptPreview />} />
          <Route path="/history" element={<InvoiceHistory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
