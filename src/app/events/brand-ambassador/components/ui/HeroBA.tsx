"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { type Transition, motion } from "framer-motion";
import { Book, DirectboxReceive } from "iconsax-react";
import { useRouter } from "next/navigation";

const HeroBA = () => {
  const router = useRouter();
  const smoothTransition: Transition = {
    duration: 1,
    ease: [0.25, 0.8, 0.25, 1],
  };

  return (
    <section className="max-w-screen min-h-fit md:min-h-screen flex justify-center items-center py-10 md:py-0 overflow-hidden">
      <div className="flex flex-col items-center gap-10 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={smoothTransition}
        >
          <NextImage
            src="/events/brand-ambassador/hero-title.svg"
            width={1120}
            height={1000}
            alt="hero-header"
            className="max-w-screen"
          />
        </motion.div>

        <div className="flex flex-row gap-3 sm:gap-6 md:gap-12 justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="flex-1 max-w-32 md:max-w-48 lg:max-w-64"
          >
            <Button
              variant="orange"
              className="w-full h-10 sm:h-12 md:h-14"
              // 3. Logic External Link (Tab Baru)
              onClick={() =>
                window.open(
                  "https://its.id/m/GuidebookBrandAmbassador2026",
                  "_blank",
                )
              }
            >
              <Typography
                font="Titillium"
                variant="h6"
                weight="bold"
                className="text-white flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base"
              >
                <Book
                  size={18}
                  color="white"
                  variant="Bold"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                Guidebook
              </Typography>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ ...smoothTransition, delay: 0.4 }}
            className="flex-1 max-w-32 md:max-w-48 lg:max-w-64"
          >
            <Button
              variant="orange"
              className="w-full h-10 sm:h-12 md:h-14"
              // 4. Logic Internal Navigation (Router Push)
              onClick={() => router.push("/ba")}
            >
              <Typography
                font="Titillium"
                variant="h6"
                weight="bold"
                className="text-white flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base"
              >
                <DirectboxReceive
                  size={18}
                  color="white"
                  variant="Bold"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                Register
              </Typography>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBA;
