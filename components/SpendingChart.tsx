"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { CategoryTotal } from "@/types";

export default function SpendingChart({ categoryTotals }: { categoryTotals: CategoryTotal[] }) {
  if (categoryTotals.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        No data yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Donut chart */}
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={categoryTotals}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
          >
            {categoryTotals.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: number) => formatCurrency(val)}
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="space-y-1.5">
        {categoryTotals.slice(0, 5).map((item) => (
          <div key={item.category} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-400">{item.category}</span>
            </div>
            <span className="text-gray-300 font-medium">{formatCurrency(item.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
