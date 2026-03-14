# Sales Sampling Workflow Dashboard

Revised Phase 1 scaffold for a manufacturing company’s internal sampling workflow, limited to:

- Lead intake
- Parallel briefing and approvals
- Sample preparation
- Dispatch to client
- Client approval logging

Out of scope in this version:

- Proforma Invoice creation
- Bulk order processing
- Courier API integration
- WhatsApp automation
- Payment tracking

## Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Supabase Auth, Database, and Storage

## What’s Included

- Role-based login flow with middleware protection
- Revised pipeline board with parallel R&D and Packaging indicators
- Lead detail slide-over with vertical timeline and side-by-side track status
- My Tasks view for assigned users only
- Sales Tracker for `sales_manager` and `business_owner`
- Notification bell with per-role unread counts
- Business Owner read-only experience with full client visibility
- Revised Supabase schema, RLS policies, storage bucket setup, and seed data
- Demo fallback mode when Supabase env vars are not configured

## Roles

- `business_owner`
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

The app automatically uses demo data if the Supabase env vars are missing.

## Demo Accounts

If you run without Supabase configured, use these demo users on the login screen:

- `owner@ramanufacturing.test`
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

Or run the files manually in the SQL editor.

## Security Notes

- Client name, phone, email, and WhatsApp are masked for every role except `sales_manager` and `business_owner`.
- The app reads masked lead data from `public.leads_secure` for dashboard queries.
- `business_owner` is read-only at the UI and RLS levels.
- Sales Executives only receive task-level access through assigned workflow rows.

## Data Model Notes

The revised workflow uses parallel and branch-like stage codes such as `2A`, `2B`, `5A_CONFIRM`, and `7.4`, so the schema models stage identifiers as a checked text domain instead of an integer.

The schema includes:

- `users`
- `leads`
- `stage_logs`
- `briefs`
- `samples`
- `notifications`

Seed data creates:

- 5 users, one per role
- 2 revised leads:
  - one mid-dispatch
  - one awaiting client approval

## Project Structure

```text
app/
  (auth)/login/
  (dashboard)/
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

## Verification

The current revision has been verified locally with:

```bash
npm run lint
npm run build
```

## Current Scope Note

The workflow action forms are aligned to the revised Phase 1 stages and validated in the UI. They remain scaffolded for the final Supabase write-path wiring, so the display, routing, security model, schema, and seed data are updated now without forcing a second structural rewrite later.
