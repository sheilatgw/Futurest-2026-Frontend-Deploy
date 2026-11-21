import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOC_TYPES = ["application/pdf"];

const pdfSchema = z
  .custom<File>((v) => v instanceof File, { message: "File is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Max file size is 3MB.",
  })
  .refine((file) => ACCEPTED_DOC_TYPES.includes(file.type), {
    message: "Only .pdf format is supported.",
  });

const imageSchema = z
  .custom<File>((v) => v instanceof File, { message: "Image is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Max file size is 3MB.",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
  });

export const RepiSchema = z.object({
  // Team Leader
  team_name: z.string().min(1, "Team Name is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  institution_name: z.string().min(1, "Institution name is required"),
  // student_id_number: z.string().min(1, "Student ID Number is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  advisor_name: z.string().min(1, "Advisor name is required"),
  advisor_number: z.string().min(1, "Advisor number is required"),

  // Team Member 2 (Optional)
  team_member_2_name: z.string().optional(),
  team_member_2_institution_name: z.string().optional(),
  // team_member_2_student_id_number: z.string().optional(),
  team_member_2_phone: z.string().optional(),
  team_member_2_email: z.string().optional(), // Removed email validation for optional field to avoid empty string error if not handled

  // Team Member 3 (Optional)
  team_member_3_name: z.string().optional(),
  team_member_3_institution_name: z.string().optional(),
  // team_member_3_student_id_number: z.string().optional(),
  team_member_3_phone: z.string().optional(),
  team_member_3_email: z.string().optional(),

  // Documents
  student_id_file: pdfSchema,
  twibbon_proof: imageSchema,
  follow_futurest_proof: imageSchema,
  follow_sre_proof: imageSchema,
  story_proof: imageSchema,
  sharing_proof: imageSchema,

  // Step 2
  abstract_link: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Link is required"),
  confirm_public_access: z.boolean().refine((val) => val === true, {
    message: "You must confirm the link is public",
  }),

  // Step 3
  payment_proof: imageSchema,
});
// Removed refine for attend_consideration_desc as it's no longer needed
