"use client";
import ButtonLink from "@/components/links/button-link";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { motion } from "framer-motion";
import { ReceiveSquare2 } from "iconsax-react";
import Image from "next/image";

export default function ReRun() {
  return (
    <div className="bg-[#3A6AB2] relative overflow-hidden flex pb-[200px] pt-20 md:py-0 md:justify-center items-center min-h-screen">
      {/* decoration */}
      <NextImage
        src="/landing-page/re-run/deco-left-top.svg"
        alt="deco left top"
        width={137}
        height={93}
        className="absolute left-0 top-[3%] max-md:hidden"
      />
      <NextImage
        src="/landing-page/re-run/deco-left-bottom.svg"
        alt="deco left bottom"
        width={195}
        height={92}
        className="absolute left-[4%] bottom-[15%] max-md:hidden looping"
      />
      <NextImage
        src="/landing-page/re-run/deco-left-bottom-mobile.svg"
        alt="deco bottom mobile"
        width={51}
        height={35}
        className="absolute left-0 bottom-[10%] md:hidden"
      />
      <NextImage
        src="/landing-page/re-run/deco-mid-bottom-mobile.svg"
        alt="deco bottom mobile"
        width={67}
        height={35}
        className="absolute left-[20%] bottom-[3%] md:hidden looping"
      />
      <NextImage
        src="/landing-page/re-run/deco-mid-left.svg"
        alt="deco left mid"
        width={202}
        height={105}
        className="absolute left-[20%] top-[25%] max-md:hidden looping"
      />
      <NextImage
        src="/landing-page/re-run/deco-right-top.svg"
        alt="deco top"
        width={195}
        height={92}
        className="absolute right-[20%] top-[5%] max-md:left-0 max-md:w-[75px] looping"
      />
      <NextImage
        src="/landing-page/re-run/deco-right-top-mobile.svg"
        alt="deco top mobile"
        width={67}
        height={35}
        className="absolute right-0 top-[6%] md:hidden"
      />
      <NextImage
        src="/landing-page/re-run/deco-right-bottom.svg"
        alt="deco right bottom"
        width={202}
        height={105}
        className="absolute right-0 bottom-[5%] max-md:hidden"
      />
      <NextImage
        src="/landing-page/re-run/deco-mid-right.svg"
        alt="deco right mid"
        width={146}
        height={81}
        className="absolute right-[10%] bottom-[50%] max-md:bottom-[10%] max-md:w-[58px] looping"
      />

      {/* Planes with motion */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute 2xl:right-[10%] 2xl:top-[20%] md:right-[5%] md:top-[15%] hidden md:block"
      >
        <NextImage
          src="/landing-page/re-run/paper-plane-purple.svg"
          alt="paper plane right"
          width={228}
          height={262}
        />
      </motion.div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute 2xl:left-[9%] 2xl:bottom-[5%] md:left-[5%] md:bottom-[3%] max-md:bottom-[12%] max-md:-rotate-[22deg] max-md:z-20 max-md:-right-10"
      >
        <NextImage
          src="/landing-page/re-run/paper-plane-red.svg"
          alt="paper plane left"
          width={399}
          height={101}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          {/* <NextImage
            src="/landing-page/re-run/re-run-text.svg"
            alt="re run text"
            width={298}
            height={96}
            className="w-48 md:w-[298px] h-auto"
          /> */}
          <Typography
            font="Pagkaki"
            variant="h1"
            weight="bold"
            className="
    text-center text-5xl md:text-8xl
    text-red-600 
    [-webkit-text-stroke:14px_#FFFFFF] 
    [paint-order:stroke_fill]
  "
          >
            FutureRun x SRE ITS
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="w-full bg-white rounded-3xl overflow-hidden p-6 md:p-10 relative shadow-lg"
        >
          <NextImage
            src="/landing-page/re-run/cloud-yellow.svg"
            alt="cloud yellow"
            width={192}
            height={101}
            className="absolute top-0 right-0 max-md:w-[25%] max-lg:w-[15%] max-md:-top-4"
          />
          <NextImage
            src="/landing-page/re-run/deco-bottom-mobile.svg"
            alt="tree mobile"
            width={333}
            height={409}
            className="absolute bottom-0 left-0 z-20 block md:hidden pointer-events-none"
          />
          <NextImage
            src="/landing-page/re-run/tree.svg"
            alt="tree"
            width={199}
            height={382}
            className="absolute bottom-0 left-0 z-20 md:w-[15%] hidden md:block"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 max-md:pb-10 xl:gap-12">
            {/* Kotak abu abu */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <Image
                src="/images/dashboard/banner-futurerun.webp"
                alt="FutureRun Banner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 text-left">
              <Typography
                font="Sora"
                variant="h2"
                weight="bold"
                className="text-[#199A95]"
              >
                What is FutureRun x SRE ITS?
              </Typography>

              <Typography
                font="Sora"
                variant="t"
                weight="regular"
                className="text-justify"
              >
                FutureRun x SRE ITS is part of FUTUREST 2026, combining a 5 km
                run, education, and entertainment to promote a healthy lifestyle
                and raise awareness of renewable energy and environmental
                sustainability. The event is open to participants from all
                backgrounds and is designed to be engaging and enjoyable. Runner
                benefits :
                <span
                  className="flex flex-col mb-4 mt-2
                "
                >
                  <b>- Exclusive Race Jersey</b>
                  <b>- ⁠Finisher Medal</b>
                  <b>- ⁠BIB Number</b>
                  <b>- ⁠E-Certificate and other benefits</b>
                </span>
                Secure your spot now!
              </Typography>

              <ButtonLink
                // belum tau mau diarahin kemana hrefnya
                href="https://artatix.co.id/event/FutureRunxSREITS"
                variant="primary"
                size="lg"
                className="gap-2 bg-[#354FB4] hover:bg-info-hover"
              >
                <ReceiveSquare2 size="20" color="white" variant="Bold" />
                Register Now!
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
