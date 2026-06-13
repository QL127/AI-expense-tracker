import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category, CategoryTotal } from "@/types";

// ─── Tailwind class merger ────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Currency formatter ───────────────────────────────────────────────────────
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// ─── Date formatter ───────────────────────────────────────────────────────────
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

// ─── Category colors ──────────────────────────────────────────────────────────
export const CATEGORY_COLORS: Record<Category, string> = {
  "Food & Dining":  "#22c55e",
  "Transport":      "#3b82f6",
  "Housing":        "#f59e0b",
  "Entertainment":  "#a855f7",
  "Healthcare":     "#ef4444",
  "Shopping":       "#ec4899",
  "Education":      "#06b6d4",
  "Utilities":      "#64748b",
  "Travel":         "#f97316",
  "Other":          "#6b7280",
};

export const CATEGORY_EMOJIS: Record<Category, string> = {
  "Food & Dining":  "🍔",
  "Transport":      "🚗",
  "Housing":        "🏠",
  "Entertainment":  "🎮",
  "Healthcare":     "💊",
  "Shopping":       "🛍️",
  "Education":      "📚",
  "Utilities":      "💡",
  "Travel":         "✈️",
  "Other":          "📦",
};

// ─── Build category totals from expenses ─────────────────────────────────────
export function buildCategoryTotals(
  expenses: { category: Category; amount: number }[]
): CategoryTotal[] {
  const map: Partial<Record<Category, { total: number; count: number }>> = {};

  for (const e of expenses) {
    if (!map[e.category]) map[e.category] = { total: 0, count: 0 };
    map[e.category]!.total += e.amount;
    map[e.category]!.count += 1;
  }

  return Object.entries(map).map(([cat, vals]) => ({
    category: cat as Category,
    total: vals!.total,
    count: vals!.count,
    color: CATEGORY_COLORS[cat as Category],
  }));
}
