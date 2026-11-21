"use client";

import Button from "@/components/buttons/button";
import UnstyledLink from "@/components/links/unstyled-link";
import Typography from "@/components/typography";
import { events } from "@/contents/DataNavigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SidebarUser() {
  const pathname = usePathname();
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  // sementara buat logout
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      {/* desktop */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "hidden lg:flex flex-col fixed left-0 z-20 bg-white",
          "top-[150px] h-[192px] py-4",
          "border-y border-r border-gray-200 shadow-sm rounded-r-2xl",
          "transition-[width] duration-300 ease-in-out will-change-[width]",
          isHovered ? "w-64" : "w-[84px]",
        )}
      >
        {/* Menu Items */}
        <div className="flex flex-col gap-2 px-3 flex-1 overflow-y-auto overflow-x-hidden">
          {events.map((link) => {
            const isActive = pathname === link.href;

            return (
              <UnstyledLink
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center rounded-xl transition-colors duration-200 group relative",
                  "h-12",
                  "pl-[18px]",

                  isActive
                    ? "bg-[#354FB4] text-white shadow-md"
                    : "text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600",
                )}
              >
                <div className="flex items-center justify-center shrink-0">
                  <link.icon
                    className={cn(
                      "w-6 h-6 transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-neutral-400 group-hover:text-neutral-600",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                    isHovered
                      ? "max-w-[150px] opacity-100 ml-4 translate-x-0"
                      : "max-w-0 opacity-0 ml-0 -translate-x-2",
                  )}
                >
                  <Typography
                    variant="t"
                    weight="bold"
                    font="Sora"
                    className={cn(
                      isActive
                        ? "text-white"
                        : "text-neutral-400 group-hover:text-neutral-600",
                    )}
                  >
                    {link.name}
                  </Typography>
                </div>
              </UnstyledLink>
            );
          })}
        </div>

        <div className="px-3 mt-auto">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={cn(
              "flex items-center rounded-xl w-full h-12 pl-[18px] transition-colors duration-200",
              "text-[#FF4444] hover:bg-red-200",
            )}
          >
            <div className="flex items-center justify-center shrink-0">
              <LogOut className="w-6 h-6 text-[#FF4444]" />
            </div>

            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                isHovered
                  ? "max-w-[150px] opacity-100 ml-4 translate-x-0"
                  : "max-w-0 opacity-0 ml-0 -translate-x-2",
              )}
            >
              <Typography
                variant="t"
                weight="bold"
                font="Sora"
                className="text-[#FF4444]"
              >
                Log Out
              </Typography>
            </div>
          </Button>
        </div>
      </aside>

      {/* mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 z-20 w-full bg-white border-t border-gray-200 px-6 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-2xl">
        <div className="flex flex-row justify-between items-center">
          {events.map((link) => {
            const isActive = pathname === link.href;
            return (
              <UnstyledLink
                key={link.name}
                href={link.href}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isActive
                      ? "bg-[#354FB4] text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-800",
                  )}
                >
                  <link.icon className="w-6 h-6" />
                </div>
              </UnstyledLink>
            );
          })}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex flex-col items-center gap-1"
          >
            <div className="p-2.5 rounded-xl text-[#FF4444] hover:bg-red-50">
              <LogOut className="w-6 h-6" />
            </div>
          </Button>
        </div>
      </nav>
    </>
  );
}
