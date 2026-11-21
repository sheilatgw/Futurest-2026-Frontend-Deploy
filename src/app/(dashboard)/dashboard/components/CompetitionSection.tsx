import { CompeBatch } from "@/types/page/compe-batch";
import CompetitionCard from "./CompetitionCard";

type CompetitionSectionProps = {
  competition: "BCC" | "REPI" | "REII";
  activeBatches: CompeBatch[];
  userCompetitionConfig: {
    href: string;
    btnText: string;
    statusLabel: string;
    isActive: boolean;
    category?: string;
  };
  hasActiveCompetition: boolean;
  fallbackHref: string;
  isRegistered?: boolean;
};

export default function CompetitionSection({
  competition,
  activeBatches,
  userCompetitionConfig,
  hasActiveCompetition,
  fallbackHref,
  isRegistered = false,
}: CompetitionSectionProps) {
  const isRegisteredForThisCompetition = isRegistered;

  // Active batches available
  if (activeBatches.length > 0) {
    return (
      <>
        {/* Show Active Batches (Disabled if registered) */}
        {activeBatches.map((batch) => {
          if (isRegisteredForThisCompetition) {
            return (
              <div
                key={batch.id}
                className="opacity-40 pointer-events-none grayscale"
              >
                <CompetitionCard
                  competition={competition}
                  href="#"
                  buttonText="You're Registered"
                  statusLabel={batch.name}
                />
              </div>
            );
          }

          // Normal case: Not registered, can register
          return (
            <CompetitionCard
              key={batch.id}
              competition={competition}
              href={`/events/register/${competition.toLowerCase()}?batchId=${batch.id}`}
              buttonText="Register Now"
              statusLabel={batch.name}
            />
          );
        })}
      </>
    );
  }

  // No active batches - show fallback
  return (
    <div className="opacity-60">
      <CompetitionCard
        competition={competition}
        href={fallbackHref}
        buttonText="View Competition"
      />
    </div>
  );
}
