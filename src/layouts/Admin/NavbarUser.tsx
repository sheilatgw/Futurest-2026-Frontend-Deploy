"use client";

import IconButton from "@/components/buttons/icon-button";
import UnstyledLink from "@/components/links/unstyled-link";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { events } from "@/contents/DataNavigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDown, LogOut, Send, User2, X } from "lucide-react";
// import { signOut, useSession } from 'next-auth/react'

import Button from "@/components/buttons/button";
import { removeToken } from "@/lib/cookies";
import useAuthStore from "@/stores/use-auth-store";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const showNav = () => setIsOpen(!isOpen);

  // Dummy
  const session = {
    user: {
      name: "User Preview",
      email: "user@example.com",
      image: null,
    },
  };

  // const { data: session } = useSession()

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  // sementara buat logout
  const handleLogout = async () => {
    logout();
    removeToken();
    // await signOut({ redirect: true, callbackUrl: '/' })
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-white border-b border-neutral-100 py-[15px] shadow-md rounded-b-[16px] transition-all duration-300">
      <div
        className={cn(
          "w-full px-[28px] flex items-center justify-between",
          "h-[40px] md:h-[65px]",
        )}
      >
        <div className="flex items-center gap-4">
          <UnstyledLink
            href="/dashboard"
            className="relative flex items-center"
          >
            <NextImage
              src="/logo-futurest-26.svg"
              alt="logo futurest"
              width={50}
              height={50}
              className="object-contain"
            />
          </UnstyledLink>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-8">
          <nav>
            <ul className="flex flex-row gap-8 items-center">
              <li className="group relative">
                <UnstyledLink href="/about">
                  <Typography
                    font="Sora"
                    variant="t"
                    weight="bold"
                    className="text-neutral-500 hover:text-green-600 transition-colors"
                  >
                    About Us
                  </Typography>
                </UnstyledLink>
              </li>

              <li className="group relative z-50">
                <Menu className="relative" as="div">
                  <MenuButton className="focus:outline-none">
                    {({ open }: { open: boolean }) => (
                      <Typography
                        font="Sora"
                        variant="t"
                        weight="bold"
                        className="text-neutral-500 flex flex-row gap-1 items-center hover:text-green-600 transition-colors"
                      >
                        Our Events
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            open && "rotate-180",
                          )}
                        />
                      </Typography>
                    )}
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 origin-top bg-white divide-y divide-neutral-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                      {events
                        ?.filter((e) => e.name !== "Dashboard")
                        .map(({ name, href }) => (
                          <MenuItem key={name}>
                            {({ active }: { active: boolean }) => (
                              <UnstyledLink
                                href={href}
                                className={cn(
                                  "group flex w-full items-center rounded-lg px-3 py-2 text-sm text-neutral-700 font-medium",
                                  active && "bg-green-50 text-green-600",
                                )}
                              >
                                {name}
                              </UnstyledLink>
                            )}
                          </MenuItem>
                        ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </li>

              <li className="group relative">
                <UnstyledLink href="/merchandise">
                  <Typography
                    font="Sora"
                    variant="t"
                    weight="bold"
                    className="text-neutral-500 hover:text-green-600 transition-colors"
                  >
                    Merchandise
                  </Typography>
                </UnstyledLink>
              </li>

              <li className="group relative">
                <UnstyledLink
                  href="https://sre-its.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography
                    font="Sora"
                    variant="t"
                    weight="bold"
                    className="text-neutral-500 hover:text-green-600 transition-colors"
                  >
                    SRE ITS
                  </Typography>
                </UnstyledLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <IconButton
            icon={() => <Send className="text-[#FFC533] w-8 h-8" />}
            className="lg:hidden"
            variant="ghost"
            onClick={showNav}
          />

          {/* User Profile (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Menu className="relative" as="div">
              <MenuButton className={"focus:outline-none"}>
                {({ open }: { open: boolean }) => (
                  <div className="flex items-center gap-3 cursor-pointer group hover:bg-neutral-50 p-2 rounded-xl transition-all">
                    <div className="hidden sm:flex flex-row items-center gap-1">
                      <Typography
                        font="Sora"
                        variant="t"
                        weight="bold"
                        className="text-[#3F3F46]"
                      >
                        Welcome, {session?.user?.name?.split(" ")[0] || "User"}!
                      </Typography>
                    </div>

                    <div className="w-10 h-10 bg-[#47B268] rounded-full flex items-center justify-center">
                      <User2 className="w-5 h-5 text-white" />
                    </div>

                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-[#3F3F46] transition-transform duration-200",
                        open && "rotate-180",
                      )}
                    />
                  </div>
                )}
              </MenuButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-neutral-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-3">
                    <Typography
                      variant="bt"
                      weight="bold"
                      className=" text-neutral-900 truncate"
                    >
                      {session?.user?.name || "Guest"}
                    </Typography>
                    <Typography
                      variant="bt"
                      weight="bold"
                      className=" text-neutral-500 truncate"
                    >
                      {session?.user?.email || "No Email"}
                    </Typography>
                  </div>

                  <div className="p-1">
                    <MenuItem>
                      {({ active }: { active: boolean }) => (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className={cn(
                            "flex w-full items-center rounded-lg px-2 py-2 text-sm text-[#FF4444] hover:bg-red-200 font-medium",
                            active && "bg-red-50",
                          )}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log Out
                        </Button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* mobile */}
        <div
          className={cn(
            "fixed left-0 top-0 flex flex-col items-center w-full h-screen px-4 pt-4 pb-16 lg:hidden bg-white z-[60] overflow-auto",
            "transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="w-full flex justify-between items-center mb-8 h-[65px] px-[28px]">
            {" "}
            <UnstyledLink href="/dashboard">
              <NextImage
                src="/logo-futurest-26.svg"
                alt="logo"
                width={40}
                height={40}
                className="w-[40px] h-[40px] object-contain"
              />
            </UnstyledLink>
            <IconButton
              icon={() => <X className="text-gray-800 w-8 h-8" />}
              variant="ghost"
              onClick={showNav}
            />
          </div>

          <div className="flex flex-col h-full w-full items-center justify-between px-[28px]">
            <nav className={cn("w-full flex flex-col items-center gap-6")}>
              <UnstyledLink href="/about">
                <Typography variant="h5" className="font-bold text-gray-800">
                  About Us
                </Typography>
              </UnstyledLink>

              <div className="flex flex-col items-center gap-3">
                <Typography variant="h5" className="font-bold text-gray-800">
                  Our Events
                </Typography>
                <div className="flex flex-col gap-2 items-center">
                  {events
                    ?.filter((e) => e.name !== "Dashboard")
                    .map((e) => (
                      <UnstyledLink
                        key={e.name}
                        href={e.href}
                        className="text-neutral-500 font-medium"
                      >
                        {e.name}
                      </UnstyledLink>
                    ))}
                </div>
              </div>

              <UnstyledLink href="/merchandise">
                <Typography variant="h5" className="font-bold text-neutral-800">
                  Merchandise
                </Typography>
              </UnstyledLink>

              <UnstyledLink
                href="https://sre-its.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography variant="h5" className="font-bold text-neutral-800">
                  SRE ITS
                </Typography>
              </UnstyledLink>
            </nav>

            <Button
              onClick={handleLogout}
              variant="danger"
              size="lg"
              className="w-full rounded-xl text-white"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
