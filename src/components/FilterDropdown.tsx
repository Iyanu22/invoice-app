import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "./Icons";
import type { InvoiceStatus } from "../types";

const STATUSES: InvoiceStatus[] = ["draft", "pending", "paid"];

interface Props {
  filters: InvoiceStatus[];
  onChange: (status: InvoiceStatus) => void;
}

export default function FilterDropdown({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="fw" ref={ref}>

      {/* Trigger */}
      <button
        className={`fb${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        type="button"
      >
        Filter by status
        <span className="fc">
          <ChevronDownIcon />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="fd"
          role="listbox"
          aria-label="Filter by status"
        >
          {STATUSES.map((s) => (
            <div
              key={s}
              className="fi-opt"
              role="option"
              aria-selected={filters.includes(s)}
              onClick={() => onChange(s)}
            >
              <div
                className={`fbox${filters.includes(s) ? " on" : ""}`}
                aria-hidden="true"
              >
                {filters.includes(s) && <CheckIcon />}
              </div>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}