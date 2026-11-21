"use client";
import { useParams } from "next/navigation";
import DashboardContainer from "./_components/dashboard-container";
import { DashboardPage } from "./_components/registrant-page";

export default function page() {
  const params = useParams();
  return (
    <DashboardContainer
      id={params?.staffDetail?.toString()}
      title="Staff Detail"
    >
      <DashboardPage id={params?.staffDetail?.toString() ?? ""} />
    </DashboardContainer>
  );
}
