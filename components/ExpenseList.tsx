"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Sparkles } from "lucide-react";
import { formatCurrency, formatDate, CATEGORY_COLORS, CATEGORY_EMOJIS } from "@/lib/utils";
import type { Expense } from "@/types";

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/expenses?id=${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-3xl mb-2">🧾</p>
        <p className="text-sm">No expenses yet — add your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between px-4 py-3 rounded-xl
                     bg-gray-800/50 hover:bg-gray-800 transition-colors group"
        >
          {/* Left: emoji + info */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl shrink-0">{CATEGORY_EMOJIS[expense.category]}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-white truncate">{expense.title}</p>
                {expense.ai_categorized && (
                  <span title="AI categorized">
                    <Sparkles size={11} className="text-purple-400 shrink-0" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                  style={{
                    color: CATEGORY_COLORS[expense.category],
                    backgroundColor: CATEGORY_COLORS[expense.category] + "20",
                  }}
                >
                  {expense.category}
                </span>
                <span className="text-xs text-gray-500">{formatDate(expense.date)}</span>
              </div>
            </div>
          </div>

          {/* Right: amount + delete */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-semibold text-white">
              {formatCurrency(expense.amount)}
            </span>
            <button
              onClick={() => handleDelete(expense.id)}
              disabled={deletingId === expense.id}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg
                         text-gray-500 hover:text-red-400 hover:bg-red-500/10
                         transition-all disabled:opacity-50"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
