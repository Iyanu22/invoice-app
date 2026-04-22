import type { InvoiceStatus } from "../types";

interface Props {
  status: InvoiceStatus;
}

export default function StatusBadge({ status }: Props) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`badge ${status}`}>
      {label}
    </span>
  );
}