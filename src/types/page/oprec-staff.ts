type Form1 = {
  id: string;
  status: "interviewed" | "pending" | "accepted" | "rejected";
  name: string;
  email: string;
  student_id: string;
  batch: string;
  faculty: string;
  department: string;
  phone_number: string;
  line_id: string;
};

type Form2 = {
  about_futurest: string;
  motivates_joining: string;
  experience_in_organization: string;
  strengths_and_weaknesses: string;
  current_activities: string;
  commitment_plan: string;
  have_any_relations: string;
  followed_ig: string;
};

type Form3 = {
  primary_division_id: string;
  answers_primary_division_question_1: string;
  answers_primary_division_question_2: string;
  answers_primary_division_question_3: string;
  answers_primary_division_question_4: string;
  answers_primary_division_question_5: string;
  answers_primary_division_question_6: string;

  answers_primary_division_study_case_1: string;
  answers_primary_division_study_case_2: string;
  answers_primary_division_study_case_3: string;
};

type Form4 = {
  secondary_division_id: string;
  answers_secondary_division_question_1: string;
  answers_secondary_division_question_2: string;
  answers_secondary_division_question_3: string;
  answers_secondary_division_question_4: string;
  answers_secondary_division_question_5: string;
  answers_secondary_division_question_6: string;

  answers_secondary_division_study_case_1: string;
  answers_secondary_division_study_case_2: string;
  answers_secondary_division_study_case_3: string;
};

type Form5 = {
  portfolio_asset: File | string;
  Ktm: File | string;
  CurriculumVitae: File | string;
  Twibbon: File | string;
  RepostFeeds: File | string;
  followed_ig_futurest: File | string;
  followed_ig_sre: File | string;
};

type TypeOprecStaff = Form1 & Form2 & Form3 & Form4 & Form5;

export type { Form1, Form2, Form3, Form4, Form5, TypeOprecStaff };
