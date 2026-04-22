import { createContext } from "react";
import type { Invoice } from "../types";

export interface InvoiceContextValue {
  invoices: Invoice[];
  saveInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}

export const InvoiceContext = createContext<InvoiceContextValue | undefined>(undefined);