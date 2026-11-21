"use client";

import Typography from "@/components/typography";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import DependentSearchInput from "./DependantSearch";
import UploadFile from "./FileUpload";
import FormInput from "./FormInput";
import UniversitySearchInput from "./UniversitySearch";

interface TeamSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  isLeader?: boolean;
}

export default function TeamSection({
  title,
  isOpen,
  onToggle,
  isLeader = false,
}: TeamSectionProps) {
  const prefix = isLeader
    ? "team_leader"
    : title.includes("1")
      ? "team_member_2"
      : "team_member_3";

  const isOptionalMember = prefix === "team_member_3";

  const { control } = useFormContext();

  const member3Values = useWatch({
    control,
    name: [
      "team_member_3_name",
      "team_member_3_email",
      "team_member_3_instagram_follow",
      "team_member_3_instagram_repost",
      "team_member_3_instagram_story",
      "team_member_3_ktm",
    ] as const,
  });

  const member3HasAnyValue = isOptionalMember
    ? member3Values?.some((v: any) => v !== undefined && v !== null && v !== "")
    : false;

  const isRequired = !isOptionalMember || member3HasAnyValue;

  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-6 py-4 bg-[#3b6db3] transition-all duration-300 ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <Typography
          font="Sora"
          className="text-white font-bold text-lg md:text-3xl"
        >
          {title}
        </Typography>
        {isOpen ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#f8f9fa] p-6 rounded-b-2xl border border-t-0 border-gray-200 shadow-sm">
          <FormInput
            name={`${prefix}_name`}
            label="Full Name"
            placeholder="Full Name"
            required={isRequired}
          />

          <FormInput
            name={`${prefix}_email`}
            label="Email"
            placeholder="Email address"
            type="email"
            required={isRequired}
          />

          {isLeader && (
            <>
              <FormInput
                name="team_name"
                label="Team Name"
                placeholder="Team Name"
                required
              />
              <UniversitySearchInput
                name="university"
                label="University"
                required
              />

              {/* 2. FACULTY (Dependent to University) */}
              <DependentSearchInput
                name="faculty"
                label="Faculty"
                placeholder="Pilih atau ketik Fakultas"
                required
                parentName="university" // Ngambil data dari field 'university'
                // Asumsi endpoint: api.co.id/v1/pt/{id}/fakultas
                // {id} bakal otomatis diganti sama ID university yg dipilih
                endpointPath="/v1/pt/{id}/fakultas"
              />

              {/* 3. STUDY PROGRAM (Dependent to Faculty) */}
              {/* CATATAN: Terkadang Prodi itu nempel ke Univ langsung, kadang ke Fakultas. 
   Kalau nempel ke Fakultas, set parentName="faculty".
   Kalau API-nya nempel ke Univ, set parentName="university".
   
   Disini asumsi urutannya Univ -> Faculty -> Prodi.
*/}
              <DependentSearchInput
                name="study_program"
                label="Study Program"
                placeholder="Pilih atau ketik Prodi"
                required
                parentName="faculty" // Ngambil data dari field 'faculty' & 'faculty_id'
                endpointPath="/v1/fakultas/{id}/prodi" // Sesuaikan endpoint prodi
              />
              <FormInput
                name={`${prefix}_phone`}
                label="Whatsapp Number"
                placeholder="62XXXXXXXXXXX"
                type="tel"
                required
              />
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <UploadFile
              variant="md"
              name={`${prefix}_instagram_follow`}
              title="Proof follow Instagram Futurest 2025"
              isRequired={isRequired}
              supportFiles={[".png", ".jpg", ".jpeg"]}
            />

            <UploadFile
              variant="md"
              name={`${prefix}_instagram_repost`}
              title="Proof share poster story Instagram"
              isRequired={isRequired}
              supportFiles={[".png", ".jpg", ".jpeg"]}
            />

            <UploadFile
              variant="md"
              name={`${prefix}_instagram_story`}
              title="Proof Repost Instagram"
              isRequired={isRequired}
              supportFiles={[".png", ".jpg", ".jpeg"]}
            />

            <UploadFile
              variant="md"
              name={`${prefix}_ktm`}
              title="KTM"
              isRequired={isRequired}
              supportFiles={[".png", ".jpg", ".jpeg"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
