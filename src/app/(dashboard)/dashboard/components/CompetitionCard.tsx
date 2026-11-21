import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import Link from "next/link";

type CompetitionCardProps = {
  competition: "BCC" | "REPI" | "REII";
  href: string;
  statusLabel?: string;
  buttonText: string;
  isRegistered?: boolean;
};

const competitionConfig = {
  BCC: {
    name: "BCC",
    fullName: "Business Case Competition",
    bgColor: "#0E467A",
    textStroke: "#0B8457",
    buttonTextColor: "#0E467A",
    statusTextColor: "#0E467A",
    ornamentTopLeft: "/images/dashboard/ornament-bcc-tl.svg",
    ornamentBottomRight: "/images/dashboard/ornament-bcc-br.svg",
    ornamentTopRight: null,
    ornamentBottomLeft: null,
  },
  REPI: {
    name: "REPI",
    fullName: "Renewable Energy Project Initiation",
    bgColor: "#0B8457",
    textStroke: "#0E467A",
    buttonTextColor: "#0B8457",
    statusTextColor: "#0B8457",
    ornamentTopLeft: null,
    ornamentBottomRight: null,
    ornamentTopRight: "/images/dashboard/ornament-repi-tr.svg",
    ornamentBottomLeft: "/images/dashboard/ornament-repi-bl.svg",
  },
  REII: {
    name: "REII",
    fullName: "Renewable Energy Innovation Idea",
    bgColor: "#FFCE21",
    textStroke: "#085E3E",
    buttonTextColor: "#8C710F",
    statusTextColor: "#8C710F",
    textColor: "#0B8457",
    ornamentTopLeft: null,
    ornamentBottomRight: null,
    ornamentTopRight: "/images/dashboard/ornament-reii-tr.svg",
    ornamentBottomLeft: "/images/dashboard/ornament-reii-bl.svg",
  },
};

export default function CompetitionCard({
  competition,
  href,
  statusLabel,
  buttonText,
  // isRegistered = false,
}: CompetitionCardProps) {
  const config = competitionConfig[competition];

  return (
    <Link href={href}>
      <div
        className="relative w-full aspect-[295/195] md:aspect-[250/260] rounded-[15px] shadow-[0px_2px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-4 overflow-hidden transition-transform hover:scale-105 cursor-pointer"
        style={{ backgroundColor: config.bgColor }}
      >
        {/* Status Badge */}
        {statusLabel && (
          <div className="absolute top-2 right-2 z-20 bg-white/90 px-3 py-1 rounded-full">
            <Typography
              variant="bt"
              weight="bold"
              font="Titillium"
              className="text-[10px]"
              style={{ color: config.statusTextColor }}
            >
              {statusLabel}
            </Typography>
          </div>
        )}

        {/* Ornaments */}
        {config.ornamentTopLeft && (
          <div className="absolute top-0 left-0 z-0">
            <NextImage
              src={config.ornamentTopLeft}
              alt=""
              width={85}
              height={85}
              serverStaticImg={true}
              useSkeleton={false}
              imgClassName="object-left-top"
            />
          </div>
        )}
        {config.ornamentBottomRight && (
          <div className="absolute bottom-0 right-0 z-0">
            <NextImage
              src={config.ornamentBottomRight}
              alt=""
              width={70}
              height={70}
              serverStaticImg={true}
              useSkeleton={false}
              imgClassName="object-right-bottom"
            />
          </div>
        )}
        {config.ornamentTopRight && (
          <div className="absolute top-0 right-0 z-0">
            <NextImage
              src={config.ornamentTopRight}
              alt=""
              width={70}
              height={70}
              serverStaticImg={true}
              useSkeleton={false}
              imgClassName="object-right-top"
            />
          </div>
        )}
        {config.ornamentBottomLeft && (
          <div className="absolute bottom-0 left-0 z-0">
            <NextImage
              src={config.ornamentBottomLeft}
              alt=""
              width={competition === "REII" ? 65 : 60}
              height={competition === "REII" ? 65 : 60}
              serverStaticImg={true}
              useSkeleton={false}
              imgClassName="object-left-bottom"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Typography
            variant="h1"
            weight="bold"
            font="Titillium"
            className="text-white text-center leading-[120%] tracking-wider"
            style={{
              WebkitTextStroke: `2px ${config.textStroke}`,
              fontSize: "64px",
            }}
          >
            {config.name}
          </Typography>
          <Typography
            variant="h6"
            weight="regular"
            font="Titillium"
            className={`text-center leading-[120%] ${
              competition === "REII"
                ? "text-[#0B8457] max-w-[220px]"
                : "text-white max-w-[220px]"
            }`}
            style={
              competition === "REII"
                ? { maxWidth: "220px" }
                : { maxWidth: competition === "BCC" ? "184px" : "220px" }
            }
          >
            {config.fullName}
          </Typography>
          <div className="mt-2 w-[184px] py-2 bg-white/60 rounded-[12px] flex justify-center items-center shadow-sm">
            <Typography
              variant="bt"
              weight="bold"
              font="Titillium"
              className="text-[14px]"
              style={{ color: config.buttonTextColor }}
            >
              {buttonText}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
