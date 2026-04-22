import { useEffect, useState, type ReactNode } from "react";
import { InvoiceContext } from "./invoice.context";
import type { Invoice } from "../types";
import { SEED_INVOICES } from "../utils/seedData";

const STORAGE_KEY = "inv_v3";

function loadInvoices(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Invoice[]) : SEED_INVOICES;
  } catch {
    return SEED_INVOICES;
  }
}

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(loadInvoices);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  function saveInvoice(invoice: Invoice): void {
    setInvoices((prev) => {
      const idx = prev.findIndex((i) => i.id === invoice.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = invoice;
        return next;
      }
      return [invoice, ...prev];
    });
  }

  function deleteInvoice(id: string): void {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
  }

  function markAsPaid(id: string): void {
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "paid" as const } : i))
    );
  }

  return (
    <InvoiceContext.Provider
      value={{ invoices, saveInvoice, deleteInvoice, markAsPaid }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}