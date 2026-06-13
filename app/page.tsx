export const dynamic = "force-dynamic";

import AuthForm from "@/components/AuthForm";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-4">
          <span className="text-3xl">💸</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Spend<span className="text-green-400">Smart</span>
        </h1>
        <p className="mt-2 text-gray-400 text-sm">
          AI-powered expense tracking — know where your money goes.
        </p>
      </div>

      <div className="card w-full max-w-sm p-6">
        <AuthForm />
      </div>

      <ul className="mt-8 flex gap-6 text-xs text-gray-500">
        {["🤖 AI categorization", "📊 Spending dashboard", "🔒 Secure auth"].map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </main>
  );
}