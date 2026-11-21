export type MinicaseParticipant = {
  id: string;
  user_id: string;

  team_name: string;
  university: string;
  faculty: string;
  study_program: string;

  team_leader_name: string;
  team_leader_email: string;
  team_leader_phone: string;
  team_leader_instagram_follow: boolean | null;
  team_leader_instagram_repost: boolean | null;
  team_leader_instagram_story: boolean | null;
  team_leader_ktm: string;

  team_member_2_name: string | null;
  team_member_2_email: string | null;
  team_member_2_instagram_follow: boolean | null;
  team_member_2_instagram_repost: boolean | null;
  team_member_2_instagram_story: boolean | null;
  team_member_2_ktm: string;

  team_member_3_name: string | null;
  team_member_3_email: string | null;
  team_member_3_instagram_follow: boolean | null;
  team_member_3_instagram_repost: boolean | null;
  team_member_3_instagram_story: boolean | null;
  team_member_3_ktm: string;

  study_case_abstract_file: string | null;
  minicase_proposal_file: string | null;
  payment_proof: string | null;

  status: MinicaseStatus;
  rejected_reason: string | null;

  base_price: number;
  unique_code: number;
  total_price: number;

  minicase_batch_id: string;
  minicase_batch: MinicaseBatch;
};
export type MinicaseBatch = {
  id: string;
  name: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
export type MinicaseStatus =
  | "PENDING_PAYMENT"
  | "PAYMENT_REJECTED"
  | "PAYMENT_APPROVED"
  | "ABSTRACT_VERIFICATION"
  | "ABSTRACT_REJECTED"
  | "ABSTRACT_APPROVED"
  | "PROPOSAL_VERIFICATION"
  | "PROPOSAL_REJECTED"
  | "PROPOSAL_APPROVED";
