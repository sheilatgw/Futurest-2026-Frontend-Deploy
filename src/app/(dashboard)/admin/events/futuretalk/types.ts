export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface FutureTalkBatch {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FutureTalkParticipant {
  id: string;
  user_id: string;
  team_name: string;
  university: string;
  faculty: string;
  study_program: string;
  team_leader_name: string;
  team_leader_email: string;
  team_leader_phone: string;
  team_leader_instagram_follow: string | null;
  team_leader_instagram_repost: string | null;
  team_leader_instagram_story: string | null;
  team_leader_ktm: string | null;
  team_member_2_name: string | null;
  team_member_2_email: string | null;
  team_member_2_instagram_follow: string | null;
  team_member_2_instagram_repost: string | null;
  team_member_2_instagram_story: string | null;
  team_member_2_ktm: string | null;
  team_member_3_name: string | null;
  team_member_3_email: string | null;
  team_member_3_instagram_follow: string | null;
  team_member_3_instagram_repost: string | null;
  team_member_3_instagram_story: string | null;
  team_member_3_ktm: string | null;
  study_case_abstract_file: string | null;
  minicase_proposal_file: string | null;
  payment_proof: string | null;
  status: string;
  rejected_reason: string | null;
  base_price: number;
  unique_code: number;
  total_price: number;
  minicase_batch_id: string;
  created_at: string;
  updated_at: string;
}

export interface FutureTalkSummary {
  participants_by_batch: {
    batch_name: string;
    count: number;
  }[];
  status: {
    count: number;
    status: string;
  }[];
  total_participants: number;
}
