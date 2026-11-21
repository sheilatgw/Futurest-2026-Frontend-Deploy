"use client";

import Button from "@/components/buttons/button";
import UnstyledLink from "@/components/links/unstyled-link";
import Typography from "@/components/typography";
import { useDivisionCount } from "@/hooks/use-get-staff";
import { removeToken } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/use-auth-store";
import {
  BookOpen,
  BookText,
  Briefcase,
  BriefcaseBusiness,
  ChevronsLeft,
  Home,
  Lamp,
  LogOut,
  PersonStanding,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const ADMIN_LINKS_BASE = [
  {
    name: "Open Recruitment",
    icon: Briefcase,
    href: "#",
    children: [{ name: "Future Talk", href: "/admin/events/futuretalk" }],
  },
];

export default function SidebarAdmin() {
  const { data } = useDivisionCount();
  const ADMIN_LINKS = useMemo(() => {
    if (!data) return ADMIN_LINKS_BASE;

    return [
      {
        ...ADMIN_LINKS_BASE[0],
        children: data.map((item) => ({
          name: item.title,
          href: `/admin/${item.id}`,
        })),
      },
    ];
  }, [data]);

  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  // Toggle group visibility
  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((name) => name !== groupName)
        : [...prev, groupName],
    );
  };

  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    removeToken();
    router.push("/");
  };

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Aman, tidak berubah) --- */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "hidden lg:flex flex-col fixed left-0 z-20 bg-white",
          "top-[100px] py-6",
          "border-y border-r border-gray-200 shadow-sm rounded-r-2xl",
          "transition-[width] duration-300 ease-in-out will-change-[width] overflow-hidden",
          isHovered ? "w-64" : "w-[84px]",
        )}
        style={{ height: "fit-content", minHeight: "500px" }}
      >
        <div className="flex items-center justify-between px-6 mb-6">
          <div
            className={cn(
              "whitespace-nowrap overflow-hidden transition-all duration-300",
              isHovered ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0",
            )}
          >
            <Typography
              font="FiraSans"
              className="text-2xl font-bold text-black"
            >
              Dashboard
            </Typography>
          </div>
          <div className="flex items-center justify-center w-full lg:w-auto">
            <ChevronsLeft className="w-6 h-6 text-[#FFCE21]" />
          </div>
        </div>

        <div className="flex flex-col w-full flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {/* Static Menus Desktop */}
          <UnstyledLink
            href="/admin"
            className={cn(
              "flex items-center h-12 w-full transition-colors duration-200 group relative mb-2",
              pathname === "/admin" || pathname === "/admin/dashboard"
                ? "bg-[#354FB4]"
                : "hover:bg-neutral-100",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <Home
                className={cn(
                  "w-6 h-6",
                  pathname === "/admin" || pathname === "/admin/dashboard"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              />
            </div>
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                font="Sora"
                weight="bold"
                className={cn(
                  "ml-4",
                  pathname === "/admin" || pathname === "/admin/dashboard"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              >
                Dashboard Admin
              </Typography>
            </div>
          </UnstyledLink>

          <UnstyledLink
            href="/admin/events/futuretalk"
            className={cn(
              "flex items-center h-12 w-full transition-colors duration-200 group relative mb-2",
              pathname === "/admin/events/futuretalk"
                ? "bg-[#354FB4]"
                : "hover:bg-neutral-100",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <BookOpen
                className={cn(
                  "w-6 h-6",
                  pathname === "/admin/events/futuretalk"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              />
            </div>
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                font="Sora"
                weight="bold"
                className={cn(
                  "ml-4",
                  pathname === "/admin/events/futuretalk"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              >
                Futuretalk
              </Typography>
            </div>
          </UnstyledLink>

          {/* <UnstyledLink
            href="/admin/events/ba"
            className={cn(
              "flex items-center h-12 w-full transition-colors duration-200 group relative mb-2",
              pathname === "/admin/events/ba"
                ? "bg-[#354FB4]"
                : "hover:bg-neutral-100",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <PersonStanding
                className={cn(
                  "w-6 h-6",
                  pathname === "/admin/events/ba"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              />
            </div>
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                font="Sora"
                weight="bold"
                className={cn(
                  "ml-4",
                  pathname === "/admin/events/ba"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              >
                Brand Ambassador
              </Typography>
            </div>
          </UnstyledLink> */}
          <UnstyledLink
            href="/admin/events/reii"
            className={cn(
              "flex items-center h-12 w-full transition-colors duration-200 group relative mb-2",
              pathname === "/admin/events/reii"
                ? "bg-[#354FB4]"
                : "hover:bg-neutral-100",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <Lamp
                className={cn(
                  "w-6 h-6",
                  pathname === "/admin/events/reii"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              />
            </div>
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                font="Sora"
                weight="bold"
                className={cn(
                  "ml-4",
                  pathname === "/admin/events/reii"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              >
                REII
              </Typography>
            </div>
          </UnstyledLink>
          <UnstyledLink
            href="/admin/events/repi"
            className={cn(
              "flex items-center h-12 w-full transition-colors duration-200 group relative mb-2",
              pathname === "/admin/events/repi"
                ? "bg-[#354FB4]"
                : "hover:bg-neutral-100",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <BookText
                className={cn(
                  "w-6 h-6",
                  pathname === "/admin/events/repi"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              />
            </div>
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                font="Sora"
                weight="bold"
                className={cn(
                  "ml-4",
                  pathname === "/admin/events/repi"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              >
                REPI
              </Typography>
            </div>
          </UnstyledLink>
          <UnstyledLink
            href="/admin/events/bcc"
            className={cn(
              "flex items-center h-12 w-full transition-colors duration-200 group relative mb-2",
              pathname === "/admin/events/bcc"
                ? "bg-[#354FB4]"
                : "hover:bg-neutral-100",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <BriefcaseBusiness
                className={cn(
                  "w-6 h-6",
                  pathname === "/admin/events/bcc"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              />
            </div>
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                font="Sora"
                weight="bold"
                className={cn(
                  "ml-4",
                  pathname === "/admin/events/bcc"
                    ? "text-white"
                    : "text-[#354FB4]",
                )}
              >
                BCC
              </Typography>
            </div>
          </UnstyledLink>

          {/* Dynamic Groups Desktop */}
          {/* {ADMIN_LINKS.map((group) => {
            const isOpen = openGroups.includes(group.name);

            return (
              <div key={group.name} className="flex flex-col mt-2">
                <Button
                  variant="ghost"
                  onClick={() => toggleGroup(group.name)}
                  className={cn(
                    "flex items-center h-10 w-full px-0 hover:bg-neutral-100 rounded-none transition-colors",
                    "justify-start",
                  )}
                >
                  <div className="w-[84px] flex justify-center shrink-0">
                    <group.icon className="w-6 h-6 text-[#354FB4]" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center justify-between flex-1 pr-4 overflow-hidden transition-all duration-300",
                      isHovered
                        ? "opacity-100 max-w-[200px]"
                        : "opacity-0 max-w-0",
                    )}
                  >
                    <Typography
                      font="Sora"
                      weight="bold"
                      className="text-[#354FB4] text-sm whitespace-nowrap"
                    >
                      {group.name}
                    </Typography>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-[#354FB4] ml-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#354FB4] ml-2" />
                    )}
                  </div>
                </Button> */}

          {/* <div
                  className={cn(
                    "flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {group.children.map((child) => (
                    <UnstyledLink
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "flex items-center h-10 w-full transition-all duration-200 group hover:bg-neutral-50",
                        isHovered ? "pl-[30px]" : "pl-0",
                      )}
                    >
                      <div className="w-[84px] flex justify-center shrink-0 relative">
                        <Briefcase className="w-5 h-5 text-[#9E9E9E]" />
                      </div>
                      <div
                        className={cn(
                          "whitespace-nowrap overflow-hidden transition-opacity duration-300",
                          isHovered ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <Typography
                          font="Sora"
                          className="text-[#9E9E9E] font-medium text-sm"
                        >
                          {child.name}
                        </Typography>
                      </div>
                    </UnstyledLink>
                  ))}
                </div> */}
          {/* </div>
            );
          })} */}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={cn(
              "flex items-center w-full h-12 rounded-none transition-colors duration-200",
              "text-[#FF4444] hover:bg-red-50",
            )}
          >
            <div className="w-[84px] flex justify-center shrink-0">
              <LogOut className="w-6 h-6 text-[#FF4444]" />
            </div>

            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Typography
                variant="t"
                weight="bold"
                font="Sora"
                className="text-[#FF4444] ml-4"
              >
                Log Out
              </Typography>
            </div>
          </Button>
        </div>
      </aside>

      {/* --- MOBILE NAVIGATION (UPDATED) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 z-20 w-full bg-white border-t border-gray-200 px-6 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-2xl overflow-x-auto custom-scrollbar">
        <div className="flex flex-row justify-between items-center min-w-max gap-4 md:justify-center md:gap-8">
          {/* 1. Dashboard Admin */}
          <UnstyledLink
            href="/admin"
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div
              className={cn(
                "p-2.5 rounded-xl transition-all",
                pathname === "/admin" || pathname === "/admin/dashboard"
                  ? "bg-[#354FB4] text-white"
                  : "text-neutral-600 hover:bg-neutral-50",
              )}
            >
              <Home className="w-6 h-6" />
            </div>
          </UnstyledLink>

          {/* 2. Future Talk */}
          <UnstyledLink
            href="/admin/events/futuretalk"
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div
              className={cn(
                "p-2.5 rounded-xl transition-all",
                pathname === "/admin/events/futuretalk"
                  ? "bg-[#354FB4] text-white"
                  : "text-neutral-600 hover:bg-neutral-50",
              )}
            >
              <BookOpen className="w-6 h-6" />
            </div>
          </UnstyledLink>

          {/* 3. Brand Ambassador */}
          <UnstyledLink
            href="/admin/events/ba"
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div
              className={cn(
                "p-2.5 rounded-xl transition-all",
                pathname === "/admin/events/ba"
                  ? "bg-[#354FB4] text-white"
                  : "text-neutral-600 hover:bg-neutral-50",
              )}
            >
              <PersonStanding className="w-6 h-6" />
            </div>
          </UnstyledLink>

          {/* 4. Dynamic Groups (POPUP MENU) */}
          {ADMIN_LINKS.map((group) => {
            const isOpen = openGroups.includes(group.name);
            const isActive = group.children.some(
              (child) => child.href === pathname,
            );

            return (
              <div
                key={group.name}
                className="relative flex flex-col items-center justify-center min-w-[60px]"
              >
                {/* BACKDROP & MENU POPUP (Muncul jika isOpen = true) */}
                {isOpen && (
                  <>
                    {/* Backdrop untuk close kalau klik sembarang */}
                    <div
                      className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
                      onClick={() => toggleGroup(group.name)}
                    />

                    {/* Menu Card Floating di Atas Navbar */}
                    <div className="fixed bottom-[85px] left-4 right-4 z-40 flex flex-col gap-1 rounded-2xl bg-white p-2 shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-5 fade-in duration-200">
                      <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                        {group.name}
                      </div>
                      <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                        {group.children.map((child) => (
                          <UnstyledLink
                            key={child.name}
                            href={child.href}
                            // Close menu pas link diklik
                            onClick={() => toggleGroup(group.name)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-sm font-medium",
                              pathname === child.href
                                ? "bg-[#354FB4] text-white"
                                : "text-gray-600 hover:bg-gray-50",
                            )}
                          >
                            <Briefcase
                              className={cn(
                                "w-4 h-4",
                                pathname === child.href
                                  ? "text-white"
                                  : "text-gray-400",
                              )}
                            />
                            {child.name}
                          </UnstyledLink>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* TOGGLE BUTTON */}
                <Button
                  variant="ghost"
                  onClick={() => toggleGroup(group.name)}
                  className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent"
                >
                  <div
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      isActive || isOpen
                        ? "bg-[#354FB4] text-white"
                        : "text-neutral-600 hover:bg-neutral-50",
                    )}
                  >
                    <group.icon className="w-6 h-6" />
                  </div>
                </Button>
              </div>
            );
          })}

          {/* 5. Logout */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 min-w-[60px] h-auto p-0 hover:bg-transparent"
          >
            <div className="p-2.5 rounded-xl text-[#FF4444] hover:bg-red-50 transition-colors">
              <LogOut className="w-6 h-6" />
            </div>
          </Button>
        </div>
      </nav>
    </>
  );
}
