"use client";

import { Instagram, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// import Navbar from "../components/Navbar";
import Button from "@/components/buttons/button";

export default function CompletionPage() {
  const router = useRouter();

  return (
    <main className="max-w-2xl mx-auto px-4 text-center">
      <div className="my-8 flex justify-center">
        <div className="flex items-center justify-center w-full max-w-xl bg-gray-100 p-8 aspect-[4/3]">
          <Image
            src="/images/futuretalk/envelope.png"
            alt="Registration Completed Envelope"
            width={420}
            height={315}
            className="object-contain mx-auto my-auto"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          variant="outline"
          onClick={() =>
            window.open("https://instagram.com/futurest.2026", "_blank")
          }
          className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Instagram size={20} />
          <span>Instagram Futurest 2026</span>
        </Button>

        <Button
          variant="primary"
          onClick={() => router.push("/dashboard")}
          className="flex-1 py-3 px-6 rounded-2xl bg-[#3A6AB2] text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
        >
          <LayoutDashboard size={20} />
          <span>Back to Dashboard</span>
        </Button>
      </div>
    </main>
  );
}
