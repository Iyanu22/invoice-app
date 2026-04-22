import { z } from "zod";

const addressSchema = z.object({
  street:   z.string().min(1, "can't be empty"),
  city:     z.string().min(1, "can't be empty"),
  postCode: z.string().min(1, "can't be empty"),
  country:  z.string().min(1, "can't be empty"),
});

const itemSchema = z.object({
  name:     z.string().min(1, "can't be empty"),
  quantity: z.number().min(1, "must be at least 1"),
  price:    z.number().min(0.01, "must be greater than 0"),
  total:    z.number(),
});

export const invoiceSchema = z.object({
  createdAt:     z.string().min(1, "can't be empty"),  // ← added
  description:   z.string().min(1, "can't be empty"),
  paymentTerms:  z.number().min(1, "required"),
  clientName:    z.string().min(1, "can't be empty"),
  clientEmail:   z.string()
                  .min(1, "can't be empty")
                  .email("must be a valid email"),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items:         z.array(itemSchema).min(1, "add at least one item"),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;