import { useQuery } from "@tanstack/react-query";
import type { DataRow, KPIMetric } from "../types";

async function fetchHistoricalRows(): Promise<DataRow[]> {
  const res = await fetch(
    "https://analytics-dashboard-production-1bae.up.railway.app/api/rows"
  );
  if (!res.ok) throw new Error("Failed to fetch rows");
  return res.json();
}

async function fetchKPIs(): Promise<KPIMetric[]> {
  const res = await fetch(
    "https://analytics-dashboard-production-1bae.up.railway.app/api/kpis"
  );
  if (!res.ok) throw new Error("Failed to fetch KPIs");
  return res.json();
}

export function useHistoricalRows() {
  return useQuery({
    queryKey: ["rows"],
    queryFn: fetchHistoricalRows,
  });
}

export function useKPIs() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: fetchKPIs,
  });
}
