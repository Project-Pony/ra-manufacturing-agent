export type AppRole =
  | "admin"
  | "sales_manager"
  | "sales_executive"
  | "rnd_manager"
  | "packaging_manager";

export type LeadStatus = "active" | "closed" | "on_hold";
export type BriefType = "formulation" | "packaging";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type SampleType = BriefType;
export type ProformaStatus = "draft" | "confirmed" | "sent_to_client";
export type SlaStatus = "on_time" | "at_risk" | "breached";
export type SamplePreparationStatus = "Not Started" | "In Progress" | "Ready";
export type StageGroup =
  | "New"
  | "Briefing"
  | "In Production"
  | "Dispatch"
  | "Follow-Up"
  | "Closing";
export type StageKey =
  | "0"
  | "1"
  | "2"
  | "2.1"
  | "3"
  | "3.1"
  | "4"
  | "5"
  | "6"
  | "7"
  | "7.1"
  | "8"
  | "8.1"
  | "9"
  | "9.1"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19";

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
  currentStage: StageKey;
  assignedSalesManager: string | null;
  assignedSalesExecutive: string | null;
  createdAt: string;
  status: LeadStatus;
  nextFollowUpDate?: string | null;
  lastAction?: string | null;
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
  deadline: string | null;
  submittedBy: string;
  approvedBy: string | null;
  approvalStatus: ApprovalStatus;
  createdAt: string;
}

export interface Sample {
  id: string;
  leadId: string;
  sampleType: SampleType;
  dispatchedBy: string;
  dispatchedAt: string | null;
  receivedConfirmedBy: string | null;
  receivedConfirmedAt: string | null;
  courierDocket: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  dispatchNoteUrl: string | null;
}

export interface ProformaInvoice {
  id: string;
  leadId: string;
  createdBy: string;
  documentUrl: string;
  status: ProformaStatus;
  createdAt: string;
  sentAt: string | null;
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
  nextKey: StageKey | null;
}

export interface DashboardSnapshot {
  currentUser: AppUser | null;
  role: AppRole | null;
  isDemo: boolean;
  leads: Lead[];
  stageLogs: StageLog[];
  briefs: Brief[];
  samples: Sample[];
  invoices: ProformaInvoice[];
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
  invoices: ProformaInvoice[];
  notifications: NotificationItem[];
}
