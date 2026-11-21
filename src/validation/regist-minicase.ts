import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const REG_PHONE = /^[0-9]+$/;

// 1. Bikin Schema Khusus File biar bisa dipake ulang (DRY)
// Helper buat cek validitas file manual di superRefine (Member 3)
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const requiredFileSchema = z
  .any()
  .refine((file) => file instanceof File && file.size > 0, "File is required")
  .refine(
    (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
    "Max file size is 5MB",
  )
  .refine(
    (file) =>
      file instanceof File &&
      file.type.length > 0 &&
      ALLOWED_IMAGE_TYPES.includes(file.type),
    "Only PNG, JPG, or JPEG images are allowed",
  );

const validateFileManual = (file: any, ctx: z.RefinementCtx, path: string) => {
  if (!file || !(file instanceof File)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File is required",
      path: [path],
    });
    return;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Only PNG, JPG, or JPEG images are allowed",
      path: [path],
    });
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Max file size is 5MB",
      path: [path],
    });
  }
};

export const FormMinicaseSchema = z
  .object({
    // --- TEAM INFO & LEADER ---
    team_name: z.string().min(1, "Team Name is required"),
    team_leader_name: z.string().min(1, "Name is required"),
    team_leader_phone: z
      .string()
      .regex(REG_PHONE, "Invalid Phone")
      .min(1, "Required"),
    team_leader_email: z.string().email("Invalid email").min(1, "Required"),

    university: z.string().min(1, "University is required"),
    faculty: z.string().min(1, "Faculty is required"),
    study_program: z.string().min(1, "Study Program is required"),

    // Pake Schema yang udah ada validasi Size & Type
    team_leader_instagram_follow: requiredFileSchema,
    team_leader_instagram_repost: requiredFileSchema,
    team_leader_instagram_story: requiredFileSchema,
    team_leader_ktm: requiredFileSchema,

    // --- MEMBER 2 ---
    team_member_2_name: z.string().min(1, "Name is required"),
    team_member_2_email: z.string().email("Invalid email").min(1, "Required"),

    // Pake Schema yang sama
    team_member_2_instagram_follow: requiredFileSchema,
    team_member_2_instagram_repost: requiredFileSchema,
    team_member_2_instagram_story: requiredFileSchema,
    team_member_2_ktm: requiredFileSchema,

    // --- MEMBER 3 (OPTIONAL BASE) ---
    team_member_3_name: z.string().optional().or(z.literal("")),
    team_member_3_email: z.string().optional().or(z.literal("")),
    // File di set optional dulu di level ini
    team_member_3_instagram_follow: z.any().optional(),
    team_member_3_instagram_repost: z.any().optional(),
    team_member_3_instagram_story: z.any().optional(),
    team_member_3_ktm: z.any().optional(),

    minicase_batch_id: z.string().min(1, "Minicase Batch is required"),
  })
  .superRefine((data, ctx) => {
    // --- LOGIC MEMBER 3 (ALL OR NOTHING) ---

    const m3Name = data.team_member_3_name;
    const m3Email = data.team_member_3_email;
    const m3Follow = data.team_member_3_instagram_follow;
    const m3Repost = data.team_member_3_instagram_repost;
    const m3Story = data.team_member_3_instagram_story;
    const m3Ktm = data.team_member_3_ktm;

    // Cek apakah ada trigger input (file dianggap input jika instanceof File)
    const hasInput =
      (m3Name && m3Name.trim() !== "") ||
      (m3Email && m3Email.trim() !== "") ||
      m3Follow instanceof File ||
      m3Repost instanceof File ||
      m3Story instanceof File ||
      m3Ktm instanceof File;
    if (!hasInput) return; // Kalau kosong semua, skip validasi

    // Validasi Name
    if (!m3Name || m3Name.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required for Member 3",
        path: ["team_member_3_name"],
      });
    }

    // Validasi Email
    if (!m3Email || m3Email.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required for Member 3",
        path: ["team_member_3_email"],
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m3Email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email address",
        path: ["team_member_3_email"],
      });
    }

    // Validasi File Manual (Panggil Helper function tadi)
    validateFileManual(m3Follow, ctx, "team_member_3_instagram_follow");
    validateFileManual(m3Repost, ctx, "team_member_3_instagram_repost");
    validateFileManual(m3Story, ctx, "team_member_3_instagram_story");
    validateFileManual(m3Ktm, ctx, "team_member_3_ktm");
  });
