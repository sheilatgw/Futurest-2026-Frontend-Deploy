"use client";
export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react"; // Wajib Suspense
import toast from "react-hot-toast"; // Atau Sonner kalau mau diganti

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import useAuthStore from "@/stores/use-auth-store";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/entity/user";

function GoogleCallbackContent() {
  const params = useSearchParams();
  const router = useRouter();
  const login = useAuthStore.useLogin();

  // Ambil parameter redirect (target url setelah login sukses)
  const redirectTarget = params.get("redirect");

  useEffect(() => {
    const handleCallback = async () => {
      const token = params.get("token");
      const role = params.get("role");

      if (!token) {
        toast.error("Google login failed");
        router.replace("/login");
        return;
      }

      // 🟥 KASUS 1: BELUM REGISTER (New User)
      if (!role) {
        localStorage.setItem("register_token", token);

        // --- DETEKSI NIAT USER (LOGIC BARU) ---
        const intent = localStorage.getItem("register_intent");

        // Bersihkan intent setelah dibaca (One-time use)
        localStorage.removeItem("register_intent");

        let targetRegisterUrl = "";

        if (intent === "BRAND_AMBASSADOR") {
          // Arahkan ke Form Khusus BA
          // Kita tetap bawa redirectTarget kalau ada (misal redirect=/campaign-A)
          targetRegisterUrl = redirectTarget
            ? `/register/brand-ambassador?redirect=${redirectTarget}`
            : "/register/brand-ambassador";
        } else {
          // Arahkan ke Form Google Biasa (Default)
          targetRegisterUrl = redirectTarget
            ? `/register/google?redirect=${redirectTarget}`
            : "/register/google";
        }

        router.replace(targetRegisterUrl);
        return;
      }

      // SUDAH REGISTER → token = access token
      setToken(token);

      try {
        const res = await api.get<ApiResponse<User>>("/api/v1/auth/me");

        if (!res.data.data) {
          throw new Error("Invalid login session");
        }

        login({
          ...res.data.data,
          token,
        });

        // (kaya useLoginHook)
        if (redirectTarget) {
          router.replace(redirectTarget);
        } else {
          // Kalau ga ada, baru ke dashboard
          router.replace("/dashboard");
        }
      } catch {
        toast.error("Failed to fetch user session");
        router.replace("/login");
      }
    };

    handleCallback();
  }, [params, router, login, redirectTarget]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0F936D]">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <div className="h-fit mx-auto w-fit animate-pulse">
          <NextImage
            src="/logo-24.png"
            alt="Futurest Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>

        {/* Text */}
        <Typography
          variant="h5"
          weight="semibold"
          className="text-white tracking-wide"
        >
          Signing you in with Google
        </Typography>

        <Typography variant="p" className="max-w-xs text-sm text-white/80">
          Please wait a moment. We’re securely verifying your account.
        </Typography>

        {/* Loader */}
        <div className="mt-4 flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallbackClient() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0F936D]" />}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
