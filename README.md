# Finance Dashboard

Modern finance dashboard built with React, Redux Toolkit, Supabase, and shadcn/ui.

## What This App Does

- Tracks income and expenses from a Supabase-backed `transactions` table
- Shows dashboard metrics and charts (balance trend + category breakdown)
- Supports transaction CRUD (admin) and read-only mode (viewer)
- Includes filters, sorting, and search for transaction management
- Provides insights page summaries and analysis
- Works across desktop and mobile

## Recent UI Updates

- Glassmorphism styling across core surfaces (cards, navbar, sidebar, dialogs/sheets)
- Improved dark/light navigation visual consistency
- Mobile sidebar with working trigger and accessible sheet semantics
- Cleaner role toggle behavior and improved interaction styling

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS v4 + shadcn/ui primitives
- Redux Toolkit + React Redux
- Supabase JS
- Recharts
- GSAP
- Sonner

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # lint project
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure Supabase environment variables in `.env`.

3. Run the app:

```bash
npm run dev
```

## Role Behavior

- `admin`: can add, edit, and delete transactions
- `viewer`: read-only access

Role can be changed from the UI selector.

## Core Structure

```text
src/
  components/
    AppSidebar.jsx
    Navbar.jsx
    SummaryCard.jsx
    BalanceChart.jsx
    CategoryChart.jsx
    Filters.jsx
    TransactionTable.jsx
    TransactionModal.jsx
    ui/
  pages/
    Dashboard.jsx
    Transactions.jsx
    Insights.jsx
  redux/
    store.jsx
    hooks.jsx
    transactionsSlice.jsx
    filtersSlice.jsx
    userRoleSlice.jsx
  lib/
    supabase.jsx
  utils/
  index.css
```

## Data Model

Main table: `transactions`

- `id` (uuid)
- `date` (date)
- `amount` (numeric)
- `category` (text)
- `type` (`income` | `expense`)
- `description` (text, optional)
- `created_at`, `updated_at` (timestamp)

## Notes

- Theme is controlled by the app theme provider (`light`, `dark`, `system`)
- Most UI styling tokens and glass effects are centralized in `src/index.css`

## License

MIT
