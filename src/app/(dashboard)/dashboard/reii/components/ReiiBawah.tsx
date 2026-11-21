import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { useState } from "react";
import TeamSection from "./TeamSection";

export default function ReiiBawah() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center px-4 pb-8">
      <div className="w-full max-w-[361px] md:max-w-4xl bg-white rounded-xl p-6 z-[999]">
        <div className="relative w-full h-[147px] md:h-[240px] rounded-[9.78px] overflow-hidden bg-green-40 py-16">
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6 px-4">
            {/* Title */}
            <Typography
              font="Titillium"
              className="text-[20px] md:text-[34px] text-[#FAFAFA] text-center font-normal"
            >
              Payment Status
            </Typography>

            <div className="flex justify-center">
              <NextImage
                src="/dashboard/futuretalk/gambar-pending-mobile.svg"
                alt="Payment Stepper"
                width={344}
                height={59}
                className="
                w-full
                max-w-[344px]
                h-auto
                object-contain
                md:hidden
                flex
              "
              />
              <NextImage
                src="/dashboard/futuretalk/gambar-pending-mobile.svg"
                alt="Payment Stepper"
                width={590}
                height={96}
                className="
                w-full
                max-w-[790px]
                h-auto
                md:flex
                hidden
              "
              />
            </div>
          </div>
        </div>

        <div className="py-4">
          <Typography
            font="Titillium"
            className="text-[20px] md:text-[48px] font-bold text-[#0E467A]"
          >
            Team Profile
          </Typography>
        </div>

        <div>
          <TeamSection
            title="Team Leader"
            isOpen={isOpen}
            onToggle={() => setIsOpen((prev) => !prev)}
            data={{
              fullName: "John Doe",
              email: "john@email.com",
              whatsapp: "+62 812 xxxx",
              university: "ITS",
              studentId: "5027xxxx",
              documentLink: "Link",
              paymentLink: "Link",
              submissionLink: "Link",
            }}
          />
          <TeamSection
            title="Team Member 1"
            isOpen={isOpen}
            onToggle={() => setIsOpen((prev) => !prev)}
            data={{
              fullName: "John Doe",
              email: "john@email.com",
              whatsapp: "+62 812 xxxx",
              university: "ITS",
              studentId: "5027xxxx",
              documentLink: "Link",
              paymentLink: "Link",
              submissionLink: "Link",
            }}
          />
        </div>
      </div>
    </div>
  );
}
