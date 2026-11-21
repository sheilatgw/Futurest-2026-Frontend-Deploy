"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const timelineData = [
  {
    title: "Feb 20 – Mar 12, 2026",
    date: "Early Registration and Submission",
  },
  {
    title: "Mar 13 – Apr 14, 2026",
    date: "Normal Registration and Preliminary Submission",
  },
  { title: "Apr 20, 2026", date: "Announcement Semifinal" },
  { title: "Apr 21 – May 4, 2026", date: "Semifinal Submission" },
  { title: "Apr 28, 2026", date: "Coaching Workshop" },
  { title: "May 10, 2026", date: "Announcement Final" },
  { title: "May 15, 2026", date: "Technical Meeting" },
  { title: "May 23, 2026", date: "Awarding Night" },
];

const timelineDataDesk = [
  {
    title: "February 20 – March 12, 2026",
    date: "Early Bird Registration and Preliminary Submission",
  },
  {
    title: "Mar 13 – Apr 14, 2026",
    date: "Normal Registration and Preliminary Submission",
  },
  { title: "Apr 20, 2026", date: "Announcement Semifinal" },
  { title: "Apr 21 – May 4, 2026", date: "Semifinal Submission" },
  { title: "Apr 28, 2026", date: "Coaching Workshop" },
  { title: "May 10, 2026", date: "Announcement Final" },
  { title: "May 15, 2026", date: "Technical Meeting" },
  { title: "May 23, 2026", date: "Awarding Night" },
];

function useIsMdUp() {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMd(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMd;
}

export default function Timeline() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const isMdUp = useIsMdUp();

  const data = isMdUp ? timelineDataDesk : timelineData;

  return (
    <div className="w-full min-h-screen lg:h-full bg-transparent relative overflow-hidden">
      <div className="w-full flex relative z-10">
        <div className="relative w-full max-w-5xl mx-auto pt-4 pb-12 md:pb-72 md:pt-4 lg:pt-6 lg:pb-80">
          <Separator
            orientation="vertical"
            className="absolute left-1/2 -translate-x-1/2 min-w-3 max-h-[750px] md:max-h-[1070px] lg:max-h-[1200px] bg-[#F6CE5B] rounded-full"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2 }}
            className="flex flex-col gap-10 lg:gap-16 mt-6 lg:mt-8"
          >
            {data.map((item, index) => {
              const isLeft = index % 2 === 1;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-center"
                >
                  {/* LEFT */}
                  <div
                    className={`w-1/2 pr-6 md:pr-9 lg:pr-11 text-right ${
                      !isLeft && "opacity-0"
                    }`}
                  >
                    {isLeft && (
                      <>
                        <Typography
                          variant="h5"
                          font="FiraSans"
                          className="text-white text-[16px] leading-6 font-bold md:text-2xl md:font-bold md:leading-[48px] tracking-tighter md:tracking-tighter"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="t"
                          font="Sora"
                          className="text-white text-xs font-normal leading-6 md:text-2xl md:font-semibold"
                        >
                          {item.date}
                        </Typography>
                      </>
                    )}
                  </div>

                  {/* DOT */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute left-1/2 -translate-x-1/2">
                        <NextImage
                          src="/landing-page/repi/flower.svg" // ganti sesuai path kamu
                          alt="timeline dot"
                          width={70}
                          height={70}
                          className="w-10 h-10 lg:w-16 lg:h-16"
                        />
                      </div>
                    </TooltipTrigger>
                  </Tooltip>

                  {/* RIGHT */}
                  <div
                    className={`w-1/2 pl-6 md:pl-9 lg:pl-11 ${isLeft && "opacity-0"}`}
                  >
                    {!isLeft && (
                      <>
                        <Typography
                          variant="h5"
                          font="FiraSans"
                          className="text-white text-[16px] leading-6 font-bold md:text-2xl md:font-bold md:leading-[48px] tracking-tighter md:tracking-tighter"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="t"
                          font="Sora"
                          className="text-white text-xs font-normal leading-6 md:text-2xl md:font-semibold"
                        >
                          {item.date}
                        </Typography>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
