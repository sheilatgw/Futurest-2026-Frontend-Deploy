"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { type Transition, motion } from "framer-motion";
import { Book, DirectboxReceive } from "iconsax-react";
// 1. Import useRouter
import { useRouter } from "next/navigation";

const MoreInformation = () => {
  // 2. Inisialisasi router
  const router = useRouter();

  const smoothTransition: Transition = {
    duration: 0.8,
    ease: [0.25, 0.8, 0.25, 1],
  };

  return (
    <section className="max-w-screen min-h-fit md:min-h-screen flex justify-center items-center relative overflow-hidden py-10 md:py-0">
      <div className="flex flex-col items-center gap-10 z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={smoothTransition}
        >
          <NextImage
            src="/events/brand-ambassador/hero-title.svg"
            width={820}
            height={820}
            alt="hero-header"
            className="max-w-screen"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ ...smoothTransition, delay: 0.2 }}
          className="flex flex-row py-6 gap-7 sm:gap-6 md:gap-12 justify-center w-full"
        >
          <Typography
            weight="regular"
            variant="h2"
            className="font-[family-name:var(--font-fira-sans)] text-white text-center"
          >
            For More Information check out the link below
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ ...smoothTransition, delay: 0.3 }}
          className="flex flex-row items-center gap-3 sm:gap-6 z-20 w-full justify-center"
        >
          <div className="flex-1 max-w-32 md:max-w-48 lg:max-w-56">
            <Button
              variant="orange"
              className="w-full h-10 sm:h-14 md:h-16 rounded-xl shadow-lg border-2 sm:border-4 border-[#C84A1F]"
              // 3. Logic External Link (Guidebook)
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
                className="text-white flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-base md:text-lg"
              >
                <Book
                  size={18}
                  color="white"
                  variant="Bold"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                Guidebook
              </Typography>
            </Button>
          </div>

          <div className="flex-1 max-w-32 md:max-w-48 lg:max-w-56">
            <Button
              variant="orange"
              className="w-full h-10 sm:h-14 md:h-16 rounded-xl shadow-lg border-2 sm:border-4 border-[#C84A1F]"
              // 4. Logic Internal Link (Register)
              onClick={() => router.push("/ba")}
            >
              <Typography
                font="Titillium"
                variant="h6"
                weight="bold"
                className="text-white flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-base md:text-lg"
              >
                <DirectboxReceive
                  size={18}
                  color="white"
                  variant="Bold"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                Register Here
              </Typography>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoreInformation;
