import { useState } from "react";
import StatusBadge from "./StatusBadge";
import DeleteModal from "./DeleteModal";
import { ChevronLeftIcon } from "./Icons";
import { fmt, money } from "../utils/helpers";
import type { Invoice } from "../types";

interface Props {
  invoice: Invoice;
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onMarkPaid: (id: string) => void;
}

export default function InvoiceDetail({
  invoice,
  onBack,
  onEdit,
  onDelete,
  onMarkPaid,
}: Props) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div>

      {/* ── Back button ── */}
      <button className="back-btn" onClick={onBack} type="button">
        <ChevronLeftIcon /> Go back
      </button>

      {/* ── Status toolbar ── */}
      <div className="dbar">
        <div className="dbar-l">
          <span>Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="dbar-r">
          {/* Edit — hidden for paid invoices */}
          {invoice.status !== "paid" && (
            <button
              className="btn btn-edit"
              onClick={onEdit}
              type="button"
            >
              Edit
            </button>
          )}

          {/* Delete */}
          <button
            className="btn btn-del"
            onClick={() => setShowDelete(true)}
            type="button"
          >
            Delete
          </button>

          {/* Mark as paid — only for pending */}
          {invoice.status === "pending" && (
            <button
              className="btn btn-paid"
              onClick={() => onMarkPaid(invoice.id)}
              type="button"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* ── Invoice card ── */}
      <div className="dcard">

        {/* Top row: ID + sender address */}
        <div className="dc-top">
          <div>
            <p className="dc-id">
              <span>#</span>{invoice.id}
            </p>
            <p className="dc-desc">{invoice.description}</p>
          </div>
          <div className="dc-addr">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        {/* Meta grid */}
        <div className="dc-meta">

          {/* Dates */}
          <div>
            <div className="mb">
              <label>Invoice Date</label>
              <p>{fmt(invoice.createdAt)}</p>
            </div>
            <div className="mb mb-gap">
              <label>Payment Due</label>
              <p>{fmt(invoice.paymentDue)}</p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb">
            <label>Bill To</label>
            <p>{invoice.clientName}</p>
            <p className="sub">{invoice.clientAddress.street}</p>
            <p className="sub">{invoice.clientAddress.city}</p>
            <p className="sub">{invoice.clientAddress.postCode}</p>
            <p className="sub">{invoice.clientAddress.country}</p>
          </div>

          {/* Sent To */}
          <div className="mb">
            <label>Sent To</label>
            <p style={{ fontSize: 14, wordBreak: "break-all" }}>
              {invoice.clientEmail}
            </p>
          </div>

        </div>

        {/* ── Items table ── */}
        <div className="tbl-wrap">
          <div className="tbl-h">
            <span>Item Name</span>
            <span style={{ textAlign: "right" }}>QTY.</span>
            <span style={{ textAlign: "right" }}>Price</span>
            <span style={{ textAlign: "right" }}>Total</span>
          </div>

          {invoice.items.map((item, i) => (
            <div className="tbl-r" key={i}>
              <span className="tr-n">{item.name}</span>
              <span className="tr-q">{item.quantity}</span>
              <span className="tr-p">{money(item.price)}</span>
              <span className="tr-t">{money(item.total)}</span>
            </div>
          ))}
        </div>

        {/* ── Grand total ── */}
        <div className="tbl-foot">
          <span>Amount Due</span>
          <strong>{money(invoice.total)}</strong>
        </div>

      </div>

      {/* ── Delete modal ── */}
      {showDelete && (
        <DeleteModal
          invoiceId={invoice.id}
          onConfirm={() => {
            setShowDelete(false);
            onDelete(invoice.id);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}

    </div>
  );
}