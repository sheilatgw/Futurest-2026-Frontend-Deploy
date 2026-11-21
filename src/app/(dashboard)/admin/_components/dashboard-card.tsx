"use client";

import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  color?: "blue" | "red";
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  count,
  color = "blue",
  onClick,
}: DashboardCardProps) {
  const isBlue = color === "blue";

  return (
    <div
      className={cn(
        "rounded-2xl p-8 flex flex-col justify-between transition-all shadow-sm hover:shadow-md",
        isBlue ? "bg-blue-600 text-white" : "bg-red-500 text-white",
      )}
    >
      <div>
        <Typography
          font="Sora"
          variant="h6"
          className="text-white mb-2"
          weight="medium"
        >
          {title}
        </Typography>
        <Typography
          font="Sora"
          weight="bold"
          className="text-white"
          variant="h1"
        >
          {count}
        </Typography>
      </div>

      <Button
        onClick={onClick}
        className={cn(
          "mt-4 flex items-center ring-none border-none justify-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all font-sora",
          isBlue
            ? "bg-blue-100 hover:bg-blue-600"
            : "bg-red-100 hover:bg-red-600",
          isBlue ? "text-blue-600 " : "text-red-600 ",
        )}
      >
        Details <ArrowRight size={16} />
      </Button>
    </div>
  );
}
