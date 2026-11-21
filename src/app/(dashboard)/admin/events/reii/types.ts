export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// REII-specific types
export interface REIIParticipantsData {
  competition: REIIParticipant[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface REIIMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "LEADER" | "MEMBER";
  ktm: string;
  instagram_follow_futurest?: string;
  instagram_follow_sre?: string;
  twibbon_upload?: string;
  poster_sharing_ig_story?: string;
  poster_sharing_group?: string;
  public_account_proof?: string;
}

// status type (source: user.ts)
export type REIIParticipantStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_VERIFICATION"
  | "PAYMENT_REJECTED"
  | "PAYMENT_APPROVED"
  | "ABSTRACT_VERIFICATION"
  | "ABSTRACT_REJECTED"
  | "ABSTRACT_APPROVED"
  | "PROPOSAL_VERIFICATION"
  | "PROPOSAL_REJECTED"
  | "PROPOSAL_APPROVED"
  | "APPROVED"
  | "REJECTED";

export interface REIIParticipant {
  id: string;
  team_name: string;
  university: string;
  status: REIIParticipantStatus;
  competition_name: string;
  base_price: number;
  total_price: number;
  unique_code: number;
  payment_proof?: string;
  members: REIIMember[];
  team_leader_name?: string;
  team_leader_email?: string;
  team_leader_phone?: string;
}

export interface REIISummary {
  by_status: {
    count: number;
    status: REIIParticipantStatus | string;
  }[];
  total_participants: number;
  verified_participants: number;
  pending_participants: number;
  rejected_participants: number;
  total_revenue: number;
}
