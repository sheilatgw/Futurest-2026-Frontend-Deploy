"use client";

import Typography from "@/components/typography";
import UploadFile from "../../shared/FileUpload";
import FormInput from "../../shared/FormInput";
import SchoolInput from "../../shared/UniversityInput";
import UnstyledLink from "@/components/links/unstyled-link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useAuthStore from "@/stores/use-auth-store";

interface TeamSectionProps {
  title: string;
  isOpen: boolean;
  prefix: string;
  onToggle: () => void;
  isLeader?: boolean;
}

export default function TeamSection({
  title,
  isOpen,
  prefix,
  onToggle,
  isLeader = false,
}: TeamSectionProps) {
  const [isDocOpen, setIsDocOpen] = useState(false);

  const finalPrefix = isLeader ? "leader" : prefix;

  const { setValue, getValues } = useFormContext();
  const user = useAuthStore.useUser();
  const userEmail = user?.personal_info?.email;

  useEffect(() => {
    if (isLeader && userEmail) {
      const fieldName = `${finalPrefix}_email`;
      const currentValue = getValues(fieldName);
      if (!currentValue) {
        setValue(fieldName, userEmail);
      }
    }
  }, [isLeader, userEmail, finalPrefix, setValue, getValues]);

  return (
    <div className="mb-4">
      {/* identity */}
      <div className="mb-4">
        <button
          type="button"
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
            isOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#f8f9fa] p-6 rounded-b-2xl border border-t-0 border-gray-200 shadow-sm space-y-4">
            {isLeader && (
              <>
                <FormInput
                  name="team_name"
                  label="Team Name"
                  placeholder="Team Name"
                  required
                />
                <SchoolInput
                  name="university"
                  label="School"
                  placeholder="Type school name (e.g. SMA Negeri 1 Surabaya)"
                  required
                />
              </>
            )}

            <FormInput
              name={`${finalPrefix}_name`}
              label="Full Name"
              placeholder="Full Name"
              required
            />

            {/* <FormInput
              name={`${finalPrefix}_student_id`}
              label="Student ID"
              placeholder="Student ID"
              required
            /> */}

            <FormInput
              name={`${finalPrefix}_phone`}
              label="Phone Number"
              placeholder="62XXXXXXXXXXX"
              type="tel"
              required
            />

            <FormInput
              name={`${finalPrefix}_email`}
              label="Email"
              placeholder="Email address"
              type="email"
              required
            />
            {isLeader && (
              <>
                <FormInput
                  name="supervisor_name"
                  label="Supervisor Name"
                  placeholder="Supervisor Name"
                  required
                />
                <FormInput
                  name="supervisor_phone"
                  label="Supervisor Phone Number"
                  placeholder="62XXXXXXXXXXX"
                  type="tel"
                  required
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* doccument submission */}
      <div>
        <button
          type="button"
          onClick={() => setIsDocOpen(!isDocOpen)}
          className={`w-full flex justify-between items-center px-6 py-4 bg-[#3b6db3] transition-all duration-300 ${
            isDocOpen ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <Typography
            font="Sora"
            className="text-white font-bold text-lg md:text-2xl"
          >
            Document Submission{" "}
            {isLeader ? "Leader" : title.replace("Team ", "")}
          </Typography>
          {isDocOpen ? (
            <ChevronUp className="text-white" />
          ) : (
            <ChevronDown className="text-white" />
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isDocOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#f8f9fa] p-6 rounded-b-2xl border border-t-0 border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadFile
                variant="md"
                name={`${finalPrefix}_ktm`}
                title="Student Card"
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />

              <UploadFile
                variant="md"
                name={`${finalPrefix}_instagram_follow_futurest`}
                title="Proof Follow Instagram Futurest"
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />

              <UploadFile
                variant="md"
                name={`${finalPrefix}_instagram_follow_sre`}
                title="Proof Follow Instagram SRE ITS"
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />

              <UploadFile
                variant="md"
                name={`${finalPrefix}_twibbon_upload`}
                title={
                  <>
                    Screenshot of Twibbon (
                    <UnstyledLink
                      href="https://drive.google.com/file/d/1pHeQxR1LAlze-JU227ykQTPUC3H52YDf/view?usp=sharing"
                      className="text-[#3A6AB2] hover:underline font-medium"
                    >
                      access here
                    </UnstyledLink>
                    )
                  </>
                }
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />

              <UploadFile
                variant="md"
                name={`${finalPrefix}_ig_story`}
                title="Proof upload Instagram Story poster + tag @futurest2026"
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />

              <UploadFile
                variant="md"
                name={`${finalPrefix}_poster_sharing`}
                title="Proof of sharing poster + broadcast Competition to at least 2 groups"
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />
              <UploadFile
                variant="md"
                name={`${finalPrefix}_public_account_proof`}
                title="Proof of public account"
                isRequired
                supportFiles={[".png", ".jpg", ".pdf"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
