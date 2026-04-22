export type InvoiceStatus = "draft" | "pending" | "paid";

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  status: InvoiceStatus;
  createdAt: string;
  paymentDue: string;
  paymentTerms: number;
  description: string;
  clientName: string;
  clientEmail: string;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}

export interface FormItem {
  name: string;
  qty: string;
  price: string;
}

export interface FormState {
  sStreet: string;
  sCity: string;
  sPost: string;
  sCountry: string;
  cName: string;
  cEmail: string;
  cStreet: string;
  cCity: string;
  cPost: string;
  cCountry: string;
  date: string;
  terms: string;
  desc: string;
  items: FormItem[];
}

export type FormErrors = Partial<Record<string, string>>;