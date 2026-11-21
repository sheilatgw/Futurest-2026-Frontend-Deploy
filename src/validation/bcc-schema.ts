import { z } from "zod";

const MAX_FILE_SIZE = 3000000; // 3MB
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

const fileSchema = z
  .any()
  .refine((file) => file instanceof File && file.size > 0, "File is required")
  .refine(
    (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
    "Max file size is 3MB",
  )
  .refine(
    (file) =>
      file instanceof File &&
      file.type.length > 0 &&
      ALLOWED_IMAGE_TYPES.includes(file.type),
    "Only PNG, JPG, JPEG, or PDF are allowed",
  );

export const BCCSchema = z.object({
  // --- Identitas Kompetisi & Tim ---
  competition_batch_id: z.string().min(1, "Batch ID is required"),
  team_name: z.string().min(1, "Team name is required"),
  university: z.string().min(1, "University is required"),

  supervisor_name: z.string().min(1, "Supervisor name is required"),
  supervisor_phone: z.string().min(1, "Supervisor phone is required"),

  google_drive_link: z.string().url("Please enter a valid Google Drive link"),
  link_public_check: z.literal(true, {
    message: "You must confirm the link is public",
  }),
  // payment_proof: fileSchema,

  // --- LEADER (Ketua) ---
  leader: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
  }),
  leader_ktm: fileSchema,
  leader_payment_proof: fileSchema,
  leader_instagram_follow_futurest: fileSchema,
  leader_instagram_follow_sre: fileSchema,
  leader_twibbon_upload: fileSchema,
  leader_ig_story: fileSchema,
  leader_poster_sharing: fileSchema,
  leader_friend_mentions: fileSchema,
  leader_public_account_proof: fileSchema,

  // --- MEMBER 0 (Anggota 1) ---
  member_0: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
  }),
  member_0_ktm: fileSchema,
  member_0_instagram_follow_futurest: fileSchema,
  member_0_instagram_follow_sre: fileSchema,
  member_0_twibbon_upload: fileSchema,
  member_0_ig_story: fileSchema,
  member_0_poster_sharing: fileSchema,
  member_0_friend_mentions: fileSchema,
  member_0_public_account_proof: fileSchema,

  // --- MEMBER 1 (Anggota 2) ---
  member_1: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
  }),
  member_1_ktm: fileSchema,
  member_1_instagram_follow_futurest: fileSchema,
  member_1_instagram_follow_sre: fileSchema,
  member_1_twibbon_upload: fileSchema,
  member_1_ig_story: fileSchema,
  member_1_poster_sharing: fileSchema,
  member_1_friend_mentions: fileSchema,
  member_1_public_account_proof: fileSchema,
});
