import { REG_NRP, REG_PHONE } from "@/constants/regex";
import { z } from "zod";

const optionalFile = z.instanceof(File).optional().nullable();

export const FormOprecStaffSchema = z.object({
  // === FORM 1 ===
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  student_id: z
    .string()
    .regex(REG_NRP, "Please enter a valid Student ID.")
    .min(1, {
      message: "Student ID is required.",
    }),
  batch: z.string().min(1, "Batch is required"),
  department: z.string().min(1, "Department is required"),
  phone_number: z
    .string()
    .regex(REG_PHONE, "Please enter a valid Phone Number.")
    .min(1, {
      message: "Phone Number is required.",
    }),
  line_id: z.string().min(1, "Line ID is required"),

  // === FORM 2 ===
  about_futurest: z.string().min(1, "This field is required"),
  motivates_joining: z.string().min(1, "This field is required"),
  experience_in_organization: z.string().min(1, "This field is required"),
  strengths_and_weaknesses: z.string().min(1, "This field is required"),
  commitment_plan: z.string().min(1, "This field is required"),
  current_activities: z.string().min(1, "This field is required"),
  have_any_relations: z.string().min(1, "This field is required"),
  followed_ig_futurest: z.instanceof(File, {
    message: "Proof of following Futurest IG is required",
  }),
  followed_ig_sre: z.instanceof(File, {
    message: "Proof of following SRE IG is required",
  }),

  // === FORM 3 - Primary Division ===
  primary_division_id: z.string().min(1, "Primary division is required"),
  answers_primary_division_question_1: z.string().optional(),
  answers_primary_division_question_2: z.string().optional(),
  answers_primary_division_question_3: z.string().optional(),
  answers_primary_division_question_4: z.string().optional(),
  answers_primary_division_question_5: z.string().optional(),
  answers_primary_division_question_6: z.string().optional(),
  answers_primary_division_study_case_1: z.string().optional(),
  answers_primary_division_study_case_2: z.string().optional(),
  answers_primary_division_study_case_3: z.string().optional(),

  // === FORM 4 - Secondary Division ===
  secondary_division_id: z.string().min(1, "Secondary division is required"),
  answers_secondary_division_question_1: z.string().optional(),
  answers_secondary_division_question_2: z.string().optional(),
  answers_secondary_division_question_3: z.string().optional(),
  answers_secondary_division_question_4: z.string().optional(),
  answers_secondary_division_question_5: z.string().optional(),
  answers_secondary_division_question_6: z.string().optional(),
  answers_secondary_division_study_case_1: z.string().optional(),
  answers_secondary_division_study_case_2: z.string().optional(),
  answers_secondary_division_study_case_3: z.string().optional(),

  // === FORM 5 - Files ===
  Ktm: z.instanceof(File, {
    message: "KTM file is required",
  }),
  CurriculumVitae: z.instanceof(File, {
    message: "CV file is required",
  }),
  Twibbon: z.instanceof(File, {
    message: "Twibbon file is required",
  }),
  RepostFeeds: z.instanceof(File, {
    message: "Repost Feeds file is required",
  }),
  portfolio_asset: optionalFile,
});

export type FormAll = z.infer<typeof FormOprecStaffSchema>;
export type TypeOprecStaff = z.infer<typeof FormOprecStaffSchema>;
