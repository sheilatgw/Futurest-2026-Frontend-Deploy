"use client";
import NextImage from "@/components/next-image";
import UserLayouts from "@/layouts/User/UserLayouts";
import PaidView from "./components/PaidView";
import ReiiAtas from "./components/ReiiAtas";
import ReiiBawah from "./components/ReiiBawah";

export default function ReiiDashboardPage() {
  const isPaid = true;

  return (
    <UserLayouts withNavbar withFooter withSidebar>
      {!isPaid ? (
        <main className="relative min-h-screen w-full pt-12 pb-32 md:py-20">
          {/* Background Pattern */}
          <div className="fixed inset-0 z-0 h-full w-full bg-[#0B8457]">
            <NextImage
              src="/competition/background-reii.png"
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

          <section className="relative z-10 flex w-full items-center justify-center p-4">
            <div className="relative w-[95%] md:w-[85%]">
              <div
                className="absolute inset-0 bg-[#FFCE21] rounded-[16px] -rotate-[1.7deg] shadow-md md:hidden pointer-events-none"
                style={{ height: "100%" }}
              ></div>

              <ReiiAtas />
              <ReiiBawah />
            </div>
          </section>
        </main>
      ) : (
        <main className="relative min-h-screen w-full pt-12 pb-32 md:py-20">
          {/* Background Pattern */}
          <div className="fixed inset-0 z-0 h-full w-full bg-[url(/images/competition/background-reii.png)] bg-cover"></div>
          <section className="relative z-10 flex w-full items-center justify-center p-4 pt-10">
            <PaidView />
          </section>
        </main>
      )}
    </UserLayouts>
  );
}
