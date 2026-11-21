export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CompetitionParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "LEADER" | "MEMBER";
  ktm: string | null;
  instagram_follow_futurest: string | null;
  instagram_follow_sre: string | null;
  twibbon_upload: string | null;
  poster_sharing_ig_story: string | null;
  poster_sharing_group: string | null;
  friend_mentions: string | null;
  public_account_proof: string | null;
}

export interface CompetitionTeam {
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
    | "REGISTRATION_APPROVED";
  rejected_reason: string | null;
  base_price: number;
  unique_code: number;
  google_drive_link: string;
  total_price: number;
  competition_name: string;
  competition_id: string;

  // Leader
  leader: CompetitionParticipant;
  payment_proof: string | null;
  // Members array
  members: CompetitionParticipant[];
}
