"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FormProvider } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { useGoogleLogin } from "@/hooks/use-google-login";
import useLoginHook from "@/hooks/use-login-hook";
import { Loader2, Mail, X } from "lucide-react"; // Import icon tambahan

function LoginPageContent() {
  const {
    isPending,
    onSubmit,
    method,
    showVerificationModal,
    setShowVerificationModal,
    unverifiedEmail,
    resendEmail,
    isResending,
  } = useLoginHook();

  const { control } = method;
  const { loginWithGoogle } = useGoogleLogin();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const registerHref = redirect
    ? `/register?redirect=${redirect}`
    : "/register";

  return (
    <div className="fixed flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* --- MODAL RESEND EMAIL --- */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative flex flex-col items-center text-center animate-in zoom-in-95">
            <button
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-[#FE5D26]">
              <Mail size={32} />
            </div>

            <Typography
              variant="h4"
              font="Sora"
              weight="bold"
              className="text-gray-900 mb-2"
            >
              Email Not Verified
            </Typography>

            <Typography className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              It looks like you haven't verified your email yet. Please check
              the inbox (or spam folder) of <strong>{unverifiedEmail}</strong>.
              <br />
              <br />
              Can't find the email? Don't worry, we can send it again.
            </Typography>

            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => resendEmail()}
                disabled={isResending}
                className="w-full h-12 rounded-xl bg-[#0F936D] text-white hover:bg-[#288456] font-semibold flex items-center justify-center"
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>
              <Button
                onClick={() => setShowVerificationModal(false)}
                variant="outline"
                className="w-full h-12 rounded-xl text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* mobile */}
      <div
        className="sm:hidden fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login/bg-mobile-login.png')" }}
      />

      {/* desktop */}
      <div
        className="hidden sm:fixed sm:block inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login/bg-desktop-login.png')" }}
      />

      {/* Logo */}
      <div className="hidden md:fixed md:block right-24 top-16 h-[70px] w-[70px]">
        <NextImage
          src="/logo-24.png"
          alt="Logo"
          className="h-full w-full object-contain"
          width={500}
          height={500}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col-reverse items-center md:items-start gap-6 md:gap-12 px-6 md:flex-row">
        {/* Form */}
        <div className="relative flex w-full max-w-[400px] flex-col justify-center bg-cover bg-center p-8 md:p-10 aspect-[5/7] lg:aspect-[4/7] bg-[url('/images/login/bg-mobile-form.svg')] lg:bg-[url('/images/login/bg-form.svg')]">
          <FormProvider {...method}>
            <form
              onSubmit={method.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Email<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Password<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col justify-center items-center pt-8 gap-3">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="h-10 w-[230px] rounded-xl bg-[#0F936D] text-white hover:bg-[#288456]"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Login"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  No account yet?{" "}
                  <Link
                    href={registerHref}
                    className="font-semibold text-[#2E7D57] hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-xs text-gray-500"></span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                onClick={() => {
                  loginWithGoogle(redirect || undefined);
                }}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google Logo"
                  className="h-5 w-5"
                />
                Login with Google
              </button>
            </form>
          </FormProvider>
        </div>

        {/* Teks di Kanan */}
        <div className="text-center leading-none lg:block md:text-left">
          <Typography
            variant="h1"
            weight="bold"
            font="FiraSans"
            className="md:py-16 text-white"
          >
            Welcome,
            <br />
            Future Heroes!
          </Typography>
        </div>

        {/* Teks Mobile */}
        <div className="text-center leading-none md:hidden md:text-left">
          <Typography
            variant="h5"
            weight="semibold"
            className="md:py-16 text-white tracking-wider"
          >
            FUTUREST 2026
          </Typography>
        </div>
      </div>
    </div>
  );
}

// 3. EXPORT DEFAULT DENGAN SUSPENSE WRAPPER
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
