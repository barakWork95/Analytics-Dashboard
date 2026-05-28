// KPI Card data
export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: "currency" | "percentage" | "number";
  trend: "up" | "down" | "neutral";
}

// Row in the data table
export interface DataRow {
  id: string;
  timestamp: string;
  userId: string;
  event: string;
  region: string;
  value: number;
  status: "success" | "error" | "pending";
}

// WebSocket message from server
export interface WSMessage {
  type: "kpi_update" | "new_row" | "error";
  payload: KPIMetric[] | DataRow | string;
}

// Filters state
export interface FilterState {
  region: string | null;
  status: DataRow["status"] | null;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}
