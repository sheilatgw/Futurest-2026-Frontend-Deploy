"use client";

import Typography from "@/components/typography";
import FormRadio from "../FormRadio";

export default function SpecialRequirement() {
  return (
    <div className="w-full">
      <div className="bg-[#f8f9fa] p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center mb-6 md:mb-8">
          <Typography
            font="Sora"
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Special Requirement
          </Typography>
        </div>

        <div className="space-y-6">
          <FormRadio
            name="willingness_upload_event"
            label="Are you willing and able to upload content approximately 3x (three times) per month?"
            required
            options={[
              {
                label: "Yes, without any constraints",
                value: "yes_no_constraints",
              },
              {
                label: "Yes, with certain considerations",
                value: "yes_considerations",
              },
              { label: "No", value: "no" },
            ]}
          />

          <hr className="border-gray-200 my-6" />

          <FormRadio
            name="willing_attend_event"
            label="Are you willing to attend the exhibition and awarding venue in Surabaya on May 23, 2026?"
            required
            options={[
              {
                label: "Yes, without any constraints",
                value: "yes_no_constraints",
              },
              {
                label: "Yes, with certain considerations",
                value: "yes_considerations",
                hasInput: true,
                inputName: "attend_consideration_desc",
                inputPlaceholder: "Please briefly explain your considerations",
              },
              { label: "No", value: "no" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
