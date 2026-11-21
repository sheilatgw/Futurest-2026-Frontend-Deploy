import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import useAuthStore from "@/stores/use-auth-store";
import type { ApiError, ApiResponse } from "@/types/api";
import type { User } from "@/types/entity/user";
import { LoginSchema } from "@/validation/login";

type LoginResponse = {
  token: string;
  role: string;
};

const useLoginHook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");

  const { login } = useAuthStore();

  // State untuk modal verifikasi email
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const method = useForm<z.infer<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    handleLogin(data);
  }

  // Mutation untuk Login
  const { mutate: handleLogin, isPending } = useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ApiError>,
    z.infer<typeof LoginSchema>
  >({
    mutationFn: async (data) => {
      const res = await api.post("/api/v1/auth/login", data);
      const { token } = res.data.data;

      if (!res.data.data) {
        throw new Error("Invalid login session");
      }

      setToken(token);

      const { data: dataUser } =
        await api.get<ApiResponse<User>>("/api/v1/auth/me");

      if (dataUser.success) {
        const userData = { ...dataUser.data, token: token };
        login(userData);
        localStorage.setItem("user", JSON.stringify(dataUser.data));
      }

      const role = dataUser.data.personal_info.role;

      if (role === "ADMIN") {
        router.push("/admin");
      } else if (redirectTarget) {
        router.push(redirectTarget);
      } else {
        router.push("/dashboard");
      }

      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Login Success");
    },
    onError: (err: AxiosError<ApiError>, variables) => {
      const errorMessage =
        err.response?.data.message || err.response?.data.error;

      // CEK ERROR VERIFIKASI EMAIL DI SINI
      if (
        errorMessage &&
        (errorMessage.toLowerCase().includes("verify token") ||
          errorMessage.toLowerCase().includes("not verified") ||
          errorMessage.toLowerCase().includes("token not found"))
      ) {
        // Simpan email yang bermasalah dan buka modal
        setUnverifiedEmail(variables.email);
        setShowVerificationModal(true);
      } else {
        toast.error(
          err.response?.data.error ?? "Something went wrong, please retry...",
        );
      }
    },
  });

  // Mutation untuk Resend Email
  const { mutate: resendEmail, isPending: isResending } = useMutation({
    mutationFn: async () => {
      return await api.post("/api/v1/auth/resend-verification-email", {
        email: unverifiedEmail,
      });
    },
    onSuccess: () => {
      toast.success(
        "Verification email sent! Please check your inbox/spam folder.",
      );
      setShowVerificationModal(false);
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data.error ?? "Failed to resend email.");
    },
  });

  return {
    method,
    onSubmit,
    isPending,
    // Ekspor state & fungsi tambahan buat Modal
    showVerificationModal,
    setShowVerificationModal,
    unverifiedEmail,
    resendEmail,
    isResending,
  };
};

export default useLoginHook;
