import type { DataRow } from "../types";

export function exportToCSV(
  rows: DataRow[],
  filename = "analytics-export.csv"
) {
  const headers = ["Time", "User ID", "Event", "Region", "Value", "Status"];

  const csvRows = rows.map((row) => [
    row.timestamp,
    row.userId,
    row.event,
    row.region,
    row.value,
    row.status,
  ]);

  const csvContent = [headers, ...csvRows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
