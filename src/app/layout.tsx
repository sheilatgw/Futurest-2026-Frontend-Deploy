import "./globals.css";

import type { Metadata } from "next";

import Providers from "@/app/providers";
import { BASE_METADATA } from "@/constants/metadata";
import { FiraSans, Pagkaki, Sora, Titillium } from "@/lib/font";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...BASE_METADATA,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          Sora.variable,
          FiraSans.variable,
          Titillium.variable,
          Pagkaki.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
