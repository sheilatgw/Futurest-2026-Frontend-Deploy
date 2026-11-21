"use client";

import Typography from "@/components/typography";
import FormInput from "../FormInput";

export default function GeneralQuestions() {
  return (
    <div className="w-full">
      <div className="bg-[#f8f9fa] p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center mb-6 md:mb-8">
          <Typography
            font="Sora"
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            General Questions
          </Typography>
        </div>
        <div className="space-y-4 md:space-y-6">
          <FormInput
            name="introduce"
            type="textarea"
            label="Please introduce yourself creatively"
            required
          />
          <FormInput
            name="about"
            type="textarea"
            label="What do you know about Futurest 2026?"
            required
          />
          <FormInput
            name="knowledge"
            type="textarea"
            label="What knowledge do you have regarding renewable energy?"
            required
          />
          <FormInput
            name="expect"
            type="textarea"
            label="What do you expect from yourself after becoming Futurest 2026 brand ambassador?"
            required
          />
        </div>
      </div>
    </div>
  );
}
