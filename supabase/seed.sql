insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000001',
    'authenticated',
    'authenticated',
    'admin@ramanufacturing.test',
    crypt('password123', gen_salt('bf')),
    timezone('utc', now()),
    '{"role":"admin"}',
    '{"full_name":"Aarav Khanna"}',
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000002',
    'authenticated',
    'authenticated',
    'sales.manager@ramanufacturing.test',
    crypt('password123', gen_salt('bf')),
    timezone('utc', now()),
    '{"role":"sales_manager"}',
    '{"full_name":"Meera Shah"}',
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000003',
    'authenticated',
    'authenticated',
    'sales.exec@ramanufacturing.test',
    crypt('password123', gen_salt('bf')),
    timezone('utc', now()),
    '{"role":"sales_executive"}',
    '{"full_name":"Kabir Rao"}',
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000004',
    'authenticated',
    'authenticated',
    'rnd.manager@ramanufacturing.test',
    crypt('password123', gen_salt('bf')),
    timezone('utc', now()),
    '{"role":"rnd_manager"}',
    '{"full_name":"Nisha Verma"}',
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000005',
    'authenticated',
    'authenticated',
    'packaging.manager@ramanufacturing.test',
    crypt('password123', gen_salt('bf')),
    timezone('utc', now()),
    '{"role":"packaging_manager"}',
    '{"full_name":"Rohan Sethi"}',
    timezone('utc', now()),
    timezone('utc', now())
  )
on conflict (id) do update
set
  email = excluded.email,
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = timezone('utc', now());

insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
values
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '{"sub":"00000000-0000-0000-0000-000000000001","email":"admin@ramanufacturing.test"}',
    'email',
    'admin@ramanufacturing.test',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    '{"sub":"00000000-0000-0000-0000-000000000002","email":"sales.manager@ramanufacturing.test"}',
    'email',
    'sales.manager@ramanufacturing.test',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    '{"sub":"00000000-0000-0000-0000-000000000003","email":"sales.exec@ramanufacturing.test"}',
    'email',
    'sales.exec@ramanufacturing.test',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000004',
    '{"sub":"00000000-0000-0000-0000-000000000004","email":"rnd.manager@ramanufacturing.test"}',
    'email',
    'rnd.manager@ramanufacturing.test',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000005',
    '{"sub":"00000000-0000-0000-0000-000000000005","email":"packaging.manager@ramanufacturing.test"}',
    'email',
    'packaging.manager@ramanufacturing.test',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
  )
on conflict (id) do update
set updated_at = timezone('utc', now());

insert into public.leads (
  id,
  lead_code,
  client_name,
  client_phone,
  client_email,
  client_whatsapp,
  requirement_details,
  current_stage,
  assigned_sales_manager,
  assigned_sales_executive,
  created_at,
  status
)
values
  (
    '20000000-0000-0000-0000-000000000001',
    'LEAD-2026-001',
    'GreenVale Naturals',
    '+91-9876543210',
    'sourcing@greenvalenaturals.com',
    '+91-9876543210',
    'Hair serum sampling for export launch. Need silicone-free base with citrus fragrance and 30 ml retail pack.',
    2.1,
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '2026-03-14T01:30:00+00',
    'active'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'LEAD-2026-002',
    'NorthPeak Wellness',
    '+91-9988776655',
    'ops@northpeakwellness.com',
    '+91-9988776655',
    'Protein snack sample set for distributor review. Packaging requires matte pouch with bilingual label format.',
    11,
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '2026-03-12T05:00:00+00',
    'active'
  )
on conflict (id) do update
set
  lead_code = excluded.lead_code,
  client_name = excluded.client_name,
  client_phone = excluded.client_phone,
  client_email = excluded.client_email,
  client_whatsapp = excluded.client_whatsapp,
  requirement_details = excluded.requirement_details,
  current_stage = excluded.current_stage,
  assigned_sales_manager = excluded.assigned_sales_manager,
  assigned_sales_executive = excluded.assigned_sales_executive,
  status = excluded.status;

insert into public.stage_logs (
  id,
  lead_id,
  stage_number,
  stage_name,
  assigned_to_role,
  assigned_to_user,
  started_at,
  deadline_at,
  completed_at,
  sla_status,
  notes
)
values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 0, 'Lead Received', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-14T01:30:00+00', null, '2026-03-14T01:50:00+00', 'on_time', 'Lead intake completed and lead code generated.'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 1, 'Catalog Sent to Client', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-14T01:50:00+00', '2026-03-14T03:50:00+00', '2026-03-14T02:10:00+00', 'on_time', 'Catalog shared on WhatsApp.'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 2, 'Formulation Sample Brief Submitted', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-14T02:15:00+00', '2026-03-14T11:30:00+00', '2026-03-14T02:25:00+00', 'on_time', 'Formulation brief uploaded with sample deadline.'),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 2.1, 'Formulation Brief Approved', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-14T02:25:00+00', '2026-03-14T08:25:00+00', null, 'at_risk', 'Awaiting R&D review.'),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000002', 0, 'Lead Received', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T05:00:00+00', null, '2026-03-12T05:15:00+00', 'on_time', 'Lead intake recorded.'),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000002', 1, 'Catalog Sent to Client', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T05:20:00+00', '2026-03-12T07:20:00+00', '2026-03-12T05:40:00+00', 'on_time', 'Catalog shared and shortlisted SKUs confirmed.'),
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000002', 2, 'Formulation Sample Brief Submitted', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T05:45:00+00', '2026-03-13T04:30:00+00', '2026-03-12T06:10:00+00', 'on_time', 'R&D brief uploaded.'),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000002', 2.1, 'Formulation Brief Approved', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-12T06:10:00+00', '2026-03-12T12:10:00+00', '2026-03-12T09:00:00+00', 'on_time', 'Approved with vanilla profile adjustment.'),
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000002', 3, 'Packaging Sample Brief Submitted', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T09:10:00+00', '2026-03-12T15:00:00+00', '2026-03-12T09:25:00+00', 'on_time', 'Packaging brief uploaded.'),
  ('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000002', 3.1, 'Packaging Brief Approved', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-12T09:25:00+00', '2026-03-12T15:25:00+00', '2026-03-12T11:00:00+00', 'on_time', 'Packaging approved.'),
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000002', 4, 'Client Intimated on Timeline', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T11:10:00+00', '2026-03-12T12:00:00+00', '2026-03-12T11:15:00+00', 'on_time', 'WhatsApp and email update sent.'),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000002', 5, 'R&D Sample Preparation', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-12T11:20:00+00', '2026-03-13T04:30:00+00', '2026-03-13T03:50:00+00', 'on_time', 'Sample prepared and QC checked.'),
  ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000002', 6, 'Packaging Preparation', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-12T11:20:00+00', '2026-03-13T06:00:00+00', '2026-03-13T05:10:00+00', 'on_time', 'Packaging ready.'),
  ('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000002', 7, 'R&D Sample Dispatched to Sales Manager', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-13T05:15:00+00', '2026-03-13T06:00:00+00', '2026-03-13T05:25:00+00', 'on_time', 'Dispatch note uploaded.'),
  ('30000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000002', 7.1, 'Sales Manager Confirms Formulation Sample Received', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T05:25:00+00', '2026-03-13T07:25:00+00', '2026-03-13T05:35:00+00', 'on_time', 'Formulation sample received.'),
  ('30000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000002', 8, 'Packaging Sample Dispatched to Sales Manager', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-13T05:35:00+00', '2026-03-13T06:15:00+00', '2026-03-13T05:45:00+00', 'on_time', 'Packaging sample dispatched.'),
  ('30000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000002', 8.1, 'Sales Manager Confirms Packaging Sample Received', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T05:45:00+00', '2026-03-13T07:45:00+00', '2026-03-13T06:00:00+00', 'on_time', 'Packaging sample received.'),
  ('30000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000002', 9, 'Sales Manager Instructs Sales Executive to Ship', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T06:10:00+00', '2026-03-13T06:20:00+00', '2026-03-13T06:12:00+00', 'on_time', 'Shipping task assigned.'),
  ('30000000-0000-0000-0000-000000000019', '20000000-0000-0000-0000-000000000002', 9.1, 'Sales Executive Confirms Task Acknowledged', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-13T06:12:00+00', '2026-03-13T12:30:00+00', '2026-03-13T06:15:00+00', 'on_time', 'Task acknowledged.'),
  ('30000000-0000-0000-0000-000000000020', '20000000-0000-0000-0000-000000000002', 10, 'Sample Labelling Done', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-13T06:15:00+00', '2026-03-13T12:30:00+00', '2026-03-13T07:05:00+00', 'on_time', 'Labels applied per approved format.'),
  ('30000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000002', 11, 'Courier Docket Added', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-13T07:05:00+00', '2026-03-14T09:00:00+00', null, 'breached', 'Waiting on outbound docket from courier desk.')
on conflict (id) do update
set
  completed_at = excluded.completed_at,
  sla_status = excluded.sla_status,
  notes = excluded.notes,
  deadline_at = excluded.deadline_at;

insert into public.briefs (
  id,
  lead_id,
  brief_type,
  document_url,
  deadline,
  submitted_by,
  approved_by,
  approval_status,
  created_at
)
values
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'formulation', 'https://example.com/formulation-brief-001.pdf', '2026-03-16T10:00:00+00', '00000000-0000-0000-0000-000000000002', null, 'pending', '2026-03-14T02:20:00+00'),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'formulation', 'https://example.com/formulation-brief-002.pdf', '2026-03-13T04:30:00+00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'approved', '2026-03-12T05:55:00+00'),
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'packaging', 'https://example.com/packaging-brief-002.pdf', '2026-03-13T06:00:00+00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'approved', '2026-03-12T09:20:00+00')
on conflict (id) do update
set
  approval_status = excluded.approval_status,
  approved_by = excluded.approved_by;

insert into public.samples (
  id,
  lead_id,
  sample_type,
  dispatched_by,
  dispatched_at,
  received_confirmed_by,
  received_confirmed_at,
  courier_docket,
  tracking_number,
  tracking_url,
  dispatch_note_url
)
values
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'formulation', '00000000-0000-0000-0000-000000000004', '2026-03-13T05:20:00+00', '00000000-0000-0000-0000-000000000002', '2026-03-13T05:35:00+00', null, null, null, 'https://example.com/formulation-dispatch-note.pdf'),
  ('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'packaging', '00000000-0000-0000-0000-000000000005', '2026-03-13T05:40:00+00', '00000000-0000-0000-0000-000000000002', '2026-03-13T06:00:00+00', null, null, null, 'https://example.com/packaging-dispatch-note.pdf')
on conflict (id) do update
set
  received_confirmed_at = excluded.received_confirmed_at,
  dispatch_note_url = excluded.dispatch_note_url;

insert into public.proforma_invoices (
  id,
  lead_id,
  created_by,
  document_url,
  status,
  created_at,
  sent_at
)
values
  ('60000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'https://example.com/pi-draft-002.pdf', 'draft', '2026-03-13T08:45:00+00', null)
on conflict (id) do update
set
  status = excluded.status,
  document_url = excluded.document_url;

insert into public.notifications (
  id,
  lead_id,
  target_role,
  target_user,
  message,
  is_read,
  created_at
)
values
  ('70000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'rnd_manager', '00000000-0000-0000-0000-000000000004', 'Formulation brief uploaded for LEAD-2026-001 and awaiting approval.', false, '2026-03-14T02:26:00+00'),
  ('70000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 'sales_executive', '00000000-0000-0000-0000-000000000003', 'Courier docket is overdue for LEAD-2026-002.', false, '2026-03-14T08:10:00+00'),
  ('70000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'sales_manager', '00000000-0000-0000-0000-000000000002', 'Sales executive flagged courier delay on LEAD-2026-002.', true, '2026-03-14T08:40:00+00')
on conflict (id) do update
set
  is_read = excluded.is_read,
  message = excluded.message;
