"use client";
import NextImage from "@/components/next-image";
import UserLayouts from "@/layouts/User/UserLayouts";
import FuturetalkAtas from "./components/FuturetalkAtas";
import FuturetalkBawah from "./components/FuturetalkBawah";
import PaidView from "./components/PaidView";

export default function UserDashboardPage() {
  const isPaid = true;

  return (
    <UserLayouts withNavbar withFooter withSidebar>
      {!isPaid ? (
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

              <FuturetalkAtas />
              <FuturetalkBawah />
            </div>
          </section>
        </main>
      ) : (
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

          <section className="relative z-10 flex w-full items-center justify-center p-4 pt-10">
            <PaidView />
          </section>
        </main>
      )}
    </UserLayouts>
  );
}
