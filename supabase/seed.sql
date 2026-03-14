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
    'owner@ramanufacturing.test',
    crypt('password123', gen_salt('bf')),
    timezone('utc', now()),
    '{"role":"business_owner"}',
    '{"full_name":"Arjun Malhotra"}',
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
    '{"sub":"00000000-0000-0000-0000-000000000001","email":"owner@ramanufacturing.test"}',
    'email',
    'owner@ramanufacturing.test',
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
  reference_urls,
  current_stage,
  assigned_sales_manager,
  assigned_sales_executive,
  created_at,
  status,
  sample_dispatch_date,
  expected_delivery_date,
  client_response_status,
  client_response_notes
)
values
  (
    '20000000-0000-0000-0000-000000000001',
    'LEAD-2026-001',
    'GreenVale Naturals',
    '+91-9876543210',
    'sourcing@greenvalenaturals.com',
    '+91-9876543210',
    'Hair serum sample kit for export launch. Need silicone-free base, citrus fragrance, and matching premium carton reference.',
    array['https://example.com/references/hair-serum-reference.pdf'],
    '7.2',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '2026-03-13T01:30:00+00',
    'active',
    null,
    null,
    'pending',
    null
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'LEAD-2026-002',
    'NorthPeak Wellness',
    '+91-9988776655',
    'ops@northpeakwellness.com',
    '+91-9988776655',
    'Protein snack sample set for distributor review. Packaging requires matte pouch and bilingual shipper labels.',
    array['https://example.com/references/protein-snack-label.jpg'],
    '9',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '2026-03-10T05:00:00+00',
    'awaiting_client_approval',
    '2026-03-13T10:15:00+00',
    '2026-03-16T12:00:00+00',
    'pending',
    null
  )
on conflict (id) do update
set
  current_stage = excluded.current_stage,
  status = excluded.status,
  sample_dispatch_date = excluded.sample_dispatch_date,
  expected_delivery_date = excluded.expected_delivery_date,
  client_response_status = excluded.client_response_status;

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
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '0', 'Lead Intake', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T01:30:00+00', '2026-03-13T11:59:00+00', '2026-03-13T01:55:00+00', 'on_time', 'Lead logged from incoming WhatsApp enquiry.'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', '1', 'Parallel Brief Submission', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T02:00:00+00', '2026-03-13T11:59:00+00', '2026-03-13T02:20:00+00', 'on_time', 'Formulation and packaging briefs uploaded together.'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', '2A', 'Formulation Brief Approval', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-13T02:20:00+00', '2026-03-13T08:20:00+00', '2026-03-13T05:10:00+00', 'on_time', 'Approved with committed formulation-ready date.'),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', '2B', 'Packaging Brief Approval', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-13T02:20:00+00', '2026-03-13T08:20:00+00', '2026-03-13T04:55:00+00', 'on_time', 'Approved with packaging-ready commitment.'),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', '3', 'Timeline Sent to Client', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T05:15:00+00', '2026-03-13T07:15:00+00', '2026-03-13T05:40:00+00', 'on_time', 'Combined timeline sent via WhatsApp and email.'),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000001', '4A', 'Formulation Sample Preparation', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-13T05:45:00+00', '2026-03-14T03:00:00+00', '2026-03-14T02:20:00+00', 'on_time', 'Formulation marked ready.'),
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000001', '4B', 'Packaging Sample Preparation', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-13T05:45:00+00', '2026-03-14T04:00:00+00', '2026-03-14T03:10:00+00', 'on_time', 'Packaging samples marked ready.'),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000001', '5A', 'Formulation Sample Dispatched to Sales Manager', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-14T03:15:00+00', '2026-03-14T03:30:00+00', '2026-03-14T03:20:00+00', 'on_time', 'Dispatch note uploaded.'),
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000001', '5A_CONFIRM', 'Formulation Sample Received by Sales Manager', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-14T03:20:00+00', '2026-03-14T05:20:00+00', '2026-03-14T03:40:00+00', 'on_time', 'Formulation sample received.'),
  ('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000001', '5B', 'Packaging Sample Dispatched to Sales Manager', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-14T03:25:00+00', '2026-03-14T03:40:00+00', '2026-03-14T03:35:00+00', 'on_time', 'Packaging dispatch note uploaded.'),
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000001', '5B_CONFIRM', 'Packaging Sample Received by Sales Manager', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-14T03:35:00+00', '2026-03-14T05:35:00+00', '2026-03-14T03:55:00+00', 'on_time', 'Packaging sample received.'),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000001', '6', 'Dispatch Task Assigned', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-14T04:00:00+00', '2026-03-14T04:15:00+00', '2026-03-14T04:05:00+00', 'on_time', 'Dispatch task assigned to sales executive.'),
  ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000001', '6_ACK', 'Dispatch Task Acknowledged', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-14T04:05:00+00', '2026-03-14T09:00:00+00', '2026-03-14T04:20:00+00', 'on_time', 'Dispatch task acknowledged.'),
  ('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000001', '7.1', 'Sample Labelling', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-14T04:20:00+00', '2026-03-14T09:00:00+00', '2026-03-14T04:50:00+00', 'on_time', 'Standard sample labels applied.'),
  ('30000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000001', '7.2', 'Courier Docket Added', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-14T04:50:00+00', '2026-03-14T09:00:00+00', null, 'at_risk', 'Waiting on courier desk to share the docket number.'),
  ('30000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000002', '0', 'Lead Intake', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-10T05:00:00+00', '2026-03-10T11:59:00+00', '2026-03-10T05:25:00+00', 'on_time', 'Lead created from inbound call.'),
  ('30000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000002', '1', 'Parallel Brief Submission', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-10T05:25:00+00', '2026-03-10T11:59:00+00', '2026-03-10T05:40:00+00', 'on_time', 'Both briefs submitted together.'),
  ('30000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000002', '2A', 'Formulation Brief Approval', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-10T05:40:00+00', '2026-03-10T11:40:00+00', '2026-03-10T08:30:00+00', 'on_time', 'Approved with production-feasible blend.'),
  ('30000000-0000-0000-0000-000000000019', '20000000-0000-0000-0000-000000000002', '2B', 'Packaging Brief Approval', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-10T05:40:00+00', '2026-03-10T11:40:00+00', '2026-03-10T08:05:00+00', 'on_time', 'Approved with pouch and label recommendations.'),
  ('30000000-0000-0000-0000-000000000020', '20000000-0000-0000-0000-000000000002', '3', 'Timeline Sent to Client', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-10T08:30:00+00', '2026-03-10T10:30:00+00', '2026-03-10T09:00:00+00', 'on_time', 'Client updated with merged formulation and packaging timelines.'),
  ('30000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000002', '4A', 'Formulation Sample Preparation', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-10T09:15:00+00', '2026-03-12T03:00:00+00', '2026-03-12T02:10:00+00', 'on_time', 'Formulation sample prepared.'),
  ('30000000-0000-0000-0000-000000000022', '20000000-0000-0000-0000-000000000002', '4B', 'Packaging Sample Preparation', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-10T09:15:00+00', '2026-03-12T05:00:00+00', '2026-03-12T03:45:00+00', 'on_time', 'Packaging samples prepared.'),
  ('30000000-0000-0000-0000-000000000023', '20000000-0000-0000-0000-000000000002', '5A', 'Formulation Sample Dispatched to Sales Manager', 'rnd_manager', '00000000-0000-0000-0000-000000000004', '2026-03-12T03:50:00+00', '2026-03-12T04:00:00+00', '2026-03-12T03:55:00+00', 'on_time', 'Formulation sample dispatched.'),
  ('30000000-0000-0000-0000-000000000024', '20000000-0000-0000-0000-000000000002', '5A_CONFIRM', 'Formulation Sample Received by Sales Manager', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T03:55:00+00', '2026-03-12T05:55:00+00', '2026-03-12T04:20:00+00', 'on_time', 'Formulation sample received.'),
  ('30000000-0000-0000-0000-000000000025', '20000000-0000-0000-0000-000000000002', '5B', 'Packaging Sample Dispatched to Sales Manager', 'packaging_manager', '00000000-0000-0000-0000-000000000005', '2026-03-12T04:00:00+00', '2026-03-12T04:15:00+00', '2026-03-12T04:05:00+00', 'on_time', 'Packaging sample dispatched.'),
  ('30000000-0000-0000-0000-000000000026', '20000000-0000-0000-0000-000000000002', '5B_CONFIRM', 'Packaging Sample Received by Sales Manager', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T04:05:00+00', '2026-03-12T06:05:00+00', '2026-03-12T04:30:00+00', 'on_time', 'Packaging sample received.'),
  ('30000000-0000-0000-0000-000000000027', '20000000-0000-0000-0000-000000000002', '6', 'Dispatch Task Assigned', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T04:35:00+00', '2026-03-12T05:00:00+00', '2026-03-12T04:40:00+00', 'on_time', 'Dispatch task assigned.'),
  ('30000000-0000-0000-0000-000000000028', '20000000-0000-0000-0000-000000000002', '6_ACK', 'Dispatch Task Acknowledged', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-12T04:40:00+00', '2026-03-12T09:00:00+00', '2026-03-12T04:55:00+00', 'on_time', 'Acknowledged before cut-off.'),
  ('30000000-0000-0000-0000-000000000029', '20000000-0000-0000-0000-000000000002', '7.1', 'Sample Labelling', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-12T05:00:00+00', '2026-03-12T09:00:00+00', '2026-03-12T05:30:00+00', 'on_time', 'Labels applied.'),
  ('30000000-0000-0000-0000-000000000030', '20000000-0000-0000-0000-000000000002', '7.2', 'Courier Docket Added', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-12T05:30:00+00', '2026-03-12T09:00:00+00', '2026-03-12T05:40:00+00', 'on_time', 'Courier docket added.'),
  ('30000000-0000-0000-0000-000000000031', '20000000-0000-0000-0000-000000000002', '7.3', 'Sample Handed Over to Security', 'sales_executive', '00000000-0000-0000-0000-000000000003', '2026-03-12T05:40:00+00', '2026-03-12T09:00:00+00', '2026-03-12T05:55:00+00', 'on_time', 'Security handover completed.'),
  ('30000000-0000-0000-0000-000000000032', '20000000-0000-0000-0000-000000000002', '7.4', 'Courier Tracking Reference Stored', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T05:55:00+00', null, '2026-03-12T05:56:00+00', 'on_time', 'Static tracking URL generated from docket.'),
  ('30000000-0000-0000-0000-000000000033', '20000000-0000-0000-0000-000000000002', '8', 'Sales Tracker Updated', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-12T05:56:00+00', null, '2026-03-12T05:56:00+00', 'on_time', 'Lead moved to awaiting client approval.'),
  ('30000000-0000-0000-0000-000000000034', '20000000-0000-0000-0000-000000000002', '9', 'Client Approval Received', 'sales_manager', '00000000-0000-0000-0000-000000000002', '2026-03-13T10:15:00+00', null, null, 'on_time', 'Awaiting client decision after sample delivery.')
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
  requested_deadline,
  committed_timeline,
  submitted_by,
  approved_by,
  approval_status,
  review_comment,
  created_at
)
values
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'formulation', 'https://example.com/formulation-brief-001.pdf', '2026-03-14T03:00:00+00', '2026-03-14T03:00:00+00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'approved', 'Approved for citrus active base.', '2026-03-13T02:10:00+00'),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'packaging', 'https://example.com/packaging-brief-001.pdf', '2026-03-14T04:00:00+00', '2026-03-14T04:00:00+00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'approved', 'Approved with premium carton fit check.', '2026-03-13T02:10:00+00'),
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'formulation', 'https://example.com/formulation-brief-002.pdf', '2026-03-12T03:00:00+00', '2026-03-12T03:00:00+00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'approved', 'Approved for distributor pack sample.', '2026-03-10T05:35:00+00'),
  ('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000002', 'packaging', 'https://example.com/packaging-brief-002.pdf', '2026-03-12T05:00:00+00', '2026-03-12T05:00:00+00', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'approved', 'Approved with bilingual label layout.', '2026-03-10T05:35:00+00')
on conflict (id) do update
set
  approval_status = excluded.approval_status,
  committed_timeline = excluded.committed_timeline,
  review_comment = excluded.review_comment;

insert into public.samples (
  id,
  lead_id,
  sample_type,
  prep_status,
  committed_ready_at,
  dispatched_by,
  dispatched_at,
  received_confirmed_by,
  received_confirmed_at,
  courier_docket,
  tracking_reference,
  tracking_url,
  dispatch_note_url,
  handed_to_security_at
)
values
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'formulation', 'Ready', '2026-03-14T03:00:00+00', '00000000-0000-0000-0000-000000000004', '2026-03-14T03:20:00+00', '00000000-0000-0000-0000-000000000002', '2026-03-14T03:40:00+00', null, null, null, 'https://example.com/formulation-dispatch-note-001.jpg', null),
  ('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'packaging', 'Ready', '2026-03-14T04:00:00+00', '00000000-0000-0000-0000-000000000005', '2026-03-14T03:35:00+00', '00000000-0000-0000-0000-000000000002', '2026-03-14T03:55:00+00', null, null, null, 'https://example.com/packaging-dispatch-note-001.jpg', null),
  ('50000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'formulation', 'Ready', '2026-03-12T03:00:00+00', '00000000-0000-0000-0000-000000000004', '2026-03-12T03:55:00+00', '00000000-0000-0000-0000-000000000002', '2026-03-12T04:20:00+00', 'DLV-77881234', 'DLV-77881234', 'https://www.delhivery.com/track-v2/package/DLV-77881234', 'https://example.com/formulation-dispatch-note-002.jpg', '2026-03-12T05:55:00+00'),
  ('50000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000002', 'packaging', 'Ready', '2026-03-12T05:00:00+00', '00000000-0000-0000-0000-000000000005', '2026-03-12T04:05:00+00', '00000000-0000-0000-0000-000000000002', '2026-03-12T04:30:00+00', 'DLV-77881234', 'DLV-77881234', 'https://www.delhivery.com/track-v2/package/DLV-77881234', 'https://example.com/packaging-dispatch-note-002.jpg', '2026-03-12T05:55:00+00')
on conflict (id) do update
set
  prep_status = excluded.prep_status,
  courier_docket = excluded.courier_docket,
  tracking_reference = excluded.tracking_reference,
  tracking_url = excluded.tracking_url,
  handed_to_security_at = excluded.handed_to_security_at;

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
  ('70000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'sales_executive', '00000000-0000-0000-0000-000000000003', 'Courier docket is pending for LEAD-2026-001 and the same-day dispatch SLA is at risk.', false, '2026-03-14T05:15:00+00'),
  ('70000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'sales_manager', '00000000-0000-0000-0000-000000000002', 'Dispatch stage for LEAD-2026-001 is approaching the 6 PM cut-off.', false, '2026-03-14T05:20:00+00'),
  ('70000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'business_owner', '00000000-0000-0000-0000-000000000001', 'LEAD-2026-002 has been dispatched and is now awaiting client approval.', false, '2026-03-13T10:20:00+00')
on conflict (id) do update
set
  is_read = excluded.is_read,
  message = excluded.message;
