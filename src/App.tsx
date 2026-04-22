import { useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import { InvoiceProvider } from "./context/InvoiceProvider";
import { useInvoices } from "./context/useInvoices";
import Sidebar from "./components/Sidebar";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceForm from "./components/InvoiceForm";
import type { Invoice, InvoiceStatus } from "./types";
import "./styles/global.css";

// ── Page type ──────────────────────────────────────────────────────────────
type Page = "list" | "detail";

// ── Inner app — consumes contexts ──────────────────────────────────────────
function InvoiceApp() {
  const { invoices, saveInvoice, deleteInvoice, markAsPaid } = useInvoices();

  const [page, setPage]               = useState<Page>("list");
  const [activeId, setActiveId]       = useState<string | null>(null);
  const [filters, setFilters]         = useState<InvoiceStatus[]>([]);
  const [formOpen, setFormOpen]       = useState(false);
  const [formInvoice, setFormInvoice] = useState<Invoice | null>(null);

  const activeInvoice = invoices.find((i) => i.id === activeId) ?? null;

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goHome = () => {
    setPage("list");
    setActiveId(null);
  };

  const openDetail = (id: string) => {
    setActiveId(id);
    setPage("detail");
  };

  const openNew = () => {
    setFormInvoice(null);
    setFormOpen(true);
  };

  const openEdit = () => {
    setFormInvoice(activeInvoice);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setFormInvoice(null);
  };

  // ── Filter ─────────────────────────────────────────────────────────────────
  const toggleFilter = (status: InvoiceStatus) => {
    setFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleSave = (invoice: Invoice) => {
    saveInvoice(invoice);
    closeForm();
  };

  const handleDelete = (id: string) => {
    deleteInvoice(id);
    goHome();
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <Sidebar onLogoClick={goHome} />

      {/* Main content */}
      <main className={`main${formOpen ? " dim" : ""}`}>
        {page === "list" ? (
          <InvoiceList
            invoices={invoices}
            filters={filters}
            onFilterChange={toggleFilter}
            onSelect={openDetail}
            onNewInvoice={openNew}
          />
        ) : activeInvoice ? (
          <InvoiceDetail
            invoice={activeInvoice}
            onBack={goHome}
            onEdit={openEdit}
            onDelete={handleDelete}
            onMarkPaid={markAsPaid}
          />
        ) : null}
      </main>

      {/* Form panel */}
      {formOpen && (
        <InvoiceForm
          invoice={formInvoice}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

    </div>
  );
}

// ── Root — wraps everything in providers ───────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <InvoiceApp />
      </InvoiceProvider>
    </ThemeProvider>
  );
}