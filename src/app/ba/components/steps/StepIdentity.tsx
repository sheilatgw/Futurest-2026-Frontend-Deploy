"use client";

import Typography from "@/components/typography";
import { useInstagramCheck } from "@/hooks/use-instagram-check";
// IMPORT INI
import useAuthStore from "@/stores/use-auth-store";
import { useFormContext } from "react-hook-form";
import FormInput from "../FormInput";
import FormRadio from "../FormRadio";
import CityInput from "../auto/CityInput";
import InstagramInput from "../auto/InstagramInput";
import InstitutionInput from "../auto/InstitutionInput";

export default function StepIdentity() {
  const user = useAuthStore.useUser();
  const existingEmail = user?.personal_info?.email;
  const isEmailLocked = Boolean(existingEmail && existingEmail.trim() !== "");

  // Hook Logic dipanggil disini
  const instagramLogic = useInstagramCheck();
  const { isVerified, username } = instagramLogic;
  const isUsernameEmpty = !username || username.trim() === "";

  const { register } = useFormContext();

  return (
    <div className="w-full">
      <div className="bg-[#f8f9fa] p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center mb-6 md:mb-8">
          <Typography
            font="Sora"
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Identity
          </Typography>
        </div>

        {/* Hidden field buat avatar persist */}
        <input type="hidden" {...register("avatar_url_temp")} />

        <div className="space-y-4 md:space-y-6">
          <FormInput
            name="name"
            label="Full Name"
            placeholder="Full Name"
            required
          />
          <FormRadio
            name="student_type"
            label="Student Type"
            required
            options={[
              { label: "College Student (Mahasiswa)", value: "UNIVERSITY" },
              {
                label: "High School Student (Siswa SMA/SMK)",
                value: "HIGH_SCHOOL",
              },
            ]}
          />
          <FormInput
            name="student_id_number"
            label="Student ID Number"
            placeholder="Ex: 5025211000"
            required
          />
          <CityInput
            name="city"
            label="Domicile"
            placeholder="Type your city (e.g. Surabaya)"
            required
          />
          <InstitutionInput
            name="institution_name"
            label="Institute/School"
            placeholder="Type name"
            required
          />

          {/* --- INSTAGRAM SECTION START --- */}

          {/* GUNAKAN KOMPONEN IMPORT, PASSING LOGIC SEBAGAI PROP */}
          <InstagramInput
            logic={instagramLogic}
            label="Instagram Account (public)"
            placeholder="Instagram username (without @)"
            required
          />

          <div className="relative">
            <FormInput
              name="follower_count"
              label="Followers Count"
              placeholder={
                isUsernameEmpty ? "Please fill username first..." : "Ex: 1500"
              }
              type="number"
              required
              disabled={isUsernameEmpty}
              readOnly={isVerified}
              className={`transition-colors ${
                isUsernameEmpty
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : isVerified
                    ? "bg-gray-50 text-gray-600 cursor-not-allowed border-green-200"
                    : "bg-white"
              }`}
            />
          </div>

          <div
            className={`transition-opacity duration-200 ${isUsernameEmpty ? "opacity-50 pointer-events-none grayscale" : ""} ${isVerified ? "pointer-events-none" : ""}`}
          >
            <FormRadio
              name="instagram_public"
              label="Is your Instagram account public?"
              required
              options={[
                { label: "Yes, it is public", value: "true" },
                { label: "No, it is private", value: "false" },
              ]}
            />
            {isUsernameEmpty && (
              <p className="text-[10px] text-gray-400 mt-1 ml-1">
                *Fill username to unlock this option
              </p>
            )}
          </div>
          {/* --- INSTAGRAM SECTION END --- */}

          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="E.g. email@example.com"
            required
            readOnly={isEmailLocked}
            className={
              isEmailLocked
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }
          />
          <FormInput
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="E.g. +621234567890"
            required
          />
          <FormInput
            name="line_id"
            label="Line ID"
            placeholder="Line ID"
            required
          />
        </div>
      </div>
    </div>
  );
}
