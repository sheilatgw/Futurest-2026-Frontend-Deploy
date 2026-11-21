import { useState } from "react";
import toast from "react-hot-toast";

// --- TIPE DATA ---
export interface ValidationResult {
  success: boolean;
  isPublic: boolean;
  lastModified: string | null;
  fileCount: number;
  proofFound: boolean;
  matchedFile: string | null;
  message: string;
}

// Regex Validasi Link Drive
const DRIVE_REGEX =
  /^https:\/\/drive\.google\.com\/(?:drive(?:\/u\/\d+)?\/folders\/)([-a-zA-Z0-9_]+).*$/;

export const useDriveValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);

  // Helper Extract ID
  const extractFolderId = (url: string) => {
    const match = url.match(DRIVE_REGEX);
    return match && match[1] ? match[1] : null;
  };

  // Main Function
  const validateDrive = async (link: string) => {
    // 1. Reset State
    setIsValidating(true);
    setValidationResult(null);
    const toastId = toast.loading("Checking Google Drive...");

    try {
      // 2. Client-side Check (Regex)
      const folderId = extractFolderId(link);

      if (!folderId) {
        throw new Error(
          "Link invalid! Pastikan link Folder Google Drive benar.",
        );
      }

      // 3. API Call
      const response = await fetch("/api/validate-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderId }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Gagal menghubungi server validasi.");
      }

      // 4. Set Result
      setValidationResult(data);

      // 5. Feedback User via Toast
      if (data.success) {
        toast.success("Folder Valid! Semua syarat terpenuhi.", { id: toastId });
      } else {
        // Validasi jalan, tapi syarat drive ga terpenuhi (misal file kurang)
        toast.error("Validasi Gagal. Cek detail di laporan.", { id: toastId });
      }
    } catch (error: any) {
      // Tangkap semua error disini biar app ga crash
      toast.error(error.message || "Terjadi kesalahan sistem.", {
        id: toastId,
      });
      setValidationResult(null);
    } finally {
      setIsValidating(false);
    }
  };

  // Return function & state biar bisa dipake component
  return {
    validateDrive,
    isValidating,
    validationResult,
    resetValidation: () => setValidationResult(null), // Opsional: buat reset manual
  };
};
