export interface BaApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram_handle: string;
  student_type: "UNIVERSITY" | "HIGH_SCHOOL" | string;
  institution_name: string;
  city: string;
  student_id_number: string;
  student_id_file: string;
  follower_count: number;
  instagram_public: string;
  follow_futurest_proof: string;
  follow_sre_proof: string;
  twibbon_proof: string;
  portfolio_link: string;
  cv_file: string;
  content_frequency: string;
  willing_attend_event: boolean;
  status:
    | "ACCEPTED"
    | "REJECTED"
    | "UNDER_REVIEW"
    | "PENDING_REVIEW"
    | "INTERVIEW_SCHEDULED"
    | "INTERVIEW_COMPLETED";
  interview_schedule: string | null;
  interview_method: string | null;
  interview_link: string | null;
  interview_notes: string | null;
  is_selected: boolean;
  referral_code: string | null;
  created_at: string;
}

export interface BaApplicantResponse {
  success: boolean;
  message: string;
  data: BaApplicant;
}

export interface BaApplicantListResponse {
  success: boolean;
  message: string;
  data: {
    data: BaApplicant[]; // ← ARRAY DI SINI
    pagination: Pagination;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}
