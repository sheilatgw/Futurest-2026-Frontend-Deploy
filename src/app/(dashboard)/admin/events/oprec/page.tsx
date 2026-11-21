"use client";

import BreadcrumbGroup from "@/components/breadcrumb";
import Typography from "@/components/typography";
import { useDivisionCount } from "@/hooks/use-get-staff";
import AdminLayouts from "@/layouts/Admin/AdminLayouts";
import toast from "react-hot-toast";
import DashboardGrid, {
  DashboardGridSkeleton,
} from "../../_components/grid-card-components";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useDivisionCount();
  const BREADCRUMBS = [
    { name: "Dashboard Admin", href: "/admin" },
    { name: "Open Recruitment", href: "/admin" },
  ];

  if (isLoading) return <DashboardGridSkeleton />;
  if (isError) toast.error("Failed to load division data");

  return (
    <AdminLayouts withNavbar={true} withSidebar={true}>
      <div className="p-6 ">
        <Typography
          font="FiraSans"
          variant="h3"
          weight="heavy-compressed"
          className="text-[#3454D1] mb-4 "
        >
          Open Recruitment
        </Typography>
        <BreadcrumbGroup items={BREADCRUMBS} />
      </div>
      <DashboardGrid data={data} />
    </AdminLayouts>
  );
}
