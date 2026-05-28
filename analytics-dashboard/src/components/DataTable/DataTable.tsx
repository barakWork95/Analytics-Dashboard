import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { DataRow } from "../../types";

interface DataTableProps {
  rows: DataRow[];
}

const statusStyles: Record<DataRow["status"], string> = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

export function DataTable({ rows }: DataTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // estimated row height in px
    overscan: 5,
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-gray-100 text-sm font-semibold text-gray-500">
        <span>Time</span>
        <span>User ID</span>
        <span>Event</span>
        <span>Region</span>
        <span>Value</span>
        <span>Status</span>
      </div>

      {/* Scrollable container */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: "500px" }}
      >
        {/* Total height container — tricks the browser into showing the right scrollbar */}
        <div
          style={{ height: virtualizer.getTotalSize(), position: "relative" }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={row.id}
                style={{
                  position: "absolute",
                  top: virtualRow.start,
                  left: 0,
                  right: 0,
                  height: `${virtualRow.size}px`,
                }}
                className="grid grid-cols-6 gap-4 px-6 items-center text-sm border-b border-gray-50"
              >
                <span className="text-gray-500">{row.timestamp}</span>
                <span className="text-gray-700">{row.userId}</span>
                <span className="text-gray-700">{row.event}</span>
                <span className="text-gray-700">{row.region}</span>
                <span className="text-gray-700">
                  ${row.value.toLocaleString()}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full w-fit ${
                    statusStyles[row.status]
                  }`}
                >
                  {row.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
