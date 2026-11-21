import BreadcrumbGroup from "@/components/breadcrumb";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Copy } from "lucide-react";

export default function ReiiAtas() {
  const BREADCRUMBS = [
    { name: "Dashboard", href: "/dashboard" },
    {
      name: "REII Competition",
      href: `/dashboard/reii`,
    },
  ];

  return (
    <div className="flex justify-center items-start px-4 pt-8 pb-5">
      <div
        className="
      relative
      w-full max-w-[361px]
      md:max-w-4xl
      bg-white
      rounded-xl
      overflow-hidden
      shadow-shadow-1
      flex
      flex-col
      md:flex-row
      md:items-center
    "
      >
        <div className="flex flex-col gap-1 px-6 py-5 md:flex-1">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <Copy className="w-4 h-4 text-black" />
            <Typography
              font="Titillium"
              className="font-bold text-[#27272A] text-[20px] md:text-[20px]"
            >
              REII Competition
            </Typography>
          </div>

          <div className="font-titilium-web-header-6-bold text-[#0e467a]">
            <Typography
              font="Titillium"
              className="font-bold text-[#0E467A] text-[20px] md:text-[48px] leading-tight"
            >
              Welcome Team Lorem Ipsum!
            </Typography>
          </div>

          <div className="pt-1">
            <BreadcrumbGroup items={BREADCRUMBS} />
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <NextImage
            width={152}
            height={113}
            src="/dashboard/futuretalk/Gambar kanan.svg"
            alt="Dashboard Illustration"
            className="w-[152px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
