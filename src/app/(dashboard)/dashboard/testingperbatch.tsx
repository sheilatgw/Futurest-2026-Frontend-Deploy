"use client";
import Typography from "@/components/typography";
import UserLayouts from "@/layouts/User/UserLayouts";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useMinicaseBatches } from "@/hooks/use-minicase-batch";
import useAuthStore from "@/stores/use-auth-store";
import { getBatchStatus } from "@/utils/getBatchMinicase";
import FutureTalkCard from "./components/FuturetalkCard";

export default function UserDashboardPage() {
  const { data: batches = [] } = useMinicaseBatches();
  const { user } = useAuthStore();

  const [isDraftingMinicase, setIsDraftingMinicase] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem("minicase_registration_form")) {
      setIsDraftingMinicase(true);
    }
  }, []);

  const isRegistered = !!user?.minicase_info?.is_registered;
  const participantStatus = user?.minicase_info?.participant_info?.status;

  const batchesWithStatus = batches.map((batch: any) => ({
    ...batch,
    status: getBatchStatus(batch),
  }));

  const activeFutureTalkBatch =
    batchesWithStatus.find((b) => b.status === "OPEN") ?? null;

  let minicaseConfig = {
    href: activeFutureTalkBatch
      ? `/futuretalk?batchId=${activeFutureTalkBatch.id}`
      : "/futuretalk",
    btnText: "View Competition",
    statusLabel: "",
    isActive: false,
  };

  if (isRegistered) {
    if (participantStatus === "PENDING_PAYMENT") {
      minicaseConfig = {
        href: "/futuretalk",
        btnText: "Complete Payment",
        statusLabel: "Pending Payment",
        isActive: true,
      };
    } else {
      minicaseConfig = {
        href: "/dashboard/futuretalk",
        btnText: "Go to Dashboard",
        statusLabel: "Registered",
        isActive: true,
      };
    }
  } else if (isDraftingMinicase) {
    minicaseConfig = {
      href: "/futuretalk",
      btnText: "Continue Register",
      statusLabel: "Draft Saved",
      isActive: true,
    };
  }

  const hasActiveMinicase = minicaseConfig.isActive;

  if (!isMounted) return null;

  return (
    <UserLayouts withNavbar withFooter withSidebar>
      <main className="relative min-h-screen w-full pt-12 pb-32 md:py-20">
        <section className="relative z-10 flex w-full justify-center p-4">
          <div className="w-[95%] md:w-[85%]">
            <div className="bg-white rounded-[16px] p-6 md:p-12 shadow-lg">
              <Typography
                variant="h1"
                weight="bold"
                font="Titillium"
                className="mt-10 text-[#0B8457] text-center"
              >
                My Competitions
              </Typography>

              {/* === ACTIVE FUTURETALK (TOP) === */}
              <div className="mt-12 flex justify-center">
                {hasActiveMinicase && (
                  <div className="w-full max-w-[400px]">
                    <FutureTalkCard
                      href={minicaseConfig.href}
                      isActive
                      statusLabel={minicaseConfig.statusLabel}
                      buttonText={minicaseConfig.btnText}
                    />
                  </div>
                )}
              </div>

              {/* === ENROLL SECTION === */}
              <div className="mt-24">
                <Typography
                  variant="h5"
                  weight="bold"
                  font="Titillium"
                  className="text-[#71717A] mb-12 text-center"
                >
                  Enroll yourself in the following competition!
                </Typography>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* BCC */}
                  <Link href="/competitions/bcc">
                    <div className="rounded-[15px] bg-[#0E467A] p-6 text-center text-white">
                      <h2 className="text-5xl font-bold">BCC</h2>
                      <p className="mt-2">Business Case Competition</p>
                    </div>
                  </Link>

                  {/* REPI */}
                  <Link href="/competitions/repi">
                    <div className="rounded-[15px] bg-[#0B8457] p-6 text-center text-white">
                      <h2 className="text-5xl font-bold">REPI</h2>
                      <p className="mt-2">
                        Renewable Energy Project Initiation
                      </p>
                    </div>
                  </Link>

                  {/* REII */}
                  <Link href="/competitions/reii">
                    <div className="rounded-[15px] bg-[#FFCE21] p-6 text-center">
                      <h2 className="text-5xl font-bold text-[#085E3E]">
                        REII
                      </h2>
                      <p className="mt-2 text-[#0B8457]">
                        Renewable Energy Innovation Idea
                      </p>
                    </div>
                  </Link>

                  {/* FUTURETALK — RENDER PER BATCH */}
                  {batchesWithStatus.map((batch) => {
                    const isActive = batch.status === "OPEN";
                    const isDisabled = !isActive;

                    return (
                      <div
                        key={batch.id}
                        className={`rounded-[15px] bg-[#3A6AB2] p-4 transition-transform
        ${
          isDisabled
            ? "opacity-60 pointer-events-none"
            : "hover:scale-105 cursor-pointer"
        }`}
                      >
                        <FutureTalkCard
                          href={
                            isDisabled ? "#" : `/futuretalk?batchId=${batch.id}`
                          }
                          isActive={isActive}
                          statusLabel={batch.status}
                          buttonText={
                            isActive
                              ? "Register Now"
                              : batch.status === "COMING_SOON"
                                ? "Coming Soon"
                                : "Closed"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </UserLayouts>
  );
}
