"use client";

import { useCompetitionBatches } from "@/hooks/use-competition-batches";
import { useCompetitionData } from "@/hooks/use-competition-data";
import { useCompetitionRegistration } from "@/hooks/use-competition-registration";
import useAuthStore from "@/stores/use-auth-store";
import { CompetitionTeam as RegistCompetitionTeam } from "@/types/page/regist-competition";
import { CompetitionTeam as CompetitionCompetitionTeam } from "@/types/page/competition";
import { getBatchStatus } from "@/utils/getBatchCompetition";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

import BCCRegistration from "./components/bcc/Registration";
import REIIRegistration from "./components/reii/Registration";
import REPIRegistration from "./components/repi/Registration";

const COMPETITIONS = ["reii", "bcc", "repi"];

export default function CompetitionPage({
  params,
}: {
  params: Promise<{ competition: string }>;
}) {
  const { competition } = use(params);

  /*
   * Validation: Ensure the competition slug is valid.
   * If strictly not found, calling notFound() is appropriate.
   * However, since this is a client component, explicit check is good.
   */
  if (!COMPETITIONS.includes(competition)) {
    notFound();
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const batchId = searchParams.get("batchId");
  const { user } = useAuthStore();

  const { data: batches, isLoading: isBatchesLoading } = useCompetitionBatches({
    category: competition.toUpperCase(),
    is_active: true,
  });

  // Get the first registered competition from the array
  const userCompetition = user?.competition_info?.find(
    (comp) =>
      comp.is_registered && comp.competition_name === competition.toUpperCase(),
  );

  const isPendingPayment = userCompetition?.status === "PENDING_PAYMENT";
  const savedTeamIdFromAuth = userCompetition?.team_id;

  const storageKey = `${competition}_team_id`;
  const savedTeamIdFromStorage =
    typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
  const savedTeamId = savedTeamIdFromAuth || savedTeamIdFromStorage;

  const [teamData, setTeamData] = useState<RegistCompetitionTeam | null>(null);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(
    savedTeamId || null,
  );

  const { data: teamDataFromGet } = useCompetitionData(currentTeamId);

  // Helper to convert CompetitionCompetitionTeam to RegistCompetitionTeam
  function convertCompetitionTeam(
    team: CompetitionCompetitionTeam | null,
  ): RegistCompetitionTeam | null {
    if (!team) return null;
    // Map members to add missing fields with default values
    return {
      ...team,
      // Explicitly cast status to CompetitionStatus to satisfy the type checker
      status: team.status as RegistCompetitionTeam["status"],
      members: team.members.map((member: any) => ({
        ...member,
        ig_story: member.ig_story ?? "",
        poster_sharing: member.poster_sharing ?? "",
      })),
    };
  }

  const { methods, submitForm, isLoading, isSuccess, isError } =
    useCompetitionRegistration();

  const handleFinalSubmit = async () => {
    if (!batchId) {
      toast.error("Batch ID not found. Please select a batch first.");
      throw new Error("Batch ID not found");
    }

    const response = await submitForm();
    if (response && response.id) {
      setTeamData(response);
      setCurrentTeamId(response.id);
      localStorage.setItem(storageKey, response.id);
      localStorage.setItem(`${competition}_team_status`, "PENDING_PAYMENT");
    }
  };

  const resetError = () => {
    methods.clearErrors();
  };

  useEffect(() => {
    if (isBatchesLoading || !batchId) return;

    if (batches) {
      const selectedBatch = batches.find((b) => b.id === batchId);

      if (!selectedBatch) {
        toast.error("Invalid Batch ID");
        router.push(`/events/${competition}`);
        return;
      }

      const batchStatus = getBatchStatus(selectedBatch);

      if (batchStatus === "CLOSED") {
        toast.error("This batch is already closed for registration");
        router.push(`/events/${competition}`);
        return;
      }

      if (batchStatus === "COMING_SOON") {
        toast.error("This batch is not yet open for registration");
        router.push(`/events/${competition}`);
        return;
      }
    }
  }, [batchId, batches, isBatchesLoading, router, competition]);

  if (!batchId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Batch Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please select a competition batch from the dashboard first.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-[#3A6AB2] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#2c528a] transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const renderRegistration = () => {
    const props = {
      isLoading,
      isSuccess,
      isError,
      onNext: handleFinalSubmit,
      resetError,
      teamData:
        teamData ??
        (convertCompetitionTeam(
          teamDataFromGet as CompetitionCompetitionTeam | null,
        ) as RegistCompetitionTeam | null) ??
        null,
      isPendingPayment,
    };

    switch (competition) {
      case "reii":
        return <REIIRegistration {...props} />;
      case "bcc":
        return <BCCRegistration {...props} />;
      case "repi":
        return <REPIRegistration {...props} />;
      default:
        return null;
    }
  };

  return (
    <Suspense
      fallback={<div className="text-center p-10">Loading form...</div>}
    >
      <FormProvider {...methods}>{renderRegistration()}</FormProvider>
    </Suspense>
  );
}
