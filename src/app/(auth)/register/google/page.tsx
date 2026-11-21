"use client";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import { setToken } from "@/lib/cookies";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function GoogleRegisterContent() {
  const router = useRouter();

  // useSearchParams aman dipanggil disini karena component ini dibungkus Suspense di parent
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordValid = passwordRegex.test(password);

  const submit = async () => {
    if (!isPasswordValid) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character, and minimum 6 characters",
      );
      return;
    }

    setLoading(true);

    const registerToken = localStorage.getItem("register_token");
    if (!registerToken) {
      toast.error("Register token not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(
        "/api/v1/auth/register/google",
        {
          password,
        },
        {
          headers: {
            "x-register-token": registerToken,
          },
        },
      );

      const { access_token, ...user } = res.data;

      authStorage.set(access_token, user);
      setToken(access_token);
      authStorage.clearTempRegisterToken();

      toast.success("Registration successful 🎉");

      // 3. LOGIC REDIRECT DINAMIS
      // Kalau ada titipan redirect, pergi kesana. Kalau tidak, ke dashboard.
      router.replace(redirectTarget || "/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed. Please try again.";

      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F936D] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <NextImage
            src="/logo-24.png"
            alt="Futurest Logo"
            width={64}
            height={64}
          />
        </div>

        <Typography
          variant="h5"
          weight="bold"
          className="mb-2 text-center text-gray-800"
        >
          Complete Your Registration
        </Typography>

        <Typography
          variant="p"
          className="mb-6 text-center text-sm text-gray-500"
        >
          Set a password to finish creating your account
        </Typography>

        {/* Password Input */}
        <div className="mb-2 relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Set password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Validation Message */}
        {!isPasswordValid && password.length > 0 && (
          <p className="mb-4 text-xs text-red-500">
            Password must be at least 6 characters and include uppercase,
            lowercase, number, and special character.
          </p>
        )}

        {/* Button */}
        <Button
          onClick={submit}
          disabled={loading || !isPasswordValid}
          className="mt-4 w-full rounded-xl bg-[#0F936D] text-white hover:bg-[#288456] disabled:opacity-50"
        >
          {loading ? "Processing..." : "Register"}
        </Button>
      </div>
    </div>
  );
}

// 2. EXPORT DEFAULT BERUPA PARENT YANG BUNGKUS SUSPENSE
export default function GoogleRegisterPage() {
  return (
    // Fallback UI muncul sebentar saat Next.js nyiapin data URL
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <GoogleRegisterContent />
    </Suspense>
  );
}
