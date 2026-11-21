export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CompeMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "LEADER" | "MEMBER";
  ktm: string;
  instagram_follow_futurest: string;
  instagram_follow_sre: string;
  twibbon_upload: string;
  poster_sharing_ig_story: string;
  poster_sharing_group: string;
  public_account_proof: string;
}

export interface CompeTeam {
  id: string;
  team_name: string;
  university: string;
  supervisor_name: string;
  supervisor_phone: string;
  status:
    | "PENDING_PAYMENT"
    | "PAYMENT_VERIFICATION"
    | "PAYMENT_REJECTED"
    | "PAYMENT_APPROVED"
    | "SUBMISSION_VERIFICATION"
    | "SUBMISSION_REJECTED"
    | "SUBMISSION_APPROVED";
  competition_name: string;
  base_price: number;
  total_price: number;
  unique_code: number;
  members: CompeMember[];
}

export interface Meta {
  page: number;
  take: number;
  total_data: number;
  total_page: number;
  category: string;
  filter?: string;
  filter_by?: string;
  sort?: string;
  sort_by?: string;
  status?: string;
}

export interface CompeTeamsResponse {
  success: boolean;
  message: string;
  data: CompeTeam[];
  meta: Meta;
}
