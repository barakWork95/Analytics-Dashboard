import { useDashboardStore } from "../../store/dashboardStore";

export function WSIndicator() {
  const isConnected = useDashboardStore((state) => state.isConnected);

  return (
    <div className="flex items-center gap-2 mb-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      <span className="text-sm text-gray-500">
        {isConnected ? "Live" : "Disconnected"}
      </span>
    </div>
  );
}
