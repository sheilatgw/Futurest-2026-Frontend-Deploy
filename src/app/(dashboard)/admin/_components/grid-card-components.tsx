"use client";

import { DashboardData } from "@/hooks/use-get-staff";
import { useRouter } from "next/navigation";
import DashboardCard from "./dashboard-card";

interface DashboardGridProps {
  data: DashboardData[];
  onCardClick?: (division: string) => void;
}

export default function DashboardGrid({
  data,
  onCardClick,
}: DashboardGridProps) {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, i) => (
          <DashboardCard
            key={i}
            title={item.title}
            count={item.count}
            color={i % 2 === 0 ? "blue" : "red"}
            onClick={() => {
              onCardClick?.(item.subdivision);
              router.push(
                `/admin/${item.id.toLowerCase().replace(/\s+/g, "-")}`,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
export function DashboardGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 bg-muted animate-pulse h-[180px] flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-8 bg-gray-300 rounded w-1/3" />
            </div>
            <div className="h-6 bg-gray-300 rounded w-2/5 self-end" />
          </div>
        ))}
      </div>
    </div>
  );
}
