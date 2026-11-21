"use client";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import { BookOpen, Send } from "lucide-react";

interface AmplopProps {
  imageSrcMobile?: string;
  imageSrc?: string;
  className?: string;
  registerLink?: string;
  guidebookLink?: string;
}

export default function Amplop({
  imageSrc,
  className,
  registerLink,
  guidebookLink,
}: AmplopProps) {
  // --- SAFE NAVIGATION HANDLER ---
  // Hindari pakai <Link> / <a> di dalam GSAP-pinned container.
  // GSAP pin:true masih memegang DOM node saat React unmount, causing removeChild error.
  // Solusi: gunakan window.location.href dengan sedikit delay buat cleanup animasi.
  const handleRegister = () => {
    if (!registerLink || registerLink === "#") return;
    setTimeout(() => {
      window.location.href = registerLink;
    }, 150);
  };

  const handleGuidebook = () => {
    if (!guidebookLink || guidebookLink === "#") return;
    window.open(guidebookLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Image container */}
      <div className="w-full max-w-[412px] aspect-[412/358]">
        <NextImage
          width={412}
          height={358}
          src={imageSrc || "/placeholder.svg"}
          alt="Futurest Banner Background"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col min-[1030px]:flex-row gap-2.5 w-full max-w-[312px] mt-4">
        <Button
          onClick={handleRegister}
          className="bg-[#0F936D] hover:bg-[#0d7d5c] text-white w-full justify-center text-center cursor-pointer"
        >
          <Send className="w-5 h-5 mr-2" />
          Register Now!
        </Button>
        <Button
          onClick={handleGuidebook}
          variant="outline"
          className="bg-neutral-50 hover:bg-neutral-100 text-[#0F936D] border-neutral-200 w-full justify-center text-center cursor-pointer"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Guidebook
        </Button>
      </div>
    </div>
  );
}
