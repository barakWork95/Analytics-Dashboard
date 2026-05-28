import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../lib/colors";

interface DataPoint {
  time: string;
  value: number;
}

interface RevenueChartProps {
  data: DataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Revenue Over Time
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: colors.textMuted }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: colors.textMuted }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{ fontSize: 12 }}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors.primary}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
