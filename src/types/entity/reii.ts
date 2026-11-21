export interface ReiiMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  education_level: string;
  type: "LEADER" | "MEMBER";

  // Supporting Files
  ktm: string;
  instagram_follow_futurest: string;
  instagram_follow_sre: string;
  twibbon_upload: string;
  poster_sharing_ig_story: string;
  poster_sharing_group: string;
  friend_mentions: string;
  public_account_proof: string;
}

export interface ReiiTeam {
  id: string;
  team_name: string;
  university: string;
  supervisor_name: string;
  supervisor_phone: string;
  status:
    | "PENDING_PAYMENT"
    | "PAYMENT_VERIFICATION"
    | "PAYMENT_REJECTED"
    | "ABSTRACT_VERIFICATION"
    | "ABSTRACT_REJECTED"
    | "ABSTRACT_APPROVED"
    | "PROPOSAL_VERIFICATION"
    | "PROPOSAL_REJECTED"
    | "PROPOSAL_APPROVED"
    | string;
  rejected_reason: string | null;

  base_price: number;
  unique_code: number;
  total_price: number;
  competition_name: string;
  competition_id: string;

  leader: ReiiMember;
  members: ReiiMember[];
}

export interface ReiiTeamResponse {
  success: boolean;
  message: string;
  data: ReiiTeam;
}
