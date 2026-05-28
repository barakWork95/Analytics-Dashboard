import { KPICard } from "./components/KPICard/KPICard";
import { RevenueChart } from "./components/Charts/RevenueChart";
import { DataTable } from "./components/DataTable/DataTable";
import { Filters } from "./components/Filters/Filters";
import { useDashboardStore } from "./store/dashboardStore";
import { useMemo } from "react";
import { exportToCSV } from "./lib/exportCSV";
import { KPICardSkeleton } from "./components/KPICard/KPICardSkeleton";
import { RevenueChartSkeleton } from "./components/Charts/RevenueChartSkeleton";
import { ErrorState } from "./components/states/ErrorState";
import { EmptyState } from "./components/states/EmptyState";
import { useWebSocket } from "./hooks/useWebSocket";
import { useHistoricalRows, useKPIs } from "./hooks/useAnalyticsData";
import { WSIndicator } from "./components/states/WSIndicator";

function App() {
  // activate WebSocket connection
  useWebSocket();

  // fetch real data
  const { data: kpis, isLoading: kpisLoading, isError: kpisError } = useKPIs();
  const { data: rows } = useHistoricalRows();

  // DataTable — use rows from Zustand store (WebSocket keeps adding to it)
  const { filters, setFilters, rows: liveRows } = useDashboardStore();

  const filteredRows = useMemo(() => {
    const allRows = [...(rows ?? []), ...liveRows];
    return allRows.filter((row) => {
      if (filters.region && row.region !== filters.region) return false;
      if (filters.status && row.status !== filters.status) return false;
      return true;
    });
  }, [filters, rows, liveRows]);

  const chartData = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: (rows ?? [])
        .filter((r) => parseInt(r.timestamp.split(":")[0]) === i)
        .reduce((sum, r) => sum + r.value, 0),
    }));
  }, [rows]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-900! mb-6">
        Analytics Dashboard
      </h1>

      <WSIndicator />

      {/* Filters */}
      <div className="mb-6">
        <Filters
          filters={filters}
          onChange={setFilters}
          onExport={() => exportToCSV(filteredRows)}
        />
      </div>
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpisLoading ? (
          Array.from({ length: 4 }).map((_, i) => <KPICardSkeleton key={i} />)
        ) : kpisError ? (
          <ErrorState message="Failed to load KPIs" />
        ) : (
          kpis?.map((metric) => <KPICard key={metric.id} metric={metric} />)
        )}
      </div>
      {/* Chart */}
      <div className="mt-6">
        {kpisLoading ? (
          <RevenueChartSkeleton />
        ) : kpisError ? (
          <ErrorState message="Failed to load chart data" />
        ) : (
          <RevenueChart data={chartData} />
        )}
      </div>
      {/* DataTable */}
      <div className="mt-6">
        {filteredRows.length === 0 ? (
          <EmptyState message="No rows match your filters" />
        ) : (
          <DataTable rows={filteredRows} />
        )}
      </div>
    </div>
  );
}

export default App;
