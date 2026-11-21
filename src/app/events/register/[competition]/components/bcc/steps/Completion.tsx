"use client";

import { Instagram, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// import Navbar from "../components/Navbar";
import Button from "@/components/buttons/button";

export default function CompletionPage() {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto px-4 text-center">
      <div className="my-12 w-full flex justify-center">
        <div className="relative w-full aspect-[2/1] md:aspect-[3/1.2]">
          <Image
            src="/images/bcc/completed.svg"
            alt="Registration Completed Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={() =>
            window.open("https://instagram.com/futurest.2026", "_blank")
          }
          className="flex-1 py-4 px-8 rounded-xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
        >
          <Instagram size={22} />
          <span>Instagram Futurest 2026</span>
        </Button>

        <Button
          variant="primary"
          onClick={() => router.push("/dashboard")}
          className="flex-1 py-4 px-8 rounded-xl bg-[#3A6AB2] text-white font-bold hover:bg-[#2c528a] transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
        >
          <LayoutDashboard size={22} />
          <span>Back to Dashboard</span>
        </Button>
      </div>
    </main>
  );
}
