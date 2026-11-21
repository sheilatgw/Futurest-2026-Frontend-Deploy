"use client";

import Typography from "@/components/typography";
import FormInput from "../FormInput";

export default function BAQuestions() {
  return (
    <div className="w-full">
      <div className="bg-[#f8f9fa] p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm mb-10">
        <div className="text-center mb-6 md:mb-8">
          <Typography
            font="Sora"
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            BA Questions
          </Typography>
        </div>
        <div className="space-y-4 md:space-y-6">
          <FormInput
            name="about_ba"
            type="textarea"
            label="What do you know about Brand Ambassador?"
            required
          />
          <FormInput
            name="reason_ba"
            type="textarea"
            label="What is your reason and motivation for wanting to become a Futurest 2026 brand ambassador?"
            required
          />
          <FormInput
            name="worked_experience"
            type="textarea"
            label="Have you worked as a brand ambassador before, or have you had any related experience?"
            required
          />
          <FormInput
            name="strategy_promote"
            type="textarea"
            label="What strategy would you use to promote Futurest 2026?"
            required
          />
          <FormInput
            name="skills"
            type="textarea"
            label="What skills do you possess that make you suitable to be a Futurest 2026 brand ambassador?"
            required
          />
        </div>
      </div>
      <div className="bg-[#f8f9fa] p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center mb-6 md:mb-8">
          <Typography
            font="Sora"
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Study Case
          </Typography>
        </div>
        <div className="space-y-4 md:space-y-6">
          <FormInput
            name="question_one"
            type="textarea"
            label={
              <div>
                <div className="font-semibold inline">
                  You are required to publish promotional content within a fixed
                  deadline, but your academic or organizational schedule
                  suddenly becomes very busy.
                </div>{" "}
                How would you manage your time and ensure the content is still
                delivered with maximum quality?
              </div>
            }
            required
          />
          <FormInput
            name="question_two"
            type="textarea"
            label={
              <div>
                <div className="font-semibold inline">
                  You are asked to promote FUTUREST to attract participants, but
                  after several posts, no one is interested in your promo.
                </div>{" "}
                What strategy would you apply next to increase interest and
                registrations?
              </div>
            }
            required
          />
        </div>
      </div>
    </div>
  );
}
