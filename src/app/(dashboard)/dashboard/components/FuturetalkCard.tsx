import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import Link from "next/link";

interface FutureTalkCardProps {
  href: string;
  isActive?: boolean;
  statusLabel?: string;
  labelName?: string;
  buttonText?: string;
}

export default function FutureTalkCard({
  href,
  isActive = false,
  statusLabel,
  labelName,
  buttonText = "View Competition", // Default value jika tidak ada props
}: FutureTalkCardProps) {
  return (
    <Link href={href} className="w-full h-full block group">
      <div className="relative w-full h-full">
        {/* Ornament Top Right */}
        <div className="absolute top-0 right-0 z-0">
          <NextImage
            src="/images/dashboard/ornament-futuretalk-tr.svg"
            alt=""
            width={70}
            height={70}
            serverStaticImg={true}
            useSkeleton={false}
            imgClassName="object-right-top"
          />
        </div>

        {/* Ornament Bottom Left */}
        <div className="absolute bottom-0 left-0 z-0">
          <NextImage
            src="/images/dashboard/ornament-futuretalk-bl.svg"
            alt=""
            width={65}
            height={65}
            serverStaticImg={true}
            useSkeleton={false}
            imgClassName="object-left-bottom"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
          <Typography
            variant="h2"
            weight="bold"
            font="Titillium"
            className="text-white text-center leading-[110%] tracking-tight"
            style={{
              WebkitTextStroke: "2px #0E467A",
              fontSize: "44px",
            }}
          >
            FutureTalk <br /> x Minicase
          </Typography>
          <Typography
            variant="h6"
            weight="bold"
            font="Titillium"
            className="text-white text-center leading-[110%] tracking-tight"
            style={{
              WebkitTextStroke: "2px #0E467A",
            }}
          >
            {labelName}
          </Typography>

          <div className="mt-4 md:mt-8 w-[184px] py-2 bg-white/60 rounded-[12px] flex flex-col justify-center items-center shadow-sm backdrop-blur-sm transition-transform group-hover:scale-105">
            {/* Status Label (Hanya muncul jika Active) */}
            {isActive && statusLabel && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0E467A] mb-1">
                {statusLabel}
              </span>
            )}

            {/* Button Text */}
            <Typography
              variant="bt"
              weight="bold"
              font="Titillium"
              className="text-[#224C8D] text-[14px]"
            >
              {buttonText}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
