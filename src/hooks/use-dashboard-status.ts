import { CompeBatch } from "@/types/page/compe-batch";
import { User } from "@/types/entity/user";

export type CompetitionConfig = {
  href: string;
  btnText: string;
  statusLabel: string;
  isActive: boolean;
  category?: string;
};

export function useCompetitionStatus(
  user: User | null,
  compeBatches: CompeBatch[],
): CompetitionConfig {
  // Get the first registered competition from the array
  const userCompetition = user?.competition_info?.find(
    (comp) => comp.is_registered,
  );

  const isCompetitionRegistered = !!userCompetition;
  const competitionStatus = userCompetition?.status;
  const userCompetitionBatchId = userCompetition?.batch_id;
  const competitionName = userCompetition?.competition_name;

  // Determine which competition the user is registered for
  const userCompetitionBatch = compeBatches.find(
    (batch) => batch.id === userCompetitionBatchId,
  );
  const userCompetitionCategory =
    userCompetitionBatch?.category || competitionName; // "BCC", "REPI", or "REII"

  let competitionConfig: CompetitionConfig = {
    href: "",
    btnText: "Register Now",
    statusLabel: "",
    isActive: false,
    category: userCompetitionCategory,
  };

  if (isCompetitionRegistered && userCompetitionCategory) {
    if (competitionStatus === "PENDING_PAYMENT") {
      competitionConfig = {
        href: `/events/register/${userCompetitionCategory.toLowerCase()}`,
        btnText: "Complete Payment",
        statusLabel: "Pending Payment",
        isActive: true,
        category: userCompetitionCategory,
      };
    } else {
      competitionConfig = {
        href: `/dashboard/${userCompetitionCategory.toLowerCase()}`,
        btnText: "Go to Dashboard",
        statusLabel: "Registered",
        isActive: true,
        category: userCompetitionCategory,
      };
    }
  }

  return competitionConfig;
}

export type MinicaseConfig = {
  href: string;
  btnText: string;
  statusLabel: string;
  isActive: boolean;
};

export function useMinicaseStatus(
  user: User | null,
  activeFutureTalkBatch: any,
  isDraftingMinicase: boolean,
): MinicaseConfig {
  const isRegistered = !!user?.minicase_info?.is_registered;
  const participantStatus = user?.minicase_info?.participant_info?.status;

  let minicaseConfig: MinicaseConfig = {
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

  return minicaseConfig;
}
