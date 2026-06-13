// ─── Expense ────────────────────────────────────────────────────────────────
export type Category =
  | "Food & Dining"
  | "Transport"
  | "Housing"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Education"
  | "Utilities"
  | "Travel"
  | "Other";

export interface Expense {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;          // ISO date string
  notes?: string;
  ai_categorized: boolean;
  created_at: string;
}

export type NewExpense = Omit<Expense, "id" | "user_id" | "created_at" | "ai_categorized">;

// ─── API responses ───────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface CategoryTotal {
  category: Category;
  total: number;
  count: number;
  color: string;
}

// ─── Dashboard stats ─────────────────────────────────────────────────────────
export interface DashboardStats {
  totalSpent: number;
  monthlySpent: number;
  topCategory: Category | null;
  expenseCount: number;
  categoryTotals: CategoryTotal[];
}
