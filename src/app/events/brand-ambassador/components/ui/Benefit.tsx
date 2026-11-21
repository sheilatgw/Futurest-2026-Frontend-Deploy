"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { type Transition, motion } from "framer-motion";

const Benefit = () => {
  const benefitList = [
    "Get the opportunity to develop soft skills and hard skills.",
    "Expand relationships in both internal and external scopes",
    "Get valuable experience as a Futurest 2026 Brand Ambassador",
    "Have the opportunity to win an award as the best Brand Ambassador",
    "Get Free Futurest 2026 Merchandise",
    "Get a Certificate as a Futurest 2026 Brand Ambassador.",
  ];

  const smoothTransition: Transition = {
    duration: 0.8,
    ease: [0.25, 0.8, 0.25, 1],
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: smoothTransition,
    },
  };

  const floatTransition: Transition = {
    repeat: Number.POSITIVE_INFINITY,
    duration: 7,
    ease: "easeInOut",
  };

  return (
    <section className="relative w-full min-h-fit md:min-h-screen  px-4 overflow-hidden flex items-center justify-center py-10 md:py-0">
      {/* container utama */}
      <div className="relative w-full max-w-[1279px] min-h-[160px] md:min-h-[410px] bg-[#B3411B] rounded-[12px] md:rounded-[17.38px] p-3 md:p-12 lg:p-16 flex flex-row items-center gap-1 md:gap-10 shadow-xl overflow-hidden">
        {/* awan kanan atas */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            ...floatTransition,
            duration: 7,
          }}
          className="absolute sm:-top-2 sm:-right-2 right-0 top-0 z-0"
        >
          <NextImage
            src="/events/brand-ambassador/benefit-cloud-right.svg"
            alt="cloud decoration"
            width={196}
            height={104}
            className="w-[50px] sm:w-[100px] md:w-[160px] lg:w-[196px] h-auto"
            imgClassName="object-right-top"
          />
        </motion.div>

        {/* awan kiri bawah */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            ...floatTransition,
            duration: 9,
            delay: 0.5,
          }}
          className="absolute bottom-0 left-0 z-0 sm:-bottom-1 sm:-left-1"
        >
          <NextImage
            src="/events/brand-ambassador/benefit-cloud-left.svg"
            alt="cloud decoration"
            width={527}
            height={198}
            className="w-[70px] sm:w-[140px] md:w-[240px] lg:w-[280px] h-auto"
            imgClassName="object-left-bottom"
          />
        </motion.div>

        {/* benefits text */}

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={smoothTransition}
          className="w-[42%] flex justify-start z-20"
        >
          <NextImage
            src="/events/brand-ambassador/txt-benefits-ba.svg"
            alt="Benefits of Being BA"
            width={475}
            height={283}
            className="w-full h-auto max-w-[475px]"
          />
        </motion.div>

        {/* list benefits */}
        <div className="w-[58%] z-20 pt-1 md:pt-6">
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="space-y-1 md:space-y-3 lg:space-y-4"
          >
            {benefitList.map((text, index) => (
              <motion.li
                key={index}
                variants={item}
                className="flex items-start gap-1 md:gap-3"
              >
                <span className="mt-[4px] md:mt-[8px] lg:mt-[10px] w-0.5 h-0.5 md:w-1.5 md:h-1.5 bg-white flex-shrink-0" />

                <Typography
                  variant="h6"
                  font="Titillium"
                  weight="semibold"
                  className="text-white leading-[115%] text-[6.5px] sm:text-[11px] md:text-[16px] lg:text-[20px]"
                >
                  {text}
                </Typography>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
