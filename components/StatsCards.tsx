import { DollarSign, TrendingUp, Receipt, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/types";

interface Props {
  totalSpent: number;
  monthlySpent: number;
  expenseCount: number;
  topCategory: Category | null;
}

export default function StatsCards({ totalSpent, monthlySpent, expenseCount, topCategory }: Props) {
  const cards = [
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "This Month",
      value: formatCurrency(monthlySpent),
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Expenses",
      value: expenseCount.toString(),
      icon: Receipt,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Top Category",
      value: topCategory ?? "None yet",
      icon: Tag,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="card p-5">
          <div className={`inline-flex p-2 rounded-lg ${bg} mb-3`}>
            <Icon size={16} className={color} />
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
          <p className="text-xl font-bold text-white mt-1 truncate">{value}</p>
        </div>
      ))}
    </div>
  );
}
