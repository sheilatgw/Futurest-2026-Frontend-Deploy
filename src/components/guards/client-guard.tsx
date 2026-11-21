"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type ClientGuardProps<T> = {
  data: T | null | undefined;
  condition: (data: T) => boolean;
  redirectTo: string;
  toastMessage?: string;
  children: React.ReactNode;
};

export default function ClientGuard<T>({
  data,
  condition,
  redirectTo,
  toastMessage,
  children,
}: ClientGuardProps<T>) {
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    if (condition(data)) {
      if (toastMessage) {
        toast.error(toastMessage);
      }
      router.replace(redirectTo);
    }
  }, [data, condition, redirectTo, toastMessage, router]);

  if (data && condition(data)) return null;

  return <>{children}</>;
}
