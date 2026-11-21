import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

const fileValidation = (fieldName: string) =>
  z
    .any()
    .refine((file) => {
      if (file === null || file === undefined) return false;
      if (typeof file === "string") return file.trim().length > 0;
      return true;
    }, `${fieldName} is required`)
    .refine((file) => {
      if (typeof file === "string") return true;
      return file instanceof File ? file.size <= MAX_FILE_SIZE : false;
    }, `Max file size is 3MB`)
    .refine((file) => {
      if (typeof file === "string") return true;
      return file instanceof File
        ? ACCEPTED_FILE_TYPES.includes(file.type)
        : false;
    }, "Only .jpg, .png, and .pdf formats are supported");

export const CompetitionSchema = z
  .object({
    team_name: z.string().min(3, "Team name must be at least 3 characters"),
    competition_batch_id: z.string().min(1, "Batch is required"),
    university: z.string().min(1, "University is required"),
    supervisor_name: z.string().min(1, "Supervisor name is required"),
    supervisor_phone: z
      .string()
      .min(10, "Supervisor phone must be valid")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),

    abstract: fileValidation("Abstract"),
    statement_of_originality: fileValidation("Statement"),
    leader_name: z.string().min(1, "Full name is required"),
    // leader_student_id: z.string().min(1, "Student ID is required"),
    leader_phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
    leader_email: z.string().email("Invalid email address"),
    leader_ktm: fileValidation("Student Card"),
    leader_instagram_follow_futurest: fileValidation("Follow Proof Futurest"),
    leader_instagram_follow_sre: fileValidation("Follow Proof SRE"),
    leader_twibbon_upload: fileValidation("Twibbon"),
    leader_ig_story: fileValidation("Story Proof"),
    leader_poster_sharing: fileValidation("Sharing Poster Proof"),
    leader_friend_mentions: fileValidation("Friend Mentions").optional(),
    leader_public_account_proof: fileValidation(
      "Public Account Proof",
    ).optional(),

    member_0_name: z.string().min(1, "Full name is required"),
    // member_0_student_id: z.string().min(1, "Student ID is required"),
    member_0_phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
    member_0_email: z.string().email("Invalid email address"),
    member_0_ktm: fileValidation("Student Card"),
    member_0_instagram_follow_futurest: fileValidation("Follow Proof Futurest"),
    member_0_instagram_follow_sre: fileValidation("Follow Proof SRE"),
    member_0_twibbon_upload: fileValidation("Twibbon"),
    member_0_ig_story: fileValidation("Story Proof"),
    member_0_poster_sharing: fileValidation("Sharing Poster Proof"),
    member_0_friend_mentions: fileValidation("Friend Mentions").optional(),
    member_0_public_account_proof: fileValidation(
      "Public Account Proof",
    ).optional(),

    member_1_name: z.string().min(1, "Full name is required").optional(),
    // member_1_student_id: z.string().min(1, "Student ID is required"),
    member_1_phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers")
      .optional(),

    member_1_email: z.string().email("Invalid email address").optional(),
    member_1_ktm: fileValidation("Student Card").optional(),
    member_1_instagram_follow_futurest: fileValidation(
      "Follow Proof Futurest",
    ).optional(),
    member_1_instagram_follow_sre:
      fileValidation("Follow Proof SRE").optional(),
    member_1_twibbon_upload: fileValidation("Twibbon").optional(),
    member_1_ig_story: fileValidation("Story Proof").optional(),
    member_1_poster_sharing: fileValidation("Sharing Poster Proof").optional(),
    member_1_friend_mentions: fileValidation("Friend Mentions").optional(),
    member_1_public_account_proof: fileValidation(
      "Public Account Proof",
    ).optional(),
    leader_payment_proof: fileValidation("Payment Proof").optional(),
    google_drive_link: z
      .string()
      .url("Please enter a valid URL (e.g., https://drive.google.com/...)")
      .optional()
      .or(z.literal("")),

    drive_public_check: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const member1IdentityFields = [
      "member_1_name",
      "member_1_email",
      "member_1_phone",
    ] as const;
    const member1DocumentFields = [
      "member_1_ktm",
      "member_1_instagram_follow_futurest",
      "member_1_instagram_follow_sre",
      "member_1_twibbon_upload",
      "member_1_ig_story",
      "member_1_poster_sharing",
      "member_1_public_account_proof",
    ] as const;

    const hasMember1Identity = member1IdentityFields.some((field) => {
      const value = data[field];
      return typeof value === "string"
        ? value.trim().length > 0
        : Boolean(value);
    });
    const hasMember1Documents = member1DocumentFields.some((field) =>
      Boolean(data[field]),
    );

    if (!hasMember1Identity && !hasMember1Documents) {
      return;
    }

    if (!data.member_1_name?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full name is required",
        path: ["member_1_name"],
      });
    }

    if (!data.member_1_email?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required",
        path: ["member_1_email"],
      });
    }

    if (!data.member_1_phone?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number is required",
        path: ["member_1_phone"],
      });
    }

    member1DocumentFields.forEach((field) => {
      if (!data[field]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This document is required",
          path: [field],
        });
      }
    });
  });

export type CompetitionFormValues = z.infer<typeof CompetitionSchema>;
