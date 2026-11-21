"use client";

import NextImage from "@/components/next-image";
import { type Transition, motion } from "framer-motion";

export default function Timeline() {
  const smoothTransition: Transition = {
    duration: 1.2,
    ease: [0.25, 0.8, 0.25, 1],
  };

  return (
    <div className="relative w-full min-h-fit md:min-h-screen overflow-hidden flex items-center justify-center py-10 md:py-0">
      {/* timeline banner  */}
      <div className="relative inset-0 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={smoothTransition}
        >
          <NextImage
            src="/events/brand-ambassador/timeline-banner.svg"
            alt="timeline banner text"
            width={1482}
            height={718}
            className=" h-auto max-w-[1482px] "
          />
        </motion.div>

        {/* timeline arrow */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ ...smoothTransition, delay: 0.3 }}
          className="absolute left-0 top-[30%] "
        >
          <NextImage
            src="/events/brand-ambassador/timeline-arrow.svg"
            alt="timeline path"
            width={1440}
            height={718}
            className=" h-auto max-w-[1440px] "
          />
        </motion.div>
      </div>
    </div>
  );
}
