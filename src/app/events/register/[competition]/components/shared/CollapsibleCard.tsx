"use client";

import React, { useState } from "react";
import Typography from "@/components/typography";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleCard({
  title,
  children,
  defaultOpen = true,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full mb-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-6 md:p-8 bg-[#0F936D] text-white transition-all duration-300 rounded-[16px] z-10 relative",
          isOpen && "rounded-b-none",
        )}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <Typography
            font="Sora"
            className="text-xl md:text-3xl font-bold text-left text-white"
          >
            {title}
          </Typography>
        </div>
        <div className="text-white shrink-0">
          {isOpen ? (
            <ChevronUp size={32} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={32} strokeWidth={2.5} />
          )}
        </div>
      </button>

      <div
        className={cn(
          "transition-all duration-500 ease-in-out bg-[#f8f9fa] border-x border-b border-gray-200 rounded-b-[16px] -mt-1",
          isOpen
            ? "max-h-[5000px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
