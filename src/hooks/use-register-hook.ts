import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
// 1. Tambah useSearchParams
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import api from "@/lib/api";
import type { ApiError, ApiResponse } from "@/types/api";
import { RegisterSchema } from "@/validation/register";

const useRegisterHook = () => {
  const router = useRouter();
  // 2. Ambil parameter redirect
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");

  const method = useForm<z.infer<typeof RegisterSchema>>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    handleRegister(data);
  };

  const { mutate: handleRegister, isPending } = useMutation<
    ApiResponse<any>,
    AxiosError<ApiError>,
    z.infer<typeof RegisterSchema>
  >({
    mutationFn: async (data) => {
      const res = await api.post("/api/v1/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        "Register Success! Check your email to verify your account.",
      );

      // 3. LOGIC REDIRECT KE LOGIN (BAWA PARAMETER)
      setTimeout(() => {
        if (redirectTarget) {
          // Kalau registrasi dari /ba, arahkan ke login?redirect=/ba
          router.push(`/login?redirect=${redirectTarget}`);
        } else {
          router.push("/login");
        }
      }, 3000);
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(
        err.response?.data.error ?? "Something went wrong, please retry...",
      );
    },
  });

  return {
    method,
    onSubmit,
    isPending,
  };
};

export default useRegisterHook;
