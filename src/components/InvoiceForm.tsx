import { forwardRef } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TrashIcon } from "./Icons";
import { money } from "../utils/helpers";
import { invoiceSchema, type InvoiceFormValues } from "../utils/invoiceSchema";
import { invoiceToForm, formToInvoice, defaultFormValues } from "../utils/formHelpers";
import type { Invoice } from "../types";

// ── Custom DatePicker input (forwardRef required by react-datepicker) ────────
const DateInput = forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
  ({ value, onClick }, ref) => (
    <div className="fi cal-trigger" onClick={onClick} ref={ref}>
      <span>{value || "Select date"}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 6h14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 1v2M11 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
);
DateInput.displayName = "DateInput";

// ── Reusable text field ──────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  name: Parameters<UseFormRegister<InvoiceFormValues>>[0];
  type?: string;
  placeholder?: string;
  gridColumn?: string;
  register: UseFormRegister<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  gridColumn,
  register,
  errors,
}: FieldProps) {
  // Resolve nested error paths e.g. "senderAddress.street"
  const getError = (): string | undefined => {
    const parts = (name as string).split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let err: any = errors;
    for (const p of parts) err = err?.[p];
    return err?.message as string | undefined;
  };

  const errMsg = getError();

  return (
    <div className="ff" style={gridColumn ? { gridColumn } : {}}>
      <label htmlFor={name as string}>
        {label}
        {errMsg && <span className="ferr-msg">{errMsg}</span>}
      </label>
      <input
        id={name as string}
        type={type}
        className={`fi${errMsg ? " fe" : ""}`}
        placeholder={placeholder}
        aria-invalid={!!errMsg}
        {...register(name)}
      />
    </div>
  );
}

// ── InvoiceForm ──────────────────────────────────────────────────────────────
interface Props {
  invoice: Invoice | null;
  onSave: (invoice: Invoice) => void;
  onClose: () => void;
}

export default function InvoiceForm({ invoice, onSave, onClose }: Props) {
  const isEdit = invoice !== null;

  // ── react-hook-form setup ──────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: isEdit ? invoiceToForm(invoice) : defaultFormValues,
  });

  // ── Dynamic item list ──────────────────────────────────────────────────────
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // ── Watch items for live totals ────────────────────────────────────────────
  const watchedItems = useWatch({ control, name: "items" });

  // ── Submit handlers ────────────────────────────────────────────────────────
  const onSubmitPending = handleSubmit((data) => {
    onSave(formToInvoice(data, "pending", invoice?.id));
  });

  const onSubmitDraft = () => {
    const raw = getValues();
    onSave(formToInvoice(raw, "draft", invoice?.id));
  };

  const onSubmitEdit = handleSubmit((data) => {
    onSave(formToInvoice(data, invoice!.status, invoice!.id));
  });

  return (
    <>
      {/* Backdrop */}
      <div className="pov" onClick={onClose} aria-hidden="true" />

      <aside
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? `Edit Invoice #${invoice.id}` : "New Invoice"}
      >
        {/* ── Header ── */}
        <div className="ph2">
          <h2>
            {isEdit ? (
              <>
                Edit <span>#</span>{invoice.id}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>
        </div>

        {/* ── Scrollable body ── */}
        <div className="pbody">

          {/* ── Bill From ── */}
          <div className="fsec">
            <p className="fsl">Bill From</p>
            <div className="fg">
              <Field
                label="Street Address"
                name="senderAddress.street"
                placeholder="19 Union Terrace"
                register={register}
                errors={errors}
              />
              <div className="fg fg3">
                <Field
                  label="City"
                  name="senderAddress.city"
                  placeholder="London"
                  register={register}
                  errors={errors}
                />
                <Field
                  label="Post Code"
                  name="senderAddress.postCode"
                  placeholder="E1 3EZ"
                  register={register}
                  errors={errors}
                />
                <Field
                  label="Country"
                  name="senderAddress.country"
                  placeholder="United Kingdom"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>

          {/* ── Bill To ── */}
          <div className="fsec">
            <p className="fsl">Bill To</p>
            <div className="fg">
              <Field
                label="Client's Name"
                name="clientName"
                placeholder="Alex Grim"
                register={register}
                errors={errors}
              />
              <Field
                label="Client's Email"
                name="clientEmail"
                type="email"
                placeholder="e.g. email@example.com"
                register={register}
                errors={errors}
              />
              <Field
                label="Street Address"
                name="clientAddress.street"
                placeholder="84 Church Way"
                register={register}
                errors={errors}
              />
              <div className="fg fg3">
                <Field
                  label="City"
                  name="clientAddress.city"
                  placeholder="Bradford"
                  register={register}
                  errors={errors}
                />
                <Field
                  label="Post Code"
                  name="clientAddress.postCode"
                  placeholder="BD1 9PB"
                  register={register}
                  errors={errors}
                />
                <Field
                  label="Country"
                  name="clientAddress.country"
                  placeholder="United Kingdom"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>

          {/* ── Issue Date + Payment Terms + Description ── */}
          <div className="fsec">
            <div className="fg fg2">

              {/* Issue Date — uses react-datepicker with custom styled input */}
              <div className="ff">
                <label>Issue Date</label>
                <Controller
                  name="createdAt"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                     onChange={(date: Date | null) =>
                    field.onChange(date ? date.toISOString().split("T")[0] : "")
}
                      dateFormat="dd MMM yyyy"
                      customInput={<DateInput />}
                      popperPlacement="bottom-start"
                    />
                  )}
                />
                {errors.createdAt && (
                  <span className="ferr-msg">{errors.createdAt.message}</span>
                )}
              </div>

              {/* Payment Terms */}
              <div className="ff">
                <label htmlFor="paymentTerms">Payment Terms</label>
                <Controller
                  name="paymentTerms"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="paymentTerms"
                      className="fi fi-sel"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value={1}>Net 1 Day</option>
                      <option value={7}>Net 7 Days</option>
                      <option value={14}>Net 14 Days</option>
                      <option value={30}>Net 30 Days</option>
                    </select>
                  )}
                />
                {errors.paymentTerms && (
                  <span className="ferr-msg">{errors.paymentTerms.message}</span>
                )}
              </div>

            </div>

            {/* Project Description */}
            <div className="fg" style={{ marginTop: 24 }}>
              <Field
                label="Project Description"
                name="description"
                placeholder="e.g. Graphic Design Service"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          {/* ── Item List ── */}
          <div className="fsec">
            <p
              className="fsl"
              style={{ fontSize: 18, color: "#777F98", letterSpacing: "-.25px" }}
            >
              Item List
            </p>

            {fields.length > 0 && (
              <div className="icl">
                <span>Item Name</span>
                <span>Qty.</span>
                <span>Price</span>
                <span>Total</span>
                <span />
              </div>
            )}

            {fields.map((field, i) => {
              const qty   = Number(watchedItems?.[i]?.quantity ?? 0);
              const price = Number(watchedItems?.[i]?.price    ?? 0);
              const total = qty * price;

              return (
                <div key={field.id} className="ifr">
                  {/* Item name */}
                  <input
                    className={`fi${errors.items?.[i]?.name ? " fe" : ""}`}
                    placeholder="Banner Design"
                    aria-label="Item name"
                    {...register(`items.${i}.name`)}
                  />
                  {/* Quantity */}
                  <input
                    className={`fi${errors.items?.[i]?.quantity ? " fe" : ""}`}
                    type="number"
                    min="1"
                    placeholder="1"
                    aria-label="Quantity"
                    {...register(`items.${i}.quantity`, { valueAsNumber: true })}
                  />
                  {/* Price */}
                  <input
                    className={`fi${errors.items?.[i]?.price ? " fe" : ""}`}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="200.00"
                    aria-label="Price"
                    {...register(`items.${i}.price`, { valueAsNumber: true })}
                  />
                  {/* Auto-calculated total */}
                  <div className="itd">
                    {total > 0 ? money(total) : "—"}
                  </div>
                  {/* Remove item */}
                  <button
                    className="rm"
                    onClick={() => remove(i)}
                    type="button"
                    aria-label={`Remove item ${i + 1}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              );
            })}

            {/* Add item button */}
            <button
              className="add-btn"
              onClick={() => append({ name: "", quantity: 1, price: 0, total: 0 })}
              type="button"
            >
              + Add New Item
            </button>

            {/* Items-level error (e.g. "at least one item required") */}
            {typeof errors.items?.message === "string" && (
              <p style={{ color: "var(--red)", fontSize: 12, marginTop: 8 }}>
                {errors.items.message}
              </p>
            )}
          </div>

          {/* Global validation summary */}
          {Object.keys(errors).length > 0 && (
            <div className="ferrs">
              — All fields must be filled in <br />
              — An item must be added
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="pfoot">
          {isEdit ? (
            <>
              <button className="btn btn-cancel" onClick={onClose} type="button">
                Cancel
              </button>
              <div className="pfs" />
              <button className="btn btn-save" onClick={onSubmitEdit} type="button">
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-discard" onClick={onClose} type="button">
                Discard
              </button>
              <div className="pfs" />
              <button className="btn btn-draft" onClick={onSubmitDraft} type="button">
                Save as Draft
              </button>
              <button className="btn btn-send" onClick={onSubmitPending} type="button">
                Save &amp; Send
              </button>
            </>
          )}
        </div>

      </aside>
    </>
  );
}
