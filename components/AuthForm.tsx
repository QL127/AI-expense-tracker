"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const router = useRouter();

  // ✅ Create client inside component so it only runs in browser
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit() {
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ text: "Check your email to confirm your account!", type: "success" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">
        {mode === "login" ? "Welcome back" : "Create account"}
      </h2>

      <div>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {message && (
        <p className={`text-sm rounded-lg px-3 py-2 ${
          message.type === "error"
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : "bg-green-500/10 text-green-400 border border-green-500/20"
        }`}>
          {message.text}
        </p>
      )}

      <button className="btn-primary w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading…" : mode === "login" ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-500">
        {mode === "login" ? "No account?" : "Already have one?"}{" "}
        <button
          className="text-green-400 hover:text-green-300 font-medium"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}