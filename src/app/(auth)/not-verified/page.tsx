"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Copy,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react"; // Tambah import Suspense
import { toast } from "sonner";
import AnimatedEnvelope from "./_components/envelope";

// --- CONSTANTS ---
const _RESEND_COOLDOWN = 60;

// 1. Component Logic Utama (Kita rename jadi Content)
function NotVerifiedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // State
  const [resendTimer, setResendTimer] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // --- LOGIC: Resend Cooldown Timer ---
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((p) => p - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  // --- HANDLER: Resend Email ---
  const handleResend = () => {
    toast.info("Still on development", {
      description: "Fitur kirim ulang email sedang dalam pengerjaan.",
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
      duration: 4000,
    });
    setResendTimer(10);
  };

  // --- HANDLER: Copy Email ---
  const handleCopyEmail = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- HANDLER: Navigation ---
  const handleBackToLogin = () => {
    router.push("/login");
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0F936D] p-4 text-white selection:bg-white/30">
      {/* Background Ornaments */}
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

      {/* --- BACK BUTTON (Floating) --- */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-6 top-6 z-20"
      >
        <button
          onClick={handleBackToLogin}
          className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/20 hover:pr-5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Login</span>
        </button>
      </motion.div>

      {/* --- MAIN CARD --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10"
      >
        <div className="flex flex-col items-center text-center">
          {/* 1. ANIMATED ICON */}
          <motion.div variants={itemVariants} className="mb-6 relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            <AnimatedEnvelope />
          </motion.div>

          {/* 2. TEXT CONTENT */}
          <motion.h1
            variants={itemVariants}
            className="mb-2 text-3xl font-bold tracking-tight"
          >
            Verify your email
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-6 text-white/80 leading-relaxed"
          >
            We've sent a secure verification link to your inbox. Please click
            the link to activate your account.
          </motion.p>

          {/* 3. EMAIL DISPLAY */}
          {email && (
            <motion.div variants={itemVariants} className="mb-8 w-full">
              <button
                onClick={handleCopyEmail}
                className="group relative flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left transition-all hover:border-white/30 hover:bg-black/30 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <span className="truncate font-medium text-white/90">
                    {email}
                  </span>
                </div>

                <div className="ml-2 text-white/60 transition-colors group-hover:text-white">
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </div>

                <span className="absolute -top-2 right-2 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#0F936D] opacity-0 transition-opacity group-hover:opacity-100">
                  {isCopied ? "Copied!" : "Copy"}
                </span>
              </button>
            </motion.div>
          )}

          {/* 4. ACTION BUTTON */}
          <motion.div variants={itemVariants} className="w-full space-y-4">
            <button
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#0F936D] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {resendTimer > 0 ? (
                <span className="font-mono flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {`Wait ${resendTimer}s`}
                </span>
              ) : (
                <>
                  <span>Resend Verification Email</span>
                  <RefreshCw className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Helper Links */}
            <div className="flex items-center justify-center gap-4 text-xs text-white/60">
              <span>Wrong email address?</span>
              <span className="h-1 w-1 rounded-full bg-white/40"></span>
              <button
                onClick={handleBackToLogin}
                className="flex items-center gap-1 hover:text-white hover:underline cursor-pointer"
              >
                Log out & Sign in
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// 2. Component Wrapper (Ini yang diexport default)
export default function NotVerifiedPage() {
  return (
    // Fallback loading polos biar ga flash
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0F936D]" />}>
      <NotVerifiedContent />
    </Suspense>
  );
}
