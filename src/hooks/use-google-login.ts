"use client";

import { baseURL } from "@/lib/api";

export const useGoogleLogin = () => {
  const loginWithGoogle = (
    redirectTarget?: string,
    isBrandAmbassador?: boolean,
  ) => {
    if (isBrandAmbassador) {
      localStorage.setItem("register_intent", "BRAND_AMBASSADOR");
    } else {
      localStorage.removeItem("register_intent");
    }
    const redirectParam = redirectTarget
      ? `?redirect=${encodeURIComponent(redirectTarget)}`
      : "";
    window.location.href = `${baseURL}/api/v1/auth/google/login${redirectParam}`;
  };

  return { loginWithGoogle };
};
