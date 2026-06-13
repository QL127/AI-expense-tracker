"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import type { Category } from "@/types";
import { CATEGORY_EMOJIS } from "@/lib/utils";

const CATEGORIES: Category[] = [
  "Food & Dining", "Transport", "Housing", "Entertainment",
  "Healthcare", "Shopping", "Education", "Utilities", "Travel", "Other",
];

export default function AddExpenseForm({ userId }: { userId: string }) {
  const router = useRouter();

  const [title, setTitle]       = useState("");
  const [amount, setAmount]     = useState("");
  const [category, setCategory] = useState<Category>("Other");
  const [date, setDate]         = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes]       = useState("");

  const [aiLoading,   setAiLoading]   = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [aiUsed,      setAiUsed]      = useState(false);
  const [error,       setError]       = useState("");

  // ── AI auto-categorize ──────────────────────────────────────────────────
  async function handleAICategorize() {
    if (!title.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount }),
      });
      const { category: suggested } = await res.json();
      setCategory(suggested);
      setAiUsed(true);
    } catch {
      // silent fail — user can pick manually
    } finally {
      setAiLoading(false);
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!title || !amount || !date) {
      setError("Title, amount, and date are required.");
      return;
    }
    setFormLoading(true);
    setError("");

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount, category, date, notes, ai_categorized: aiUsed }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg);
      }

      // Reset form
      setTitle(""); setAmount(""); setNotes(""); setAiUsed(false);
      setDate(new Date().toISOString().split("T")[0]);
      setCategory("Other");
      router.refresh();   // re-run server component to show new expense
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save expense.");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Title + AI button */}
      <div>
        <label className="label">Expense Title</label>
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="e.g. Grocery run, Uber, Netflix…"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setAiUsed(false); }}
          />
          <button
            onClick={handleAICategorize}
            disabled={!title.trim() || aiLoading}
            title="AI categorize"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
                       bg-purple-500/10 border border-purple-500/20 text-purple-400
                       hover:bg-purple-500/20 transition-colors disabled:opacity-40 whitespace-nowrap"
          >
            {aiLoading
              ? <Loader2 size={13} className="animate-spin" />
              : <Sparkles size={13} />}
            AI
          </button>
        </div>
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Amount ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="label">
          Category
          {aiUsed && (
            <span className="ml-2 text-purple-400 normal-case tracking-normal font-normal">
              ✨ AI suggested
            </span>
          )}
        </label>
        <select
          className="input"
          value={category}
          onChange={(e) => { setCategory(e.target.value as Category); setAiUsed(false); }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_EMOJIS[c]} {c}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="label">Notes (optional)</label>
        <input
          className="input"
          placeholder="Any extra details…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button className="btn-primary w-full" onClick={handleSubmit} disabled={formLoading}>
        {formLoading ? "Saving…" : "Add Expense"}
      </button>
    </div>
  );
}
