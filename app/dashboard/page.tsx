import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import StatsCards from "@/components/StatsCards";
import ExpenseList from "@/components/ExpenseList";
import AddExpenseForm from "@/components/AddExpenseForm";
import SpendingChart from "@/components/SpendingChart";
import { buildCategoryTotals } from "@/lib/utils";
import type { Expense } from "@/types";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", session!.user.id)
    .order("date", { ascending: false })
    .limit(50);

  const allExpenses: Expense[] = expenses ?? [];
  const totalSpent = allExpenses.reduce((sum, e) => sum + e.amount, 0);

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlySpent = allExpenses
    .filter((e) => e.date.startsWith(thisMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = buildCategoryTotals(allExpenses);
  const topCategory = categoryTotals.sort((a, b) => b.total - a.total)[0]?.category ?? null;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Track and understand your spending</p>
      </div>

      <StatsCards
        totalSpent={totalSpent}
        monthlySpent={monthlySpent}
        expenseCount={allExpenses.length}
        topCategory={topCategory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Spending by Category</h2>
          <SpendingChart categoryTotals={categoryTotals} />
        </div>
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Add Expense</h2>
          <AddExpenseForm userId={session!.user.id} />
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Recent Expenses</h2>
        <ExpenseList expenses={allExpenses} />
      </div>
    </div>
  );
}