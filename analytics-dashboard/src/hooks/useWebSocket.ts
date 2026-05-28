import { useEffect, useRef } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import type { WSMessage } from "../types";
import type { KPIMetric, DataRow } from "../types";

const WS_URL = "ws://localhost:8000/ws";
const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRY_DELAY = 30000;

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const retryDelayRef = useRef(INITIAL_RETRY_DELAY);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setKPIs, addRow, setConnected } = useDashboardStore();

  useEffect(() => {
    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setConnected(true);
        retryDelayRef.current = INITIAL_RETRY_DELAY; // reset on success
      };

      ws.onmessage = (event) => {
        const message: WSMessage = JSON.parse(event.data);

        if (message.type === "kpi_update") {
          setKPIs(message.payload as KPIMetric[]); // we'll fix this import in a sec
        } else if (message.type === "new_row") {
          addRow(message.payload as DataRow);
        }
      };

      ws.onclose = () => {
        console.log(`Disconnected. Retrying in ${retryDelayRef.current}ms...`);
        setConnected(false);
        scheduleRetry();
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close();
      };
    }

    function scheduleRetry() {
      retryTimeoutRef.current = setTimeout(() => {
        retryDelayRef.current = Math.min(
          retryDelayRef.current * 2,
          MAX_RETRY_DELAY
        );
        connect();
      }, retryDelayRef.current);
    }

    connect();

    // Cleanup
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [setKPIs, addRow, setConnected]);
}
