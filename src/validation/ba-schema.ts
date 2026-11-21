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

export const BASchema = z
  .object({
    // identity
    name: z.string().min(3, "Name must be at least 3 characters"),
    student_type: z.enum(["UNIVERSITY", "HIGH_SCHOOL"], {
      message: "Please select your student type",
    }),
    student_id_number: z.string().min(1, "Student ID Number is required"),
    institution_name: z.string().min(1, "Institution name is required"),
    city: z.string().min(1, "Domicile/City is required"),

    instagram_handle: z.string().min(1, "Instagram link is required"),

    follower_count: z.coerce
      .number("Follower count must be a number")
      .min(0, "Cannot be negative"),

    instagram_public: z
      .enum(["true", "false"], {
        message: "Please specify if your account is public",
      })
      .refine((val) => val === "true", {
        message:
          "Cannot proceed registration if IG private (Account must be public)",
      }),

    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    line_id: z.string().min(1, "Line ID is required"),

    // general questions
    introduce: z.string().min(10, "Please introduce yourself (min 10 chars)"),
    about: z.string().min(10, "Please tell us about yourself (min 10 chars)"),
    knowledge: z
      .string()
      .min(10, "Please describe your knowledge (min 10 chars)"),
    expect: z
      .string()
      .min(10, "Please describe your expectations (min 10 chars)"),

    // ba questions
    about_ba: z.string().min(10, "Please explain about BA (min 10 chars)"),
    reason_ba: z.string().min(10, "Please explain your reason (min 10 chars)"),
    worked_experience: z
      .string()
      .min(1, 'Please describe your experience or type "-" if none'),
    strategy_promote: z
      .string()
      .min(10, "Please describe your strategy (min 10 chars)"),
    skills: z.string().min(1, "Please describe your skills"),
    question_one: z.string().min(1, "Answer is required"),
    question_two: z.string().min(1, "Answer is required"),

    // special req
    willingness_upload_event: z.string().min(1, "Please select an option"),
    willing_attend_event: z.enum(
      ["yes_no_constraints", "yes_considerations", "no"],
      {
        message: "Please select an option",
      },
    ),

    attend_consideration_desc: z.string().optional(),

    portfolio_link: z
      .string()
      .url("Please enter a valid URL (https://...)")
      .optional()
      .or(z.literal("")),

    student_id_file: pdfSchema,
    cv_file: pdfSchema,
    twibbon_proof: imageSchema,
    follow_futurest_proof: imageSchema,
    follow_sre_proof: imageSchema,
  })
  .refine(
    (data) => {
      if (data.willing_attend_event === "yes_considerations") {
        return (
          !!data.attend_consideration_desc &&
          data.attend_consideration_desc.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "Please explain your considerations",
      path: ["attend_consideration_desc"],
    },
  );
