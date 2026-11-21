"use client";

import Link from "next/link";
// 1. Import useSearchParams & Suspense
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
// Import hook yang baru dibuat
import useRegisterHook from "@/hooks/use-register-hook";

// 2. PINDAHIN LOGIC KE CHILD COMPONENT (Content)
function RegisterPageContent() {
  const { isPending, onSubmit, method } = useRegisterHook();
  const { control } = method;

  // Ambil params redirect
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  // Bikin link login dinamis
  const loginHref = redirect ? `/login?redirect=${redirect}` : "/login";

  return (
    <div className="fixed flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* mobile background */}
      <div
        className="sm:hidden fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/login/bg-mobile-login.png')",
        }}
      />

      {/* desktop background */}
      <div
        className="hidden sm:fixed sm:block inset-0 z-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: "url('/images/login/bg-desktop-login.png')",
        }}
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
        <div
          className=" relative 
            flex 
            w-full 
            max-w-[400px] 
            flex-col 
            justify-center 
            bg-cover 
            bg-center 
            p-8 
            md:p-10 
            aspect-[5/7] 
            lg:aspect-[4/7]
            bg-[url('/images/login/bg-mobile-form.svg')] 
            lg:bg-[url('/images/login/bg-form.svg')]"
        >
          <FormProvider {...method}>
            <form
              onSubmit={method.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-5"
            >
              {/* Username Field */}
              <div>
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Username<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Create a username"
                          className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Field */}
              <div>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Email Address<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <FormField
                  control={control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Phone Number<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter your phone number"
                          className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Field */}
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
                          placeholder="Create password"
                          className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Buttons & Link */}
              <div className="flex flex-col justify-center items-center pt-6 gap-3">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="h-8 w-[230px] rounded-xl bg-[#0F936D] text-white hover:bg-[#288456]"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Register"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href={loginHref}
                    className="font-semibold text-[#2E7D57] hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Teks di Kanan (Desktop) */}
        <div className="text-center leading-none lg:block md:text-left">
          <Typography
            variant="h1"
            weight="bold"
            font="FiraSans"
            className="md:py-16 text-white"
          >
            Join Us,
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

// 3. EXPORT DEFAULT DENGAN SUSPENSE
export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
