"use client";
import Typography from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

import CloudsOverlay from "./CloudsOverlay";

interface TimelineItemProps {
  date: string;
  title: string;
  position: "left" | "right";
  variants: Variants;
}

const TimelineItem = ({
  date,
  title,
  position,
  variants,
}: TimelineItemProps) => {
  return (
    <motion.div variants={variants} className="relative flex w-full min-h-24">
      {/* Icon - Always centered absolute to align with separator */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
        <Image
          src="/images/competition/REII/timeline/timeline-icon.png"
          alt="icon"
          width={74}
          height={74}
          className="max-w-11 lg:max-w-full"
        />
      </div>

      {/* Left Side Container */}
      <div className="w-1/2 pr-8 lg:pr-16 flex flex-col items-end text-right">
        {position === "left" && (
          <div className="pt-2">
            <Typography
              variant="h5"
              font="FiraSans"
              weight="extrabold"
              className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
            >
              {date}
            </Typography>
            <Typography
              variant="t"
              font="FiraSans"
              className="text-[#CF4A4A] text-xs"
            >
              {title}
            </Typography>
          </div>
        )}
      </div>

      {/* Right Side Container */}
      <div className="w-1/2 pl-8 lg:pl-16 flex flex-col items-start text-left">
        {position === "right" && (
          <div className="pt-2">
            <Typography
              variant="h5"
              font="FiraSans"
              weight="extrabold"
              className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
            >
              {date}
            </Typography>
            <Typography
              variant="t"
              font="FiraSans"
              className="text-[#CF4A4A] text-xs"
            >
              {title}
            </Typography>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function Timeline() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const events = [
    {
      date: "February 26 – March 12, 2026",
      title: "Early Registration and Submission",
      position: "right" as const,
    },
    {
      date: "March 13 – April 14, 2026",
      title: "Normal Registration and Submission",
      position: "left" as const,
    },
    {
      date: "April 20, 2026",
      title: "Announcement Semifinal",
      position: "right" as const,
    },
    {
      date: "April 21 – May 4, 2026",
      title: "Semifinal Submission",
      position: "left" as const,
    },
    {
      date: "April 27, 2026",
      title: "Coaching Workshop",
      position: "right" as const,
    },
    {
      date: "May 10, 2026",
      title: "Announcement Final",
      position: "left" as const,
    },
    {
      date: "May 15, 2026",
      title: "Finalist Technical Meeting",
      position: "right" as const,
    },
    {
      date: "May 23, 2026",
      title: "Grand Final",
      position: "left" as const,
    },
  ];

  return (
    <section className="bg-[#F6CE5B] flex flex-col items-center gap-10 lg:gap-24 relative w-full pt-20 pb-80 px-2 overflow-hidden">
      <CloudsOverlay />
      <Image
        src="/images/competition/REII/deco/deco-bottom.svg"
        alt="bottom"
        width={800} // Increased size slightly to match "gede" desc visually if strictly width constrained, but user said height section.
        height={600}
        className="absolute bottom-0 left-0 z-10 w-full md:w-auto max-w-[800px]"
      />
      <Image
        src="/images/competition/REII/deco/red-plane.svg"
        alt="bottom"
        width={300}
        height={300}
        className="absolute bottom-10 right-10 z-10 hidden md:block"
      />

      {/* Title */}
      <div className="relative z-20">
        <Image
          src="/images/competition/REII/timeline/title-bg.png"
          alt="title background"
          width={1085}
          height={74}
          className=""
        />
        <Image
          src="/images/competition/REII/timeline/timeline-title.png"
          alt="timeline title"
          width={362}
          height={74}
          className="absolute top-[12%] sm:top-[15%] left-[35%] max-w-28 sm:max-w-44 md:max-w-56 lg:max-w-full"
        />
      </div>

      <div className="w-full relative z-20">
        <Separator
          orientation="vertical"
          className="
              absolute left-1/2 -translate-x-1/2
              min-w-3 lg:min-w-4 h-full bg-[#CF4A4A] rounded-full
            "
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.2 }}
          className="flex flex-col gap-10 lg:gap-16 mt-6 lg:mt-8 pb-20"
        >
          {events.map((event, index) => (
            <TimelineItem
              key={index}
              date={event.date}
              title={event.title}
              position={event.position}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
