"use client";

import { CheckCircle, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import toast from "react-hot-toast";

// Kita pisah logic ke component Content biar bisa dibungkus Suspense
function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  // State: loading | success | error
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your email...");

  // Ref untuk mencegah double fetch di React Strict Mode (Development)
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. Token is missing.");
      return;
    }

    // Cegah request ganda
    if (hasFetched.current) return;
    hasFetched.current = true;

    const verifyEmail = async () => {
      try {
        // Hit API
        const response = await api.get(`/api/v1/auth/verify?token=${token}`);

        // Cek jika backend mengirim token baru setelah verify (Auto Login)
        // Sesuaikan 'response.data.data.token' dengan struktur JSON backendmu
        const receivedToken =
          response.data?.data?.token || response.data?.token;
        if (receivedToken) {
          setToken(receivedToken);
        }

        setStatus("success");
        setMessage("Email verified successfully! Redirecting to Dashboard...");

        // Tampilkan Toast Sukses
        toast.success("Email Verified! Redirecting...");

        // Redirect ke Dashboard setelah 2 detik (biar user sempet baca pesan sukses)
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Verification failed. Token invalid or expired.";

        setStatus("error");
        setMessage(errorMsg);

        // Tampilkan Toast Gagal
        toast.error(errorMsg);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0F936D] px-4 py-12">
      {/* Background Decoration (Optional - sesuaikan dengan login page) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/images/login/bg-desktop-login.png')",
        }}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl text-center p-8 md:p-12">
        {/* Logo Kecil */}
        <div className="mx-auto h-16 w-16 mb-6">
          <NextImage
            src="/logo-24.png" // Sesuaikan path logo kamu
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* --- STATE: LOADING --- */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-16 w-16 animate-spin text-[#0F936D]" />
            <Typography
              font="Sora"
              weight="bold"
              className="text-2xl text-gray-800"
            >
              Verifying...
            </Typography>
            <p className="text-gray-500">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {/* --- STATE: SUCCESS --- */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            <CheckCircle className="h-20 w-20 text-green-500" />
            <Typography
              font="Sora"
              weight="bold"
              className="text-2xl text-gray-800"
            >
              Email Verified!
            </Typography>
            <p className="text-gray-500">{message}</p>
          </div>
        )}

        {/* --- STATE: ERROR --- */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            <XCircle className="h-20 w-20 text-red-500" />
            <Typography
              font="Sora"
              weight="bold"
              className="text-2xl text-gray-800"
            >
              Verification Failed
            </Typography>
            <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm w-full">
              {message}
            </p>

            <Link href="/login" className="w-full mt-4">
              <Button
                variant="outline"
                className="w-full rounded-xl border-gray-300"
              >
                Back to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// WAJIB: Bungkus component yang pake useSearchParams dengan Suspense
// Kalau nggak, build production bisa error atau de-opt ke Client Side Rendering paksa
export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
