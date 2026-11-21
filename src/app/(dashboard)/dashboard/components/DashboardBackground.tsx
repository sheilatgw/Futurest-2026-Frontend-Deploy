import NextImage from "@/components/next-image";

export default function DashboardBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[#0B8457]">
        <NextImage
          src="/images/dashboard/bg-pattern.png"
          alt="Background"
          width={1920}
          height={1080}
          serverStaticImg={true}
          useSkeleton={false}
          className="h-full w-full"
          imgClassName="object-cover h-full w-full opacity-40"
          priority
        />
      </div>

      {/* Desktop Ornaments */}
      <div className="fixed left-0 top-0 z-0 hidden md:block">
        <NextImage
          src="/images/dashboard/desktop-top-left.svg"
          alt=""
          width={525}
          height={525}
          serverStaticImg={true}
          useSkeleton={false}
        />
      </div>
      <div className="fixed bottom-0 right-0 z-0 hidden md:block">
        <NextImage
          src="/images/dashboard/desktop-bottom-right.svg"
          alt=""
          width={700}
          height={525}
          serverStaticImg={true}
          useSkeleton={false}
        />
      </div>

      {/* Mobile Decoration */}
      <div className="fixed bottom-6 -right-4 z-0 md:hidden">
        <NextImage
          src="/images/dashboard/blue-star.svg"
          alt="Blue Star"
          width={110}
          height={110}
          className="w-[90px]"
          serverStaticImg={true}
          useSkeleton={false}
        />
      </div>
    </>
  );
}
