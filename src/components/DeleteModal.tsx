import { useEffect, useRef } from "react";

interface Props {
  invoiceId: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ invoiceId, onConfirm, onCancel }: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Auto-focus confirm button
  useEffect(() => {
    setTimeout(() => confirmRef.current?.focus(), 50);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      className="mbg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="del-title"
    >
      <div className="modal">

        <h2 id="del-title">Confirm Deletion</h2>

        <p>
          Are you sure you want to delete invoice{" "}
          <strong>#{invoiceId}</strong>?{" "}
          This action cannot be undone.
        </p>

        <div className="mbtns">
          <button
            className="btn btn-cancel"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>

          <button
            className="btn btn-del"
            onClick={onConfirm}
            ref={confirmRef}
            type="button"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}