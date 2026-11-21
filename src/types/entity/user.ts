export type User = {
  personal_info: personalInfo;
  minicase_info: minicaseInfo;
  competition_info?: competitionInfo;
};
export type personalInfo = {
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  is_register: boolean;
  event_name: string | null;
  status_competition: string;
  stage_competition: string;
};
export type minicaseInfo = {
  is_registered: boolean;
  participant_info: participantInfo;
};
export type participantInfo = {
  participant_id: string;
  team_name: string;
  status:
    | "PENDING_PAYMENT"
    | "PAYMENT_VERIFICATION"
    | "PAYMENT_REJECTED"
    | "PAYMENT_APPROVED"
    | "ABSTRACT_VERIFICATION"
    | "ABSTRACT_REJECTED"
    | "ABSTRACT_APPROVED"
    | "PROPOSAL_VERIFICATION"
    | "PROPOSAL_REJECTED"
    | "PROPOSAL_APPROVED";
  minicase_batch_id: string;
  batch_name: string;
};

export type competitionInfo = {
  is_registered: boolean;
  competition_id: string;
  competition_name: string;
  team_id: string;
  team_name: string;
  status:
    | "PENDING_PAYMENT"
    | "PAYMENT_VERIFICATION"
    | "PAYMENT_REJECTED"
    | "PAYMENT_APPROVED"
    | "SUBMISSION_VERIFICATION"
    | "SUBMISSION_REJECTED"
    | "SUBMISSION_APPROVED";
  batch_id: string;
  batch_name: string;
}[];

export type competitionParticipantInfo = {
  participant_id: string;
  team_id: string;
  team_name: string;
  status:
    | "PENDING_PAYMENT"
    | "PAYMENT_VERIFICATION"
    | "PAYMENT_REJECTED"
    | "PAYMENT_APPROVED"
    | "SUBMISSION_VERIFICATION"
    | "SUBMISSION_REJECTED"
    | "SUBMISSION_APPROVED";
  competition_batch_id: string;
  batch_name: string;
  team_info: teamInfo;
};

export type teamInfo = {
  team_id: string;
  team_name: string;
  status:
    | "PENDING_PAYMENT"
    | "PAYMENT_VERIFICATION"
    | "PAYMENT_REJECTED"
    | "ABSTRACT_VERIFICATION"
    | "ABSTRACT_REJECTED"
    | "REGISTRATION_APPROVED";
  competition_batch_id: string;
  batch_name: string;
  competition_name: string;
};

export type withToken = {
  token: string;
};
