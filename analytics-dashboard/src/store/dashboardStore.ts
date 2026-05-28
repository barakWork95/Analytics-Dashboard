import { create } from "zustand";
import type { KPIMetric, DataRow, FilterState } from "../types";

interface DashboardState {
  // Data
  kpis: KPIMetric[];
  rows: DataRow[];

  // Filters
  filters: FilterState;

  // WebSocket status
  isConnected: boolean;

  // Actions
  setKPIs: (kpis: KPIMetric[]) => void;
  addRow: (row: DataRow) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setConnected: (connected: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  kpis: [],
  rows: [],
  isConnected: false,
  filters: {
    region: null,
    status: null,
    dateRange: { from: null, to: null },
  },

  // Actions
  setKPIs: (kpis) => set({ kpis }),

  addRow: (row) =>
    set((state) => ({
      rows: [row, ...state.rows].slice(0, 10000), // max 10K rows
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setConnected: (connected) => set({ isConnected: connected }),
}));
