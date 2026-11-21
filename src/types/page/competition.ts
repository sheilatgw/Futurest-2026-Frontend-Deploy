export type CompetitionTeam = {
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
    | "REGISTRATION_APPROVED";
  rejected_reason: string | null;
  competition_name: string;
  base_price: number;
  unique_code: number;
  total_price: number;
  batch_id: string;
  batch_name: string;
  abstract?: string;
  statement_of_originality?: string;
  payment_proof?: string;
  google_drive_link?: string;
  members: CompetitionMember[];
};

export type CompetitionMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "LEADER" | "MEMBER";
  ktm?: string;
  instagram_follow_futurest?: string;
  instagram_follow_sre?: string;
  twibbon_upload?: string;
  poster_sharing_ig_story?: string;
  poster_sharing_group?: string;
  public_account_proof?: string;
};

export type CompetitionRegistration = {
  id: string;
  user_id: string;
  competition_id: string;
  competition_batch_id: string | null;
  name: string;
  university: string;
  current_stage: string;
  last_stage: string;
  status: string;
  supervisor_name: string;
  supervisor_phone: string;
  google_drive_link: string | null;
  base_price: number;
  unique_code: number;
  total_price: number;
  abstract: string | null;
  statement_of_originality: string | null;
  rejected_reason: string | null;
  competition?: {
    id: string;
    name: string;
    members: number;
    created_at: string;
    updated_at: string;
    DeletedAt: string | null;
  };
  created_at: string;
  updated_at: string;
  DeletedAt: string | null;
};
