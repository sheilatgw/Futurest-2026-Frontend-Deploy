"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import WholeLoadingPage from "@/components/loading/whole-loading";
import api from "@/lib/api";

export default function ShortLinkRedirect({
  params,
}: {
  params: { short_url: string };
}) {
  const router = useRouter();
  useEffect(() => {
    api
      .get(`/api/v1/link/o/${params.short_url}` || "")
      .then((data) => {
        if (data.data) {
          router.replace(data.data.data);
        }
      })
      // eslint-disable-next-line unused-imports/no-unused-vars
      .catch((_err) => {
        router.replace("/not-found");
      });
  }, [params.short_url, router]);

  return <WholeLoadingPage />;
}
