# 💸 SpendSmart — AI Expense Tracker

> A full-stack expense tracker with AI-powered categorization, built with Next.js 14, Supabase, and OpenAI.

![SpendSmart Dashboard](https://via.placeholder.com/800x400/111827/22c55e?text=SpendSmart+Dashboard)

## ✨ Features

- 🔐 **Auth** — Email/password signup & login via Supabase Auth
- ➕ **Add Expenses** — Title, amount, date, category, notes
- 🤖 **AI Categorization** — One click to auto-categorize using GPT-4o-mini
- 📊 **Dashboard** — Spending stats, donut chart by category
- 🗑️ **Delete Expenses** — Remove any expense instantly
- 🔒 **Row-Level Security** — Users only ever see their own data

## 🛠️ Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Framework  | Next.js 14 (App Router)       |
| Language   | TypeScript                    |
| Styling    | Tailwind CSS                  |
| Database   | Supabase (PostgreSQL)         |
| Auth       | Supabase Auth                 |
| AI         | OpenAI API (gpt-4o-mini)      |
| Charts     | Recharts                      |
| Icons      | Lucide React                  |
| Deploy     | Vercel                        |

## 🚀 Getting Started

### 1. Clone and install
```bash
git clone https://github.com/yourusername/ai-expense-tracker
cd ai-expense-tracker
npm install
```

### 2. Set up Supabase
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-migration.sql`
3. Go to **Settings → API** and copy your URL and anon key

### 3. Set up OpenAI
1. Get an API key at [platform.openai.com](https://platform.openai.com)

### 4. Configure environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase URL, anon key, and OpenAI API key
```

### 5. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

## 📁 Project Structure

```
app/
├── page.tsx                  # Landing / auth page
├── layout.tsx                # Root layout
├── globals.css               # Global styles
├── dashboard/
│   ├── layout.tsx            # Protected dashboard layout + sidebar
│   └── page.tsx              # Main dashboard (server component)
└── api/
    ├── expenses/route.ts     # GET, POST, DELETE expenses
    └── categorize/route.ts   # AI categorization endpoint

components/
├── AuthForm.tsx              # Login / signup form
├── Sidebar.tsx               # Navigation sidebar
├── StatsCards.tsx            # Summary stat cards
├── AddExpenseForm.tsx        # Add expense + AI categorize
├── ExpenseList.tsx           # Expense list with delete
└── SpendingChart.tsx         # Recharts donut chart

lib/
├── supabase.ts               # Supabase browser client
└── utils.ts                  # Helpers, formatters, category colors

types/
└── index.ts                  # TypeScript interfaces
```

## 🌐 Deploy to Vercel

```bash
npx vercel
# Add your environment variables in the Vercel dashboard
```

## 📝 What I Learned Building This

- Next.js 14 App Router — server vs client components, layouts, API routes
- Supabase Auth with SSR — session management across server and client
- Row-Level Security — database-level user data isolation
- OpenAI API integration — prompt engineering for structured output
- TypeScript — typing API responses, component props, and database models
