import NextImage from "@/components/next-image";
import Typography from "@/components/typography";

export default function EmptyCompetitionState() {
  return (
    <>
      <div className="relative w-[100px] h-[100px] md:w-[180px] md:h-[180px] mx-auto">
        <NextImage
          src="/images/dashboard/green-cube.svg"
          alt="Cube"
          width={180}
          height={180}
          serverStaticImg={true}
          className="w-full h-full"
          useSkeleton={false}
        />
      </div>
      <Typography
        variant="h6"
        font="Titillium"
        weight="regular"
        className="mt-8 md:mt-16 text-[#52525B] mx-auto max-w-[351px]"
      >
        You are not currently participating in any competitions
      </Typography>
    </>
  );
}
