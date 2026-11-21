import NextImage from "@/components/next-image";

export default function AnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" grid min-h-screen lg:grid-cols-2 overflow-hidden">
      <div className="hidden md:block col-span-1 overflow-hidden lg:h-screen bg-[url(/images/oprec-staff/bg.svg)] bg-cover bg-center z-10"></div>
      <div className="relative col-span-1 grid h-full w-full place-items-center py-6 px-4 max-lg:px-4 max-md:pb-12">
        {/* <div className="absolute inset-0 bg-black z-50"></div> */}
        {children}

        <NextImage
          src={`/announcement/ombak.svg`}
          alt="star"
          className="absolute bottom-0 right-0 -z-10 "
          width={820}
          height={820}
          draggable={false}
        />

        <NextImage
          src={`/announcement/dekor-tk.svg`}
          alt="star"
          className="hidden md:absolute md:block  top-[15rem] -left-[8rem]  -z-10 "
          width={250}
          height={150}
          draggable={false}
        />

        <NextImage
          src={`/announcement/dekor-ak.svg`}
          alt="star"
          className="absolute top-0 right-0 -z-10 "
          width={200}
          height={150}
          draggable={false}
        />
      </div>
    </section>
  );
}
