"use client";
import Typography from "@/components/typography";
import UserLayouts from "@/layouts/User/UserLayouts";
import { useEffect, useState } from "react";

// Imports Logic
import { useMinicaseBatches } from "@/hooks/use-minicase-batch";
import { useCompeBatches } from "@/hooks/use-compe-batch";
import useAuthStore from "@/stores/use-auth-store";
import { getBatchStatus } from "@/utils/getBatchMinicase";

// Components
// import FutureTalkCard from "./components/FuturetalkCard";
import CompetitionSection from "./components/CompetitionSection";
import EmptyCompetitionState from "./components/EmptyCompetitionState";
import DashboardBackground from "./components/DashboardBackground";
import CompetitionCard from "./components/CompetitionCard";

// Hooks
import {
  useCompetitionStatus,
  useMinicaseStatus,
} from "@/hooks/use-dashboard-status";

export default function UserDashboardPage() {
  // 1. DATA & STORE
  const { user } = useAuthStore();
  const { data: batches = [] } = useMinicaseBatches();
  const { data: compeBatches = [] } = useCompeBatches();

  const [isDraftingMinicase, setIsDraftingMinicase] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 2. EFFECT
  useEffect(() => {
    setIsMounted(true);
    const savedForm = localStorage.getItem("minicase_registration_form");
    if (savedForm) {
      setIsDraftingMinicase(true);
    }
  }, []);

  // 3. LOGIC BATCH (Memetakan Status)
  const batchesWithStatus =
    batches?.map((batch: any) => ({
      ...batch,
      status: getBatchStatus(batch),
    })) ?? [];

  const activeFutureTalkBatch =
    batchesWithStatus.find((b) => b.status === "OPEN") ?? null;

  // 4. LOGIC USER STATUS (Using custom hooks)
  const minicaseConfig = useMinicaseStatus(
    user,
    activeFutureTalkBatch,
    isDraftingMinicase,
  );
  const competitionConfig = useCompetitionStatus(user, compeBatches);

  const hasActiveMinicase = minicaseConfig.isActive;
  const hasActiveCompetition = competitionConfig.isActive; // Ini logic umum

  // --- LOGIC BARU: AMBIL LIST KOMPETISI TERDAFTAR DARI API ---
  const registeredCompetitions = Array.isArray(user?.competition_info)
    ? user.competition_info
    : [];
  const hasAnyRegisteredItems =
    hasActiveMinicase || registeredCompetitions.length > 0;

  // 5. LOGIC COMPETITION BATCHES (Filter active batches by category)
  const activeBCCBatches = compeBatches.filter(
    (batch) => batch.category === "BCC" && batch.is_active,
  );
  const activeREPIBatches = compeBatches.filter(
    (batch) => batch.category === "REPI" && batch.is_active,
  );
  const activeREIIBatches = compeBatches.filter(
    (batch) => batch.category === "REII" && batch.is_active,
  );

  // check if the user has ANY registration for these categories
  const isRegisteredBCC = registeredCompetitions.some(
    (c: any) => c.competition_name === "BCC",
  );
  const isRegisteredREPI = registeredCompetitions.some(
    (c: any) => c.competition_name === "REPI",
  );
  const isRegisteredREII = registeredCompetitions.some(
    (c: any) => c.competition_name === "REII",
  );

  if (!isMounted) return null;

  return (
    <UserLayouts withNavbar withSidebar>
      <main className="relative min-h-screen w-full pt-12 pb-32 md:py-20">
        {/* === BACKGROUNDS & ORNAMENTS === */}
        <DashboardBackground />

        {/* === MAIN CONTENT === */}
        <section className="relative z-10 flex w-full items-center justify-center p-4">
          <div className="relative w-[95%] md:w-[85%]">
            {/* Mobile Yellow Layer */}
            <div
              className="absolute inset-0 bg-[#FFCE21] rounded-[16px] -rotate-[1.7deg] shadow-md md:hidden pointer-events-none"
              style={{ height: "100%" }}
            ></div>

            {/* White Container */}
            <div className="relative flex flex-col items-center bg-[#FFFFFF] shadow-lg w-full min-h-[85vh] rounded-[16px] md:rounded-[12px] p-6 md:p-12 md:pb-32">
              <div className="flex flex-col items-center w-full">
                <Typography
                  variant="h1"
                  weight="bold"
                  font="Titillium"
                  className="mt-10 md:mt-20 text-[#0B8457] text-center w-full max-w-[1060px]"
                >
                  My Competitions
                </Typography>

                <div className="mt-12 md:mt-16 w-full flex flex-wrap justify-center gap-6 md:gap-8">
                  {/* futuretalk disabled */}
                  {/* {hasActiveMinicase && (
                    <div className="w-full max-w-[320px] md:max-w-[400px]">
                      <div className="relative w-full aspect-[295/250] md:aspect-[250/260] bg-[#3A6AB2] rounded-[15px] shadow-[0px_2px_10px_rgba(0,0,0,0.3)] overflow-hidden transition-transform hover:scale-105 cursor-pointer">
                        <FutureTalkCard
                          href={minicaseConfig.href}
                          isActive={true}
                          statusLabel={minicaseConfig.statusLabel}
                          buttonText={minicaseConfig.btnText}
                        />
                      </div>
                    </div>
                  )} */}

                  {/* 2. KARTU KOMPETISI (Looping dari Array API) */}
                  {registeredCompetitions.length > 0 &&
                    registeredCompetitions.map((comp: any, index: number) => (
                      <div
                        key={index}
                        className="w-full max-w-[240px] md:max-w-[320px]"
                      >
                        {/* Kita panggil langsung CompetitionCard biar fleksibel */}
                        <CompetitionCard
                          competition={
                            comp.competition_name as "BCC" | "REPI" | "REII"
                          }
                          // Logic href disesuaikan: ke dashboard tim
                          href={`/dashboard/${comp.competition_name.toLowerCase()}?team_id=${comp.team_id}`}
                          statusLabel={comp.status.replace("_", " ")} // Biar rapi: PAYMENT_VERIFICATION -> PAYMENT VERIFICATION
                          buttonText="Go to Dashboard"
                          isRegistered={true}
                        />
                      </div>
                    ))}

                  {/* 3. EMPTY STATE (Jika Minicase ga ada DAN Kompetisi ga ada) */}
                  {!hasAnyRegisteredItems && (
                    <div className="text-center">
                      <EmptyCompetitionState />
                    </div>
                  )}
                </div>

                {/* === BOTTOM SECTION (ENROLL) === */}
                <div className="mt-20 md:mt-32 w-full flex flex-col items-center text-center">
                  <Typography
                    variant="h5"
                    weight="bold"
                    font="Titillium"
                    className="text-[#71717A] mb-12 max-w-[456px]"
                  >
                    Enroll yourself in the following competition!
                  </Typography>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-[1240px]">
                    {/* BCC CARD */}
                    <CompetitionSection
                      competition="BCC"
                      activeBatches={activeBCCBatches}
                      userCompetitionConfig={competitionConfig}
                      hasActiveCompetition={hasActiveCompetition}
                      fallbackHref="/competitions/bcc"
                      isRegistered={isRegisteredBCC}
                    />

                    {/* REPI CARD */}
                    <CompetitionSection
                      competition="REPI"
                      activeBatches={activeREPIBatches}
                      userCompetitionConfig={competitionConfig}
                      hasActiveCompetition={hasActiveCompetition}
                      fallbackHref="/competitions/repi"
                      isRegistered={isRegisteredREPI}
                    />

                    {/* REII CARD */}
                    <CompetitionSection
                      competition="REII"
                      activeBatches={activeREIIBatches}
                      userCompetitionConfig={competitionConfig}
                      hasActiveCompetition={hasActiveCompetition}
                      fallbackHref="/competitions/reii"
                      isRegistered={isRegisteredREII}
                    />

                    {/* futuretalk disabled */}
                    {/* {!hasActiveMinicase &&
                      batchesWithStatus.map((batch) => {
                        const isActive = batch.status === "OPEN";
                        const isDisabled = !isActive;
                        return (
                          <div
                            key={batch.id}
                            className={`relative w-full aspect-[295/195] md:aspect-[250/260] bg-[#3A6AB2] 
                            rounded-[15px] shadow-[0px_2px_10px_rgba(0,0,0,0.3)] 
                            flex flex-col items-center justify-center p-4 overflow-hidden transition-transform 
                            ${
                              isDisabled
                                ? "opacity-60 pointer-events-none"
                                : "hover:scale-105 cursor-pointer"
                            }`}
                          >
                            <FutureTalkCard
                              href={
                                isDisabled
                                  ? "#"
                                  : `/futuretalk?batchId=${batch.id}`
                              }
                              isActive={false}
                              statusLabel={
                                batch.status === "OPEN"
                                  ? `Batch ${batch.batch_number}`
                                  : `Batch ${batch.batch_number} Closed`
                              }
                              labelName={batch.name}
                              buttonText={
                                batch.status === "OPEN"
                                  ? "Register Now"
                                  : batch.status === "COMING_SOON"
                                    ? "Coming Soon"
                                    : "Closed"
                              }
                            />
                          </div>
                        );
                      })} */}

                    {/* {!hasActiveMinicase && (batches?.length || 0) === 0 && (
                      <div className="relative w-full aspect-[295/195] md:aspect-[250/260] bg-[#3A6AB2] rounded-[15px] flex items-center justify-center opacity-60">
                        <Typography variant="h6" className="text-white">
                          FutureTalk Coming Soon
                        </Typography>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </UserLayouts>
  );
}
