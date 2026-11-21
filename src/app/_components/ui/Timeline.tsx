"use client";
import NextImage from "@/components/next-image";
import { motion } from "framer-motion";
import Sponsor from "./Sponsor";

const Timeline = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full h-full lg:h-full bg-[#FFFAF6] relative overflow-hidden">
      <div className="bg-[#FFC533] h-40 flex justify-center items-center relative z-20">
        <NextImage
          src="/landing-page/sponsor/SPONSOR.png"
          width={278}
          height={96}
          alt="Timeline"
        />
      </div>

      <div className="w-full">
        <div className="lg:hidden">
          <NextImage
            src="/landing-page/timeline/small-cloud.png"
            width={177}
            height={66}
            alt="Small Cloud"
            className="absolute top-[134px] -left-[66px] z-10"
          />

          <NextImage
            src="/landing-page/timeline/mobile-asset.png"
            width={135}
            height={0}
            alt="Mobile Asset"
            className="absolute bottom-[0px] right-0 z-30"
          />
        </div>

        <div className="hidden lg:block w-[50%]">
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[744px] -left-[364px] z-30"
          >
            <NextImage
              src="/landing-page/timeline/big-cloud.webp"
              width={944}
              height={279}
              alt="Big Cloud"
            />
          </motion.div>

          <NextImage
            src="/landing-page/timeline/blue-tree.webp"
            width={548}
            height={936}
            alt="Blue Tree"
            className="absolute top-[25px] -left-[177px]"
          />

          <motion.div
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[120px] left-[75px] z-10"
          >
            <NextImage
              src="/landing-page/timeline/small-cloud.png"
              width={355}
              height={133}
              alt="Small Cloud"
            />
          </motion.div>

          <NextImage
            src="/landing-page/timeline/green-tree.webp"
            width={370}
            height={664}
            alt="Green Tree"
            className="absolute top-[320px] -left-[132px] z-10"
          />

          <NextImage
            src="/landing-page/timeline/yellow-tree.png"
            width={258}
            height={584}
            alt="Yellow Tree"
            className="absolute top-[407px] left-[143px] z-20"
          />
        </div>

        <div className="relative w-full  mx-auto py-9 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2 }}
            className="flex flex-col gap-10 lg:gap-16 mt-6 lg:mt-8"
          >
            <Sponsor />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
