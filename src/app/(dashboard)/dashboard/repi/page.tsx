"use client";

import { useSearchParams } from "next/navigation"; // <--- 1. Import ini
import UserLayouts from "@/layouts/User/UserLayouts";
import NextImage from "@/components/next-image";
import TeamBanner from "./container/TeamBanner";
import TeamProfile from "./container/TeamProfile";
// import { useMyRegistrations } from "@/hooks/use-my-registration"; // <--- Tidak butuh ini lagi
import { useTeamDetail } from "@/hooks/use-team-detail";
import { useTeamPayment } from "@/hooks/use-payment-team-detail";

export default function UserDashboardPage() {
  // 2. Ambil params dari URL
  const searchParams = useSearchParams();
  const teamIdParam = searchParams.get("team_id");

  // 3. Gunakan ID dari params.
  // Jika URL kosong (null), kita kasih string kosong "" biar hooks di bawah ga error.
  const repiTeamId = teamIdParam ?? "";

  const { data: repiPaymentData } = useTeamPayment(repiTeamId);
  const { data: repiTeamData } = useTeamDetail(repiTeamId);

  return (
    <UserLayouts withNavbar withFooter withSidebar>
      <main className="relative min-h-screen w-full pt-12 pb-32 md:py-20">
        {/* Background Pattern */}
        <div className="fixed inset-0 z-0 h-full w-full bg-[#0B8457]">
          <NextImage
            src="/images/dashboard/bg-pattern.png"
            alt="Background"
            width={1920}
            height={1080}
            serverStaticImg={true}
            useSkeleton={false}
            className="h-full w-full"
            imgClassName="object-cover h-full w-full opacity-40"
            priority
          />
        </div>

        {/* Dekorasi (Fixed) */}
        <div className="fixed left-0 top-0 z-0 hidden md:block">
          <NextImage
            src="/images/dashboard/desktop-top-left.svg"
            alt=""
            width={525}
            height={525}
            serverStaticImg={true}
            useSkeleton={false}
          />
        </div>
        <div className="fixed bottom-0 right-0 z-0 hidden md:block">
          <NextImage
            src="/images/dashboard/desktop-bottom-right.svg"
            alt=""
            width={700}
            height={525}
            serverStaticImg={true}
            useSkeleton={false}
          />
        </div>

        <section className="relative z-10 flex w-full items-center justify-center p-4">
          <div className="relative w-[95%] md:w-[85%]">
            <div
              className="absolute inset-0 bg-[#FFCE21] rounded-[16px] -rotate-[1.7deg] shadow-md md:hidden pointer-events-none"
              style={{ height: "100%" }}
            ></div>

            {/* id debug */}
            {/* <div className="bg-red-500 w-50">{repiTeamId}</div> */}

            <TeamBanner teamName={repiTeamData?.team_name ?? ""} />
            <TeamProfile
              repiTeamData={repiTeamData}
              repiPaymentData={repiPaymentData}
            />
          </div>
        </section>
      </main>
    </UserLayouts>
  );
}
