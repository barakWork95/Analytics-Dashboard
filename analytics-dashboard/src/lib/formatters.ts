import type { KPIMetric } from "../types";

export function formatValue(value: number, unit: KPIMetric["unit"]): string {
  if (unit === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (unit === "percentage") {
    return `${value.toFixed(1)}%`;
  }
  return new Intl.NumberFormat("en-US").format(value);
}

export function calcChange(current: number, previous: number): string {
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
}
