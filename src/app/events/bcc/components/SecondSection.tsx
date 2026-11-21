"use client";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { motion } from "framer-motion";

export default function SecondSection() {
  return (
    <section className="relative w-full min-h-screen md:min-h-[1300px] bg-[#3A6AB2] flex items-center justify-center px-4 py-16 overflow-hidden">
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
      <div className="hidden md:absolute md:block bottom-0 right-32 z-0">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      <div className="hidden md:absolute md:block bottom-12 left-32 z-0">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>

      {/* Card */}
      <motion.div
        className="relative w-full max-w-5xl h-[1150px] md:h-[880px] bg-white rounded-2xl shadow-xl px-6 py-10 md:px-12 md:py-14 overflow-hidden"
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
        }}
      >
        {/* Title */}
        <div className="relative ">
          <NextImage
            src="/landing-page/bcc/technical-guide.webp"
            alt="decor"
            width={620}
            height={120}
            className="absolute left-1/2 -translate-x-1/2 w-[300px] md:w-[620px] md"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 text-[#4FA7A1] mt-20 md:mt-32 lg:max-w-3xl md:max-w-xl text-justify">
          {/* General Rules */}
          <div>
            <Typography
              variant="h2"
              weight="bold"
              className="mb-3 text-[18px] md:text-[22px]"
            >
              General Rules
            </Typography>

            <ol className="list-decimal pl-5 space-y-2 text-[16px] md:text-[18px] leading-relaxed">
              <li>
                FBCC consists of four stages: Preliminary, Semi-final, Pitch
                Deck Workshop, and Final Stage.
              </li>
              <li>
                All submissions must be original works created by the
                participants and must be free from plagiarism of any kind.
              </li>
            </ol>
          </div>

          {/* Participant Requirements */}
          <div>
            <Typography
              variant="h2"
              weight="bold"
              className="mb-3 text-[18px] md:text-[22px]"
            >
              Participant Requirements
            </Typography>

            <ol className="list-decimal pl-5 space-y-2 text-[16px] md:text-[18px] leading-relaxed">
              <li>
                Participants must be active university students, proven by a
                valid Student ID Card.
              </li>
              <li>
                Participants must register as a team, consisting of a minimum of
                2 and a maximum of 3 members.
              </li>
              <li>
                All team members must come from the same university; however,
                they may come from different departments.
              </li>
              <li>
                All submissions must be original works created by the team and
                must not have been previously published or submitted to any
                other competition. Entries submitted elsewhere or recycled from
                past competitions will not be accepted.
              </li>
              <li>
                Any form of cheating or plagiarism will result in score
                deductions and may lead to full disqualification.
              </li>
            </ol>
          </div>
        </div>

        <NextImage
          src="/landing-page/bcc/card-border.svg"
          alt="decor"
          width={1025}
          height={800}
          className="hidden md:absolute md:block bottom-0 right-0 pointer-events-none -z-5"
        />

        <NextImage
          src="/landing-page/bcc/mountain.svg"
          alt="decor"
          width={320}
          height={320}
          className="absolute md:hidden bottom-0 right-0 w-[160px] md:w-[260px] pointer-events-none"
        />
      </motion.div>

      <motion.div
        className="hidden md:absolute md:block top-12 -left-24  pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
        }}
      >
        <NextImage
          src="/landing-page/bcc/yellow-plane.svg"
          alt="decor"
          width={520}
          height={220}
        />
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
        }}
        className="hidden md:absolute md:block -bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <NextImage
          src="/landing-page/bcc/blue-plane.svg"
          alt="decor"
          width={520}
          height={220}
        />
      </motion.div>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
        }}
        className="hidden md:absolute md:block bottom-[11rem] right-0 pointer-events-none"
      >
        <NextImage
          src="/landing-page/bcc/mountain.svg"
          alt="decor"
          width={420}
          height={520}
          className="w-[220px] h-[320px] xl:w-[420px] xl:h-[520px]"
        />
      </motion.div>
    </section>
  );
}
