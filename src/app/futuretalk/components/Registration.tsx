"use client";

import Button from "@/components/buttons/button";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import StepIndicator from "./StepIndicator";
import TeamSection from "./TeamSection";

type Props = {
  onNext: () => void;
  isLoading: boolean;
};

export default function RegistrationPage({ onNext, isLoading }: Props) {
  const {
    trigger,
    formState: { errors, isSubmitting: isRHFSubmitting },
  } = useFormContext();

  // 1. UBAH STATE: Jadi array of numbers biar bisa buka banyak
  // Default [0] artinya section pertama (Leader) terbuka saat awal load
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const isBusy = isLoading || isRHFSubmitting;

  // 2. UBAH LOGIC TOGGLE: Tambah/Hapus index dari array
  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      if (prev.includes(index)) {
        // Kalau sudah ada, hapus (tutup)
        return prev.filter((i) => i !== index);
      } else {
        // Kalau belum ada, tambah (buka)
        return [...prev, index];
      }
    });
  };

  const handleContinue = async () => {
    const isValid = await trigger();

    if (isValid) {
      onNext();
    } else {
      handleErrorNavigation(); // Panggil fungsi error handling baru
      toast.error("Please complete all required fields.");
    }
  };

  // 3. UBAH LOGIC ERROR: Scan semua error dan buka section yang relevan
  const handleErrorNavigation = () => {
    const err = errors;
    const sectionsToOpen: number[] = [];

    // Cek Section Leader (Index 0)
    if (
      err.team_leader_name ||
      err.team_leader_email ||
      err.team_leader_phone ||
      err.team_leader_instagram_follow
    ) {
      sectionsToOpen.push(0);
    }

    // Cek Section Member 1 (Index 1) - (variable 'team_member_2' di skema lu)
    if (
      err.team_member_2_name ||
      err.team_member_2_email ||
      err.team_member_2_instagram_follow
    ) {
      sectionsToOpen.push(1);
    }

    // Cek Section Member 2 (Index 2) - (variable 'team_member_3' di skema lu)
    if (
      err.team_member_3_name ||
      err.team_member_3_email ||
      err.team_member_3_instagram_follow
    ) {
      sectionsToOpen.push(2);
    }

    // Jika ada error, paksa update state agar section tersebut terbuka
    if (sectionsToOpen.length > 0) {
      setOpenSections(sectionsToOpen);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ... Banner & Header Code ... */}
      <div className="relative w-full h-100 md:h-80 overflow-hidden">
        <Image
          src="/images/futuretalk/Banner.png"
          alt="Future Energy Summit Banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="w-full max-w-2xl mx-auto pt-8 px-4">
        <div className="w-full aspect-[3/1] rounded-xl relative overflow-hidden shadow-sm">
          <Image
            src="/images/futuretalk/FutureTalkxMinicase.png"
            alt="Future Talk x Minicase"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      <StepIndicator currentStep={1} />

      <main className="max-w-3xl mx-auto px-4">
        {/* 4. UBAH PROPS: Gunakan .includes() untuk cek status terbuka */}
        <TeamSection
          title="Team Leader"
          isOpen={openSections.includes(0)}
          onToggle={() => toggleSection(0)}
          isLeader
        />

        <TeamSection
          title="Team Member 1"
          isOpen={openSections.includes(1)}
          onToggle={() => toggleSection(1)}
        />

        <TeamSection
          title="Team Member 2"
          isOpen={openSections.includes(2)}
          onToggle={() => toggleSection(2)}
        />

        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#3A6AB2]"
            onClick={() => window.history.back()}
            disabled={isBusy}
          >
            Back
          </Button>

          <Button
            onClick={handleContinue}
            variant="primary"
            className="flex-1 py-3 px-6 rounded-2xl bg-[#3A6AB2] text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isBusy}
          >
            {isBusy ? (
              <div className="flex items-center justify-center gap-2">
                Submitting...
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
