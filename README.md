# Sales & Operations Workflow Dashboard

Phase 1 scaffold for a manufacturing company’s internal sales sampling workflow dashboard.

Built with:

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Supabase Auth, Database, and Storage

## What’s Included

- Role-based login flow with route protection middleware
- Pipeline board with SLA badges and breached-card highlighting
- Lead detail slide-over with role-safe client visibility
- My Tasks view sorted by SLA urgency
- Sales Tracker for `sales_manager` and `admin`
- Notifications panel in the top navigation
- Admin panel scaffold with user directory and audit log
- Supabase schema, RLS policies, storage bucket setup, and seed data
- Demo fallback mode when Supabase env vars are not configured

## Roles

- `admin`
- `sales_manager`
- `sales_executive`
- `rnd_manager`
- `packaging_manager`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

4. Start the app:

```bash
npm run dev
```

The app runs in demo mode automatically if the Supabase env vars are missing.

## Demo Mode

If you run without Supabase configured, use these seeded demo accounts in the login screen:

- `admin@ramanufacturing.test`
- `sales.manager@ramanufacturing.test`
- `sales.exec@ramanufacturing.test`
- `rnd.manager@ramanufacturing.test`
- `packaging.manager@ramanufacturing.test`

Shared demo password:

```text
password123
```

## Supabase Setup

Apply the SQL files in this order:

1. [supabase/schema.sql](/Users/abhijeetanand/Projects/Personal/02_Github_Projects/ra-manufacturing-agent/supabase/schema.sql)
2. [supabase/seed.sql](/Users/abhijeetanand/Projects/Personal/02_Github_Projects/ra-manufacturing-agent/supabase/seed.sql)

If you use the Supabase CLI:

```bash
supabase db reset
```

Or apply the files manually in the SQL editor.

## Important Data-Security Note

The workflow includes sub-stages such as `2.1`, `3.1`, `7.1`, `8.1`, and `9.1`. Because of that, the schema models `current_stage` and `stage_number` as a numeric domain rather than a plain integer.

Postgres RLS cannot null individual columns on a row. To enforce the “client details visible only to Sales Manager/Admin” rule safely, the app reads from the masked view `public.leads_secure` for dashboard queries. Raw `public.leads` access is restricted to `admin` and `sales_manager`.

## Project Structure

```text
app/
  (auth)/login/
  (dashboard)/
    admin/
    pipeline/
    tasks/
    tracker/
components/
  dashboard/
  forms/
  layout/
  providers/
  ui/
lib/
  data/
  supabase/
supabase/
  schema.sql
  seed.sql
types/
  app.ts
```

## Seeded Data

The seed creates:

- 5 users, one for each role
- 2 sample leads at different stages
- stage logs, briefs, sample records, notifications, and one PI draft

## Current Scope

This phase focuses on the working shell, role-aware views, Supabase schema, and RLS-ready structure. The stage action forms are scaffolded and validated in the UI so they can be connected to final Supabase mutations next without restructuring the app.
