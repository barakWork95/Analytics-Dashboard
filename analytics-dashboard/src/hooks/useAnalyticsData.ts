import { useQuery } from "@tanstack/react-query";
import type { DataRow, KPIMetric } from "../types";

async function fetchHistoricalRows(): Promise<DataRow[]> {
  const res = await fetch("http://localhost:8000/api/rows");
  if (!res.ok) throw new Error("Failed to fetch rows");
  return res.json();
}

async function fetchKPIs(): Promise<KPIMetric[]> {
  const res = await fetch("http://localhost:8000/api/kpis");
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
