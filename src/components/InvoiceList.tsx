import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import FilterDropdown from "./FilterDropdown";
import { PlusIcon, ChevronRightIcon } from "./Icons";
import { fmt, money } from "../utils/helpers";
import type { Invoice, InvoiceStatus } from "../types";

interface Props {
  invoices: Invoice[];
  filters: InvoiceStatus[];
  onFilterChange: (status: InvoiceStatus) => void;
  onSelect: (id: string) => void;
  onNewInvoice: () => void;
}

export default function InvoiceList({
  invoices,
  filters,
  onFilterChange,
  onSelect,
  onNewInvoice,
}: Props) {
  // Apply filters
  const visible =
    filters.length === 0
      ? invoices
      : invoices.filter((inv) => filters.includes(inv.status));

  return (
    <>
      {/* ── Page header ── */}
      <div className="ph">
        <div>
          <h1>Invoices</h1>
          <p className="ph-sub">
            There {visible.length === 1 ? "is" : "are"}{" "}
            {visible.length} total invoice{visible.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="ph-r">
          <FilterDropdown
            filters={filters}
            onChange={onFilterChange}
          />

          <button
            className="btn-new"
            onClick={onNewInvoice}
            type="button"
          >
            <span className="ni-icon">
              <PlusIcon />
            </span>
            New Invoice
          </button>
        </div>
      </div>

      {/* ── List or empty ── */}
      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="inv-list" role="list">
          {visible.map((inv) => (
            <article
              key={inv.id}
              className="inv-card"
              role="listitem"
              tabIndex={0}
              onClick={() => onSelect(inv.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(inv.id);
              }}
              aria-label={`Invoice ${inv.id}, ${inv.clientName},
                ${money(inv.total)}, status: ${inv.status}`}
            >
              {/* ID */}
              <p className="ic-id">
                <span>#</span>{inv.id}
              </p>

              {/* Due date */}
              <p className="ic-due">Due {fmt(inv.paymentDue)}</p>

              {/* Client */}
              <p className="ic-cli">{inv.clientName}</p>

              {/* Amount */}
              <p className="ic-amt">{money(inv.total)}</p>

              {/* Status */}
              <div className="ic-st">
                <StatusBadge status={inv.status} />
              </div>

              {/* Arrow */}
              <div className="ic-arr">
                <ChevronRightIcon />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}