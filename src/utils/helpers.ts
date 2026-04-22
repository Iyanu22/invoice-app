export function genId(): string {
  const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    L[Math.floor(Math.random() * 26)] +
    L[Math.floor(Math.random() * 26)] +
    String(Math.floor(Math.random() * 9000) + 1000)
  );
}

export function fmt(iso: string | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function money(n: number | undefined): string {
  return (
    "£ " +
    Number(n ?? 0).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function addDays(iso: string, days: number | string): string {
  const dt = new Date(iso);
  dt.setDate(dt.getDate() + Number(days));
  return dt.toISOString().split("T")[0];
}

export function today(): string {
  return new Date().toISOString().split("T")[0];
}