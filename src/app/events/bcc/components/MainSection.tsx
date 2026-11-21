"use client";
import ButtonLink from "@/components/links/button-link";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

export default function MainSection() {
  return (
    <section className="relative min-h-screen bg-[#3A6AB2] w-full flex items-center justify-center overflow-hidden">
      {/* top clouds */}
      <div className="absolute  top-24 right-12 z-0">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      <div className="absolute  top-24 left-32 z-0">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      {/* bottom clouds */}
      <div className="hidden md:absolute md:block top-[100px] right-32 z-0">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      <div className="hidden md:absolute md:block top-[150px] left-32 z-0">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      <div className="absolute bottom-[200px] right-0 md:bottom-[100px] z-0">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={191}
          height={92}
          className="w-[80px] md:w-[191px] looping"
        />
      </div>

      <div className="hidden md:absolute bottom-[50px] left-1/2 -translate-x-1/2 z-0">
        <NextImage
          src="/home/event/cloud-bottom-middle.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      <div className="absolute bottom-[250px] left-0 md:bottom-[100px] z-0">
        <NextImage
          src="/home/event/cloud-bottom-left.svg"
          alt="cloud"
          width={191}
          height={92}
          className="w-[80px] md:w-[191px] looping"
        />
      </div>

      {/* hands */}
      <motion.div
        className="absolute top-[15%] -left-8 md:top-16 md:left-16 z-20"
        initial={{ x: -80, opacity: 0, rotate: -5 }}
        animate={{
          x: 0,
          opacity: 1,
          rotate: [0, -2, 0],
        }}
        transition={{
          x: { duration: 1, ease: "easeOut" },
          opacity: { duration: 0.8 },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <NextImage
          src="/landing-page/bcc/left-palm.svg"
          alt="left palm"
          width={320}
          height={320}
          className="w-[120px] h-[120px] md:w-[320px] md:h-[320px]"
        />
      </motion.div>

      <motion.div
        className="absolute top-[14%] -left-14 md:top-12 md:left-0 z-5"
        initial={{ x: -120, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          y: [0, -12, 0],
        }}
        transition={{
          x: { duration: 1.2, ease: "easeOut" },
          opacity: { duration: 1 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <NextImage
          src="/landing-page/bcc/left-hand.svg"
          alt="left hand"
          width={402}
          height={1162}
          className="w-[160px] h-[400px] md:w-[402px] md:h-[1162px]"
        />
      </motion.div>

      <motion.div
        className="absolute top-[15%] -right-8 md:top-16 md:right-16 z-20"
        initial={{ x: 80, opacity: 0, rotate: 5 }}
        animate={{
          x: 0,
          opacity: 1,
          rotate: [0, 2, 0], // animasi loop
        }}
        transition={{
          x: { duration: 1, ease: "easeOut" },
          opacity: { duration: 0.8 },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <NextImage
          src="/landing-page/bcc/right-palm.svg"
          alt="right palm"
          width={320}
          height={320}
          className="w-[120px] h-[120px] md:w-[320px] md:h-[320px]"
        />
      </motion.div>

      <motion.div
        className="absolute top-[14%] -right-14 md:top-12 md:right-0 z-5"
        initial={{ x: 120, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          y: [0, -12, 0], // floating loop
        }}
        transition={{
          x: { duration: 1.2, ease: "easeOut" },
          opacity: { duration: 1 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <NextImage
          src="/landing-page/bcc/right-hand.svg"
          alt="right hand"
          width={402}
          height={1162}
          className="w-[160] h-[400px] md:w-[402px] md:h-[1162px]"
        />
      </motion.div>

      {/* content */}
      <motion.div
        className="relative -z-5 w-full max-w-5xl px-4 md:px-8 pt-[15rem] pb-[10rem]"
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
        }}
      >
        <div className="bg-white rounded-[16px] p-6 md:p-12 lg:p-16 shadow-2xl relative">
          <div className="flex flex-col gap-6 md:gap-8 relative z-10">
            <NextImage
              alt="BCC Banner"
              width={1000}
              height={219}
              src="/landing-page/bcc/bcc-banner.png"
              className="w-full"
              priority
            />

            <div>
              <Typography
                variant="h2"
                weight="bold"
                className="text-[#199A95] text-left"
              >
                Business Case Competition
              </Typography>
              <Typography
                className="text-gray-600 mt-2 text-justify"
                variant="h6"
              >
                The Futurest Business Case Competition (FBCC) 2026 is a
                university-level competition hosted by the Society of Renewable
                Energy ITS. This year’s theme,{" "}
                <span className="text-[#0F936D]">
                  “Clean Energy Business Innovation for Sustainable Industries,”
                </span>{" "}
                challenges university students to design impactful business
                solutions that leverage environmentally friendly technologies
                and renewable energy. The competition focuses on reducing
                environmental harm, improving energy efficiency, lowering
                operational costs, and strengthening corporate competitiveness
                through sustainable and future-ready business practices.
              </Typography>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-5">
              <ButtonLink
                href="/dashboard"
                className="w-full bg-[#354FB4] hover:bg-blue-700 flex justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Register Now!
              </ButtonLink>

              <ButtonLink
                href="https://its.id/m/KeperluannPesertaFBCC2026"
                className="w-full border-blue-600 text-blue-600 flex justify-center gap-2 hover:bg-slate-100"
                variant="outline"
              >
                <BookOpen className="w-4 h-4" />
                Guidebook
              </ButtonLink>
            </div>
          </div>

          <NextImage
            src="/home/event/event-modal-decor.svg"
            alt="decor"
            width={600}
            height={503}
            className="absolute bottom-0 left-0 opacity-30 pointer-events-none"
          />
        </div>
      </motion.div>
    </section>
  );
}
