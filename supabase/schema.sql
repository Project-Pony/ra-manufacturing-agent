create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum (
      'admin',
      'sales_manager',
      'sales_executive',
      'rnd_manager',
      'packaging_manager'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type public.lead_status as enum ('active', 'closed', 'on_hold');
  end if;

  if not exists (select 1 from pg_type where typname = 'brief_type') then
    create type public.brief_type as enum ('formulation', 'packaging');
  end if;

  if not exists (select 1 from pg_type where typname = 'approval_status') then
    create type public.approval_status as enum ('pending', 'approved', 'rejected');
  end if;

  if not exists (select 1 from pg_type where typname = 'sample_type') then
    create type public.sample_type as enum ('formulation', 'packaging');
  end if;

  if not exists (select 1 from pg_type where typname = 'proforma_status') then
    create type public.proforma_status as enum ('draft', 'confirmed', 'sent_to_client');
  end if;

  if not exists (select 1 from pg_type where typname = 'sla_status') then
    create type public.sla_status as enum ('on_time', 'at_risk', 'breached');
  end if;
end
$$;

drop domain if exists public.stage_key_num;
create domain public.stage_key_num as numeric(4, 1)
  check (
    value in (
      0, 1, 2, 2.1, 3, 3.1, 4, 5, 6, 7, 7.1, 8, 8.1,
      9, 9.1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    )
  );

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.app_role not null default 'sales_manager',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_code text not null unique,
  client_name text,
  client_phone text,
  client_email text,
  client_whatsapp text,
  requirement_details text not null,
  current_stage public.stage_key_num not null default 0,
  assigned_sales_manager uuid references public.users (id) on delete set null,
  assigned_sales_executive uuid references public.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  status public.lead_status not null default 'active'
);

create table if not exists public.stage_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  stage_number public.stage_key_num not null,
  stage_name text not null,
  assigned_to_role public.app_role not null,
  assigned_to_user uuid references public.users (id) on delete set null,
  started_at timestamptz not null default timezone('utc', now()),
  deadline_at timestamptz,
  completed_at timestamptz,
  sla_status public.sla_status not null default 'on_time',
  notes text
);

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  brief_type public.brief_type not null,
  document_url text not null,
  deadline timestamptz,
  submitted_by uuid not null references public.users (id) on delete restrict,
  approved_by uuid references public.users (id) on delete set null,
  approval_status public.approval_status not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.samples (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  sample_type public.sample_type not null,
  dispatched_by uuid not null references public.users (id) on delete restrict,
  dispatched_at timestamptz,
  received_confirmed_by uuid references public.users (id) on delete set null,
  received_confirmed_at timestamptz,
  courier_docket text,
  tracking_number text,
  tracking_url text,
  dispatch_note_url text
);

create table if not exists public.proforma_invoices (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  created_by uuid not null references public.users (id) on delete restrict,
  document_url text not null,
  status public.proforma_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  sent_at timestamptz
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  target_role public.app_role not null,
  target_user uuid references public.users (id) on delete cascade,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_leads_current_stage on public.leads (current_stage);
create index if not exists idx_leads_status on public.leads (status);
create index if not exists idx_stage_logs_lead on public.stage_logs (lead_id, stage_number);
create index if not exists idx_briefs_lead on public.briefs (lead_id, brief_type);
create index if not exists idx_samples_lead on public.samples (lead_id, sample_type);
create index if not exists idx_pi_lead on public.proforma_invoices (lead_id);
create index if not exists idx_notifications_target on public.notifications (target_role, target_user, is_read);

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.users
  where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;

create or replace function public.can_view_client_fields()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_app_role() in ('admin', 'sales_manager'), false)
$$;

create or replace function public.handle_auth_user_upsert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role, created_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_app_meta_data ->> 'role')::public.app_role, 'sales_manager'),
    coalesce(new.created_at, timezone('utc', now()))
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = excluded.role;

  return new;
end;
$$;

drop trigger if exists on_auth_user_upsert on auth.users;
create trigger on_auth_user_upsert
after insert or update on auth.users
for each row execute function public.handle_auth_user_upsert();

comment on table public.leads is 'Raw lead data. Client PII is exposed only to admin and sales manager through table access. Other roles must query public.leads_secure.';

drop view if exists public.leads_secure;
create view public.leads_secure as
select
  l.id,
  l.lead_code,
  case when public.can_view_client_fields() then l.client_name else null end as client_name,
  case when public.can_view_client_fields() then l.client_phone else null end as client_phone,
  case when public.can_view_client_fields() then l.client_email else null end as client_email,
  case when public.can_view_client_fields() then l.client_whatsapp else null end as client_whatsapp,
  l.requirement_details,
  l.current_stage,
  l.assigned_sales_manager,
  l.assigned_sales_executive,
  l.created_at,
  l.status
from public.leads l;

grant usage on schema public to authenticated;
grant select on public.leads_secure to authenticated;
grant select, insert, update on public.users, public.leads, public.stage_logs, public.briefs, public.samples, public.proforma_invoices, public.notifications to authenticated;

alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.stage_logs enable row level security;
alter table public.briefs enable row level security;
alter table public.samples enable row level security;
alter table public.proforma_invoices enable row level security;
alter table public.notifications enable row level security;

drop policy if exists "users_select_self_or_admin" on public.users;
create policy "users_select_self_or_admin"
on public.users
for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "users_update_self_or_admin" on public.users;
create policy "users_update_self_or_admin"
on public.users
for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "leads_select_raw_sales_only" on public.leads;
create policy "leads_select_raw_sales_only"
on public.leads
for select
using (public.current_app_role() in ('admin', 'sales_manager'));

drop policy if exists "leads_insert_sales_only" on public.leads;
create policy "leads_insert_sales_only"
on public.leads
for insert
with check (public.current_app_role() in ('admin', 'sales_manager'));

drop policy if exists "leads_update_sales_only" on public.leads;
create policy "leads_update_sales_only"
on public.leads
for update
using (public.current_app_role() in ('admin', 'sales_manager'))
with check (public.current_app_role() in ('admin', 'sales_manager'));

drop policy if exists "stage_logs_select_authenticated" on public.stage_logs;
create policy "stage_logs_select_authenticated"
on public.stage_logs
for select
using (auth.role() = 'authenticated');

drop policy if exists "stage_logs_insert_by_stage_owner" on public.stage_logs;
create policy "stage_logs_insert_by_stage_owner"
on public.stage_logs
for insert
with check (
  public.is_admin()
  or public.current_app_role() = assigned_to_role
);

drop policy if exists "stage_logs_update_by_stage_owner" on public.stage_logs;
create policy "stage_logs_update_by_stage_owner"
on public.stage_logs
for update
using (
  public.is_admin()
  or public.current_app_role() = assigned_to_role
)
with check (
  public.is_admin()
  or public.current_app_role() = assigned_to_role
);

drop policy if exists "briefs_select_by_role_scope" on public.briefs;
create policy "briefs_select_by_role_scope"
on public.briefs
for select
using (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'rnd_manager' and brief_type = 'formulation')
  or (public.current_app_role() = 'packaging_manager' and brief_type = 'packaging')
);

drop policy if exists "briefs_insert_sales_only" on public.briefs;
create policy "briefs_insert_sales_only"
on public.briefs
for insert
with check (public.current_app_role() in ('admin', 'sales_manager'));

drop policy if exists "briefs_update_sales_or_owner" on public.briefs;
create policy "briefs_update_sales_or_owner"
on public.briefs
for update
using (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'rnd_manager' and brief_type = 'formulation')
  or (public.current_app_role() = 'packaging_manager' and brief_type = 'packaging')
)
with check (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'rnd_manager' and brief_type = 'formulation')
  or (public.current_app_role() = 'packaging_manager' and brief_type = 'packaging')
);

drop policy if exists "samples_select_authenticated" on public.samples;
create policy "samples_select_authenticated"
on public.samples
for select
using (auth.role() = 'authenticated');

drop policy if exists "samples_insert_workflow_roles" on public.samples;
create policy "samples_insert_workflow_roles"
on public.samples
for insert
with check (
  public.current_app_role() in (
    'admin',
    'sales_manager',
    'sales_executive',
    'rnd_manager',
    'packaging_manager'
  )
);

drop policy if exists "samples_update_workflow_roles" on public.samples;
create policy "samples_update_workflow_roles"
on public.samples
for update
using (
  public.current_app_role() in (
    'admin',
    'sales_manager',
    'sales_executive',
    'rnd_manager',
    'packaging_manager'
  )
)
with check (
  public.current_app_role() in (
    'admin',
    'sales_manager',
    'sales_executive',
    'rnd_manager',
    'packaging_manager'
  )
);

drop policy if exists "pi_select_admin_sales_exec_own" on public.proforma_invoices;
create policy "pi_select_admin_sales_exec_own"
on public.proforma_invoices
for select
using (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'sales_executive' and created_by = auth.uid())
);

drop policy if exists "pi_insert_admin_sales_exec_own" on public.proforma_invoices;
create policy "pi_insert_admin_sales_exec_own"
on public.proforma_invoices
for insert
with check (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'sales_executive' and created_by = auth.uid())
);

drop policy if exists "pi_update_admin_sales_exec_own" on public.proforma_invoices;
create policy "pi_update_admin_sales_exec_own"
on public.proforma_invoices
for update
using (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'sales_executive' and created_by = auth.uid())
)
with check (
  public.current_app_role() in ('admin', 'sales_manager')
  or (public.current_app_role() = 'sales_executive' and created_by = auth.uid())
);

drop policy if exists "notifications_select_targeted" on public.notifications;
create policy "notifications_select_targeted"
on public.notifications
for select
using (
  public.is_admin()
  or target_user = auth.uid()
  or target_role = public.current_app_role()
);

drop policy if exists "notifications_insert_workflow_roles" on public.notifications;
create policy "notifications_insert_workflow_roles"
on public.notifications
for insert
with check (
  public.current_app_role() in (
    'admin',
    'sales_manager',
    'sales_executive',
    'rnd_manager',
    'packaging_manager'
  )
);

drop policy if exists "notifications_update_targeted" on public.notifications;
create policy "notifications_update_targeted"
on public.notifications
for update
using (
  public.is_admin()
  or target_user = auth.uid()
  or target_role = public.current_app_role()
)
with check (
  public.is_admin()
  or target_user = auth.uid()
  or target_role = public.current_app_role()
);

insert into storage.buckets (id, name, public)
values ('workflow-documents', 'workflow-documents', false)
on conflict (id) do nothing;

drop policy if exists "workflow_docs_select_authenticated" on storage.objects;
create policy "workflow_docs_select_authenticated"
on storage.objects
for select
using (bucket_id = 'workflow-documents' and auth.role() = 'authenticated');

drop policy if exists "workflow_docs_insert_authenticated" on storage.objects;
create policy "workflow_docs_insert_authenticated"
on storage.objects
for insert
with check (bucket_id = 'workflow-documents' and auth.role() = 'authenticated');

drop policy if exists "workflow_docs_update_owner_or_admin" on storage.objects;
create policy "workflow_docs_update_owner_or_admin"
on storage.objects
for update
using (bucket_id = 'workflow-documents' and auth.role() = 'authenticated')
with check (bucket_id = 'workflow-documents' and auth.role() = 'authenticated');
