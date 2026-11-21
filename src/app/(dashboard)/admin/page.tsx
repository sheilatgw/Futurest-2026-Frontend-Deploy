"use client";

import Typography from "@/components/typography";
import { useEventCount } from "@/hooks/use-get-events-count";
import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import toast from "react-hot-toast";
import DashboardGridNew, {
  DashboardGridSkeleton,
} from "./_components/grid-card-new";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useEventCount();

  if (isLoading) return <DashboardGridSkeleton />;
  if (isError) toast.error("Failed to load division data");

  return (
    <AdminLayouts withNavbar={true} withSidebar={true}>
      <div className="p-6 ">
        <Typography
          font="Titillium"
          variant="h1"
          weight="black"
          className="text-[#3454D1] mb-2.5"
        >
          FUTUREST <span className="text-[#FFC533]">2026</span>
        </Typography>
        <Typography
          font="Sora"
          variant="h3"
          weight="extrabold"
          className="text-[#000000]"
        >
          Dashboard
        </Typography>
      </div>
      <DashboardGridNew data={data} />
    </AdminLayouts>
  );
}
