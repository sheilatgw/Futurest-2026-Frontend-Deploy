export type EventDetailDataWrapper = {
  data: EventDetailFieldResponse;
};
export type EventDetailFieldResponse = {
  id: string;
  team_name: string;

  // Leader Info
  team_leader_name: string;
  team_leader_email: string;
  team_leader_phone: string;

  // University Info
  university: string;
  faculty: string;
  study_program: string;

  // Member 2 Info
  team_member_2_name: string;
  team_member_2_email: string;

  // Member 3 Info
  team_member_3_name: string;
  team_member_3_email: string;

  // Documents
  instagram_follow: string;
  instagram_repost: string;
  instagram_story: string;
  study_case_abstract_file: string;
  payment_proof: string;

  // Status
  payment_status: string;
  registration_status: string;

  minicase_batch_id: string;

  created_at: string;
  updated_at?: string;
  Deleted_at?: string | null;
};
