import type { KPIMetric } from "../../types";
import { formatValue, calcChange } from "../../lib/formatters";

interface KPICardProps {
  metric: KPIMetric;
}

export function KPICard({ metric }: KPICardProps) {
  const { label, value, previousValue, unit, trend } = metric;

  const trendClasses = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-400",
  };

  const trendIcon = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{label}</p>

      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">
          {formatValue(value, unit)}
        </p>
        <span className={`text-2xl ${trendClasses[trend]}`}>
          {trendIcon[trend]}
        </span>
      </div>

      <p className={`text-sm mt-2 ${trendClasses[trend]}`}>
        {calcChange(value, previousValue)} from yesterday
      </p>
    </div>
  );
}
