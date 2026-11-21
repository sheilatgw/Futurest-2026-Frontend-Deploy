"use client";

import Typography from "@/components/typography";
import { Suspense } from "react";
import React from "react";

function CompetitionLayoutInternal({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full min-h-screen">{children}</section>;
}

export default function CompetitionLayout({
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
            Loading...
          </Typography>
        </div>
      }
    >
      <CompetitionLayoutInternal>{children}</CompetitionLayoutInternal>
    </Suspense>
  );
}
