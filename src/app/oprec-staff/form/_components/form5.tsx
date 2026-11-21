import { FormField } from "@/components/ui/form";
import useOprecFormStore from "@/stores/use-oprec-form-store";
import { Form5, TypeOprecStaff } from "@/types/page/oprec-staff";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { stepFields } from "../page";
import UploadFile from "./upload-file";

const FILE_FIELDS: {
  name: keyof Form5;
  title: string;
  description: string;
  isRequired?: boolean;
  supportFiles: string[];
  accept: Record<string, string[]>;
}[] = [
  {
    name: "portfolio_asset",
    title: "Portfolio Asset",
    description: "Upload your design portfolio",
    isRequired: false,
    supportFiles: ["pdf"],
    accept: { "application/pdf": [".pdf"] },
  },
  {
    name: "Ktm",
    title: "Student Card (KTM)",
    description: "Upload your valid student ID (KTM) in PDF format.",
    isRequired: true,
    supportFiles: ["pdf"],
    accept: { "application/pdf": [".pdf"] },
  },
  {
    name: "CurriculumVitae",
    title: "Curriculum Vitae (CV)",
    description: "Upload your latest CV in PDF format.",
    isRequired: true,
    supportFiles: ["pdf"],
    accept: { "application/pdf": [".pdf"] },
  },
  {
    name: "Twibbon",
    title: "Twibbon Proof",
    description: "Upload a screenshot of your Twibbon post on social media.",
    isRequired: true,
    supportFiles: ["jpg", "jpeg", "png"],
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  },
  {
    name: "RepostFeeds",
    title: "Proof of Repost",
    description:
      "Upload a screenshot of your reposted futurest " +
      "content on social media.",
    isRequired: true,
    supportFiles: ["jpg", "jpeg", "png"],
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  },
  {
    name: "followed_ig_futurest",
    title: "Followed Futurest IG",
    description:
      "Upload a screenshot proof of following " +
      "Futurest official Instagram.",
    isRequired: true,
    supportFiles: ["jpg", "jpeg", "png"],
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  },
  {
    name: "followed_ig_sre",
    title: "Followed SRE IG",
    description:
      "Upload a screenshot proof of following SRE " + "official Instagram.",
    isRequired: true,
    supportFiles: ["jpg", "jpeg", "png"],
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  },
];

export default function Form5Components() {
  const { control, setValue, trigger } = useFormContext<TypeOprecStaff>();
  const { fileAttachment } = useOprecFormStore();

  useEffect(() => {
    FILE_FIELDS.forEach((field) => {
      const file = fileAttachment[field.name];
      if (file) {
        setValue(field.name, file, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    });
    // Trigger ulang semua field di step 5
    trigger(stepFields[4] as any);
  }, [fileAttachment, setValue, trigger]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[35px] font-bold">Finalizing Your Application</h2>
        <p className="text-xl font-medium text-[#7A7A7A]">
          To complete your registration, please provide the required documents
          and, if applicable, your portfolio.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {FILE_FIELDS.map((field) => (
          <FormField
            key={field.name}
            control={control}
            name={field.name}
            render={() => (
              <UploadFile
                name={field.name}
                title={field.title}
                description={field.description}
                isRequired={field.isRequired}
                variant="lg"
                supportFiles={field.supportFiles}
                accept={field.accept}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
}
