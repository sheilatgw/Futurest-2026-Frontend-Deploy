"use client";

import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { removeToken } from "@/lib/cookies";
import useAuthStore from "@/stores/use-auth-store";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const _router = useRouter();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
  const [isDesktopEventsOpen, setIsDesktopEventsOpen] = useState(false);

  const handleDashboard = () => window.location.replace("/dashboard");
  // --- Method Logout (Safe Mode: Hard Refresh) ---
  const handleLogout = () => {
    // 1. Bersihkan data
    removeToken();
    logout();
    localStorage.removeItem("user");

    // 2. Tutup menu (visual)
    setIsMobileMenuOpen(false);

    // 3. Notifikasi
    toast.success("Logout Berhasil");

    // 4. Force Reload ke halaman login
    // Delay 300ms untuk biarkan AnimatePresence selesai exit animation
    setTimeout(() => {
      window.location.replace("/");
    }, 300);
  };

  // --- Method Login Navigation ---
  // Kita pake ini gantinya <Link> buat tombol yang ada animasinya
  const handleLoginNav = () => {
    setIsMobileMenuOpen(false); // Tutup menu dulu (kalo di mobile)
    window.location.replace("/login"); // Baru pindah
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full border-b bg-white relative z-50 shadow-sm"
    >
      <div className="mx-auto flex h-20 md:h-[100px] w-full items-center justify-between px-4 md:px-8 max-w-[1440px]">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/futuretalk/NavbarLogo.png"
              alt="Futurest Logo"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </motion.div>
          <div className="flex flex-col justify-center leading-none">
            <Typography
              font="Titillium"
              weight="extrabold"
              className="text-lg md:text-xl text-black"
            >
              FUTUREST
            </Typography>
            <Typography
              font="Titillium"
              weight="extrabold"
              className="text-lg md:text-xl text-black"
            >
              2026
            </Typography>
          </div>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/about" className="relative group py-2">
            <Typography
              font="Sora"
              weight="bold"
              className="text-base md:text-[16px] text-black group-hover:opacity-70 transition-opacity"
            >
              About Us
            </Typography>
          </Link>

          {/* Desktop Dropdown Events */}
          <div
            className="relative cursor-pointer py-4"
            onMouseEnter={() => setIsDesktopEventsOpen(true)}
            onMouseLeave={() => setIsDesktopEventsOpen(false)}
          >
            <div className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <Typography
                font="Sora"
                weight="bold"
                className="text-base md:text-[16px]"
              >
                Our Events
              </Typography>
              <motion.div
                animate={{ rotate: isDesktopEventsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2">
              <AnimatePresence mode="wait">
                {isDesktopEventsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-56 rounded-xl border bg-white shadow-xl overflow-hidden"
                  >
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          setIsDesktopEventsOpen(false);
                          setTimeout(() => {
                            window.location.href = "/events/bcc";
                          }, 200);
                        }}
                        className="px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left w-full"
                      >
                        <Typography
                          font="Sora"
                          weight="semibold"
                          className="text-base text-black"
                        >
                          Business Case Competitions
                        </Typography>
                      </button>
                      <button
                        onClick={() => {
                          setIsDesktopEventsOpen(false);
                          setTimeout(() => {
                            window.location.href = "/events/repi";
                          }, 200);
                        }}
                        className="px-6 py-4 hover:bg-gray-50 transition-colors text-left w-full"
                      >
                        <Typography
                          font="Sora"
                          weight="semibold"
                          className="text-base text-black"
                        >
                          REPI
                        </Typography>
                      </button>
                      <button
                        onClick={() => {
                          setIsDesktopEventsOpen(false);
                          setTimeout(() => {
                            window.location.href = "/events/reii";
                          }, 200);
                        }}
                        className="px-6 py-4 hover:bg-gray-50 transition-colors text-left w-full"
                      >
                        <Typography
                          font="Sora"
                          weight="semibold"
                          className="text-base text-black"
                        >
                          REII
                        </Typography>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Link href="https://www.sre-its.com/" className="relative group py-2">
            <Typography
              font="Sora"
              weight="bold"
              className="text-base md:text-[16px] text-black group-hover:opacity-70 transition-opacity"
            >
              SRE ITS
            </Typography>
          </Link>
        </div>

        {/* User Profile / Login Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {user?.personal_info ? (
            // --- KONDISI SUDAH LOGIN (DESKTOP) ---
            <div className="relative group py-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <Typography
                  font="Sora"
                  weight="bold"
                  className="text-black text-sm md:text-[16px]"
                >
                  Welcome,{" "}
                  {user.personal_info?.username?.split(" ")[0] || "User"}!
                </Typography>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <div className="flex h-10 w-10 md:h-[50px] md:w-[50px] items-center justify-center rounded-full bg-[#FFC533] text-white shadow-sm border border-gray-100 overflow-hidden">
                    <UserIcon size={28} color="white" />
                  </div>
                  <ChevronDown
                    size={20}
                    className="text-black group-hover:rotate-180 transition-transform duration-300"
                  />
                </motion.div>
              </div>

              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-48 z-50">
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border bg-white shadow-xl overflow-hidden p-1"
                >
                  <Button
                    onClick={handleDashboard}
                    className="flex border-none outline-none items-center gap-2 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-black"
                  >
                    <UserIcon size={18} />
                    <Typography font="Sora" weight="medium" className="text-sm">
                      Dashboard
                    </Typography>
                  </Button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                    <Typography font="Sora" weight="bold" className="text-sm">
                      Logout
                    </Typography>
                  </button>
                </motion.div>
              </div>
            </div>
          ) : (
            // --- KONDISI BELUM LOGIN (DESKTOP) ---
            // FIX: Hapus <Link>, ganti logic ke onClick biar ga bentrok sama Framer Motion
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginNav}
              className="bg-[#0F936D] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#0c7a5a] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogIn size={18} />
              <Typography font="Sora" weight="bold">
                Login
              </Typography>
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4 min-h-screen pb-32">
              {/* Mobile Profile / Login Header */}
              {user ? (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC533] text-white">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <Typography
                      font="Sora"
                      weight="medium"
                      className="text-gray-600"
                    >
                      Welcome,
                    </Typography>
                    <Typography
                      font="Sora"
                      weight="bold"
                      className="text-black text-lg line-clamp-1"
                    >
                      {user.personal_info?.username || ""}!
                    </Typography>
                  </div>
                </div>
              ) : (
                // --- KONDISI BELUM LOGIN (MOBILE) ---
                // FIX: Hapus <Link>, pake div onClick wrapper
                <div
                  className="w-full mb-4 cursor-pointer"
                  onClick={handleLoginNav}
                >
                  <button className="w-full flex items-center justify-center gap-2 bg-[#0F936D] text-white py-3 rounded-xl font-bold shadow-sm pointer-events-none">
                    <LogIn size={20} />
                    Login Now
                  </button>
                </div>
              )}

              {/* Links */}
              <Link
                href="/about"
                className="p-4 rounded-xl hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Typography
                  font="Sora"
                  weight="bold"
                  className="text-lg text-black"
                >
                  About Us
                </Typography>
              </Link>

              <div>
                <button
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 border-b border-gray-100"
                  onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                >
                  <Typography
                    font="Sora"
                    weight="bold"
                    className="text-lg text-black"
                  >
                    Our Events
                  </Typography>
                  <motion.div
                    animate={{ rotate: isMobileEventsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-black" />
                  </motion.div>
                </button>

                <AnimatePresence mode="wait">
                  {isMobileEventsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50 rounded-b-xl"
                    >
                      <Link
                        href="/events/bcc"
                        className="block px-8 py-3 text-gray-600 hover:text-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Typography font="Sora" weight="semibold">
                          Business Case Competition
                        </Typography>
                      </Link>
                      <Link
                        href="/events/repi"
                        className="block px-8 py-3 text-gray-600 hover:text-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Typography font="Sora" weight="semibold">
                          Renewable Energy Paper Idea
                        </Typography>
                      </Link>
                      <Link
                        href="/events/reii"
                        className="block px-8 py-3 text-gray-600 hover:text-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Typography font="Sora" weight="semibold">
                          Renewable Energy Innovation Idea
                        </Typography>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="https://www.sre-its.com/"
                className="p-4 rounded-xl hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Typography
                  font="Sora"
                  weight="bold"
                  className="text-lg text-black"
                >
                  SRE ITS
                </Typography>
              </Link>

              {/* Mobile Logout Button (Hanya jika user login) */}
              {user && (
                <button
                  className="flex items-center justify-center p-4 rounded-xl bg-red-50 text-red-500 font-bold mt-4 border border-red-100"
                  onClick={handleLogout}
                >
                  <LogOut size={20} className="mr-2" />
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
