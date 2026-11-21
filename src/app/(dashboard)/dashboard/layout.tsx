"use client";

import { Suspense } from "react";
import React from "react";
import Typography from "@/components/typography";

function DashboardUserPage({ children }: { children: React.ReactNode }) {
  return <section className="w-full h-screen">{children}</section>;
}

export default function DashboardUser({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[30vh] items-center justify-center">
          <Typography
            variant="p"
            weight="medium"
            className="w-full text-center font-bold text-gray-300"
          >
            Load data
            <span className="dots"></span>
          </Typography>
        </div>
      }
    >
      <DashboardUserPage>{children}</DashboardUserPage>
    </Suspense>
  );
}
