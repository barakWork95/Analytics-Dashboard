import type { FilterState, DataRow } from "../../types";

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onExport: () => void;
}

const REGIONS = ["US", "EU", "APAC", "IL"];
const STATUSES: DataRow["status"][] = ["success", "error", "pending"];

export function Filters({ filters, onChange, onExport }: FiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
      {/* Region */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Region</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={filters.region ?? ""}
          onChange={(e) => onChange({ region: e.target.value || null })}
        >
          <option value="">All</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Status</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={filters.status ?? ""}
          onChange={(e) =>
            onChange({ status: (e.target.value as DataRow["status"]) || null })
          }
        >
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">From</label>
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={filters.dateRange.from?.toISOString().slice(0, 10) ?? ""}
          onChange={(e) =>
            onChange({
              dateRange: {
                ...filters.dateRange,
                from: e.target.value ? new Date(e.target.value) : null,
              },
            })
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">To</label>
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={filters.dateRange.to?.toISOString().slice(0, 10) ?? ""}
          onChange={(e) =>
            onChange({
              dateRange: {
                ...filters.dateRange,
                to: e.target.value ? new Date(e.target.value) : null,
              },
            })
          }
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 ml-auto">
        <button
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() =>
            onChange({
              region: null,
              status: null,
              dateRange: { from: null, to: null },
            })
          }
        >
          Clear filters
        </button>
        <button
          onClick={onExport}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
