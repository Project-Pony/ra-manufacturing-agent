export type AppRole =
  | "business_owner"
  | "sales_manager"
  | "sales_executive"
  | "rnd_manager"
  | "packaging_manager";

export type LeadStatus =
  | "active"
  | "awaiting_client_approval"
  | "client_approved_ready_for_pi"
  | "revision_requested"
  | "closed_rejected";

export type BriefType = "formulation" | "packaging";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type SampleType = BriefType;
export type SlaStatus = "on_time" | "at_risk" | "breached";
export type SamplePreparationStatus = "Not Started" | "In Progress" | "Ready";
export type ClientResponseStatus = "pending" | "approved" | "feedback_revision" | "rejected";
export type StageGroup =
  | "Lead Intake"
  | "Briefing & Approval"
  | "Sample Prep"
  | "Dispatch"
  | "Awaiting Client Approval";
export type StageKey =
  | "0"
  | "1"
  | "2A"
  | "2B"
  | "3"
  | "4A"
  | "4B"
  | "5A"
  | "5A_CONFIRM"
  | "5B"
  | "5B_CONFIRM"
  | "6"
  | "6_ACK"
  | "7.1"
  | "7.2"
  | "7.3"
  | "7.4"
  | "8"
  | "9";

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  role: AppRole;
  createdAt: string;
}

export interface Lead {
  id: string;
  leadCode: string;
  clientName: string | null;
  clientPhone: string | null;
  clientEmail: string | null;
  clientWhatsapp: string | null;
  requirementDetails: string;
  referenceUrls: string[];
  currentStage: StageKey;
  assignedSalesManager: string | null;
  assignedSalesExecutive: string | null;
  createdAt: string;
  status: LeadStatus;
  sampleDispatchDate: string | null;
  expectedDeliveryDate: string | null;
  clientResponseStatus: ClientResponseStatus;
  clientResponseNotes: string | null;
}

export interface StageLog {
  id: string;
  leadId: string;
  stageNumber: StageKey;
  stageName: string;
  assignedToRole: AppRole;
  assignedToUser: string | null;
  startedAt: string;
  deadlineAt: string | null;
  completedAt: string | null;
  slaStatus: SlaStatus;
  notes: string | null;
}

export interface Brief {
  id: string;
  leadId: string;
  briefType: BriefType;
  documentUrl: string;
  requestedDeadline: string | null;
  committedTimeline: string | null;
  submittedBy: string;
  approvedBy: string | null;
  approvalStatus: ApprovalStatus;
  reviewComment: string | null;
  createdAt: string;
}

export interface Sample {
  id: string;
  leadId: string;
  sampleType: SampleType;
  prepStatus: SamplePreparationStatus;
  committedReadyAt: string | null;
  dispatchedBy: string | null;
  dispatchedAt: string | null;
  receivedConfirmedBy: string | null;
  receivedConfirmedAt: string | null;
  courierDocket: string | null;
  trackingReference: string | null;
  trackingUrl: string | null;
  dispatchNoteUrl: string | null;
  handedToSecurityAt: string | null;
}

export interface NotificationItem {
  id: string;
  leadId: string;
  targetRole: AppRole;
  targetUser: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface StageDefinition {
  key: StageKey;
  name: string;
  ownerRole: AppRole;
  group: StageGroup;
  slaLabel: string;
  actionLabel: string;
  systemDriven?: boolean;
}

export interface DashboardSnapshot {
  currentUser: AppUser | null;
  role: AppRole | null;
  isDemo: boolean;
  leads: Lead[];
  stageLogs: StageLog[];
  briefs: Brief[];
  samples: Sample[];
  notifications: NotificationItem[];
  users: AppUser[];
}

export interface TaskItem {
  leadId: string;
  leadCode: string;
  stageKey: StageKey;
  stageName: string;
  actionLabel: string;
  deadlineAt: string | null;
  slaStatus: SlaStatus;
  assignedToRole: AppRole;
  assignedToUser: string | null;
}

export interface LeadBundle {
  lead: Lead;
  stageLogs: StageLog[];
  briefs: Brief[];
  samples: Sample[];
  notifications: NotificationItem[];
}
