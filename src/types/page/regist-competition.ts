export type CompetitionStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_REJECTED"
  | "PAYMENT_APPROVED"
  | "ABSTRACT_VERIFICATION"
  | "ABSTRACT_REJECTED"
  | "ABSTRACT_APPROVED";

export type CompetitionCategory = "REPI" | "REII" | "BCC" | string;

export interface CompetitionBatch {
  id: string;
  name: string;
  category: CompetitionCategory;
  start_date: string;
  end_date: string;
  price: number;
  is_active: boolean;
}

export type MemberType = "LEADER" | "MEMBER";

export interface CompetitionMember {
  id?: string;
  name: string;
  email: string;
  phone: string;
  type?: MemberType;
  // student_id?: string;
  ktm: string;
  instagram_follow_futurest: string;
  instagram_follow_sre: string;
  twibbon_upload: string;
  ig_story: string;
  poster_sharing: string;
}

export interface CompetitionTeam {
  id: string;
  user_id?: string;
  team_name: string;
  university: string;
  supervisor_name: string;
  supervisor_phone: string;
  competition_name?: string;
  members?: CompetitionMember[];
  leader?: CompetitionMember;
  member_0?: CompetitionMember;
  member_1?: CompetitionMember;
  google_drive_link?: string | null;
  abstract?: string | null;
  statement_of_originality?: string | null;
  payment_proof?: string | null;
  base_price: number;
  unique_code: number;
  total_price: number;
  competition_batch_id?: string;
  competition_batch?: CompetitionBatch;
  status: CompetitionStatus;
  rejected_reason?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CompetitionTeamResponse {
  success: boolean;
  message: string;
  data: CompetitionTeam;
}

export interface CompetitionTeamListResponse {
  success: boolean;
  message: string;
  data: {
    data: CompetitionTeam[];
    pagination: Pagination;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}
