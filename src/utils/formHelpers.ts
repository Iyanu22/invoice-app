import { genId, addDays, today } from "./helpers";
import type { Invoice, InvoiceStatus } from "../types";
import type { InvoiceFormValues } from "./invoiceSchema";

/** Convert a saved Invoice → react-hook-form default values */
export function invoiceToForm(inv: Invoice): InvoiceFormValues {
  return {
    createdAt:     inv.createdAt, 
    description:  inv.description,
    paymentTerms: inv.paymentTerms,
    clientName:   inv.clientName,
    clientEmail:  inv.clientEmail,
    senderAddress: {
      street:   inv.senderAddress.street,
      city:     inv.senderAddress.city,
      postCode: inv.senderAddress.postCode,
      country:  inv.senderAddress.country,
    },
    clientAddress: {
      street:   inv.clientAddress.street,
      city:     inv.clientAddress.city,
      postCode: inv.clientAddress.postCode,
      country:  inv.clientAddress.country,
    },
    items: inv.items.map((i) => ({
      name:     i.name,
      quantity: i.quantity,
      price:    i.price,
      total:    i.total,
    })),
  };
}

/** Convert react-hook-form values → Invoice object to save */
export function formToInvoice(
  f: InvoiceFormValues,
  status: InvoiceStatus,
  existingId?: string
): Invoice {
  const items = f.items.map((i) => ({
    name:     i.name,
    quantity: Number(i.quantity),
    price:    Number(i.price),
    total:    Number(i.quantity) * Number(i.price),
  }));

  return {
    id:           existingId ?? genId(),
    status,
    createdAt:    today(),
    paymentDue:   addDays(today(), f.paymentTerms),
    paymentTerms: Number(f.paymentTerms),
    description:  f.description,
    clientName:   f.clientName,
    clientEmail:  f.clientEmail,
    senderAddress: f.senderAddress,
    clientAddress: f.clientAddress,
    items,
    total: items.reduce((sum, i) => sum + i.total, 0),
  };
}

/** Default values for a blank new invoice form */
export const defaultFormValues: InvoiceFormValues = {
  createdAt:     new Date().toISOString().split("T")[0], 
  description:  "",
  paymentTerms: 30,
  clientName:   "",
  clientEmail:  "",
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  items: [{ name: "", quantity: 1, price: 0, total: 0 }],
};