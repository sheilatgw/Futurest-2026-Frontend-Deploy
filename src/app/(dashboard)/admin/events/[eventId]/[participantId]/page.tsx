"use client";

import { useParams } from "next/navigation";

import DashboardContainerDetail from "../_components/dashboard-container";
import { EventDetailPage as EventDetailPageComponent } from "../_components/event-detail-page";

export default function EventParticipantDetail() {
  const params = useParams();

  const participantId = params.participantId as string;

  return (
    <DashboardContainerDetail
      id={participantId}
      title="Futurest Business Case Competition (FBCC)"
    >
      <EventDetailPageComponent id={participantId} />
    </DashboardContainerDetail>
  );
}
