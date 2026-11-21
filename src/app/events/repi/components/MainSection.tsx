"use client";

import ButtonLink from "@/components/links/button-link";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { motion } from "framer-motion";

const SendSquare2 = ({
  size = 24,
  color = "#000000",
}: { size?: number; color?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.64 12.81L13.02 8.43H10.59C10.18 8.43 9.84 8.09 9.84 7.68C9.84 7.27 10.18 6.93 10.59 6.93H14.83C14.93 6.93 15.02 6.95 15.12 6.99C15.3 7.07 15.45 7.21 15.53 7.4C15.57 7.49 15.59 7.59 15.59 7.69V11.93C15.59 12.34 15.25 12.68 14.84 12.68C14.43 12.68 14.09 12.34 14.09 11.93V9.5L9.7 13.87C9.55 14.02 9.36 14.09 9.17 14.09C8.98 14.09 8.79 14.02 8.64 13.87C8.35 13.58 8.35 13.1 8.64 12.81ZM18.24 17.22C16.23 17.89 14.12 18.23 12 18.23C9.88 18.23 7.77 17.89 5.76 17.22C5.37 17.09 5.16 16.66 5.29 16.27C5.42 15.88 5.84 15.66 6.24 15.8C9.96 17.04 14.05 17.04 17.77 15.8C18.16 15.67 18.59 15.88 18.72 16.27C18.84 16.67 18.63 17.09 18.24 17.22Z"
        fill={color}
      />
    </svg>
  );
};
export default function MainSection() {
  return (
    <>
      <section className="relative min-h-screen bg-[#0F936D] w-full flex items-center justify-center overflow-hidden">
        {/* top clouds */}
        <div className="absolute  top-24 right-12 z-0">
          <NextImage
            src="/landing-page/repi/awan-1-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        <div className="absolute  top-24 left-32 z-0">
          <NextImage
            src="/landing-page/repi/awan-2-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        {/* bottom clouds */}
        <div className="hidden md:absolute md:block top-[100px] right-32 z-0">
          <NextImage
            src="/landing-page/repi/awan-3-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        <div className="hidden md:absolute md:block top-[150px] left-32 z-0">
          <NextImage
            src="/landing-page/repi/awan-2-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        <div className="absolute bottom-[200px] right-0 md:bottom-[100px] z-0">
          <NextImage
            src="/landing-page/repi/awan-3-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="w-[80px] md:w-[191px] looping"
          />
        </div>

        <div className="hidden md:absolute bottom-[50px] left-1/2 -translate-x-1/2 z-0">
          <NextImage
            src="/landing-page/repi/awan-2-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        <div className="absolute bottom-[250px] left-0 md:bottom-[100px] z-0">
          <NextImage
            src="/landing-page/repi/awan-6-timeline.svg"
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
                src="/landing-page/repi/banner-reii.png"
                className="w-full"
                priority
              />

              <div>
                <Typography
                  variant="h2"
                  weight="bold"
                  className="text-[#199A95] text-left"
                >
                  Renewable Energy Paper Idea
                </Typography>
                <Typography
                  className="text-gray-600 mt-2 text-justify"
                  variant="h6"
                >
                  The Renewable Energy Paper Idea (REPI) is a national
                  scientific writing competition designed for university
                  students across Indonesia. This year’s theme,{" "}
                  <span className="text-[#0F936D]">
                    “Accelerating Renewable Energy Implementation through
                    Holistic Innovation for a Sustainable Indonesia 2030,”
                  </span>{" "}
                  invites participants to develop innovative, research-based
                  ideas that support the nation’s transition toward cleaner and
                  more sustainable energy systems.
                </Typography>
              </div>

              <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                <ButtonLink
                  href="/dashboard"
                  className="bg-[#354FB4] hover:bg-[#253884] w-full py-2 lg:py-4 justify-center"
                >
                  <Typography
                    font="Titillium"
                    variant="h6"
                    weight="bold"
                    className="flex gap-2 items-center text-white"
                  >
                    <SendSquare2 size={24} color="white" /> Register Now!
                  </Typography>
                </ButtonLink>

                <ButtonLink
                  href="https://its.id/m/GuidebookPreliminaryREPI26"
                  className="border-[#354FB4] hover:bg-slate-100 border-2 w-full py-2 lg:py-4 justify-center"
                  variant="outline"
                >
                  <Typography
                    font="Titillium"
                    variant="h6"
                    weight="bold"
                    className="flex gap-2 items-center text-blue-700"
                  >
                    <SendSquare2 size={24} color="blue" /> Guidebook
                  </Typography>
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
      <section className="relative w-full min-h-screen md:min-h-[1800px] lg:min-h-[1600px] bg-[#0F936D] flex items-center justify-center px-4 py-16 overflow-hidden">
        {/* top clouds */}
        <div className="absolute  top-24 right-12 z-0">
          <NextImage
            src="/landing-page/repi/awan-1-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        <div className="absolute  top-24 left-32 z-0">
          <NextImage
            src="/landing-page/repi/awan-2-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        {/* bottom clouds */}
        <div className="hidden md:absolute md:block bottom-0 right-32 z-0">
          <NextImage
            src="/landing-page/repi/awan-3-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        <div className="hidden md:absolute md:block bottom-12 left-32 z-0">
          <NextImage
            src="/landing-page/repi/awan-2-timeline.svg"
            alt="cloud"
            width={191}
            height={92}
            className="looping"
          />
        </div>

        {/* Card */}
        <motion.div
          className="relative w-full max-w-5xl min-h-[1700px] md:min-h-[1300px] bg-white rounded-2xl shadow-xl px-6 pt-10 pb-60 md:px-12 md:pt-14 md:pb-56 overflow-hidden"
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
              src="/landing-page/bcc/TECHNICAL-GUIDE.svg"
              alt="decor"
              width={620}
              height={120}
              className="absolute left-1/2 -translate-x-1/2 w-[300px] md:w-[620px] md"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8 text-[#4FA7A1] mt-20 md:mt-32 lg:max-w-3xl md:max-w-[620px] text-justify">
            {/* General Rules */}
            {/* <div>
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
              </div> */}

            {/* Participant Requirements */}
            <div>
              <Typography
                variant="h2"
                weight="bold"
                className="mb-3 text-[18px] md:text-[22px]"
              >
                Terms and Condition
              </Typography>

              <ol className="list-decimal pl-5 space-y-2 text-[16px] md:text-[18px] leading-relaxed">
                <li>
                  The competition is open to all undergraduate and vocational
                  students from any major at universities across Indonesia.
                </li>
                <li>
                  Each team consists of three (3) members and is allowed to have
                  members from different majors, provided they are from the same
                  university.
                </li>
                <li>
                  Participants are not allowed to register in more than one
                  team.
                </li>
                <li>Each university may send more than one team.</li>
                <li>
                  Each team is free to create a team name as its identity;
                  however, the team name must not contain references to a
                  specific university, elements of SARA (ethnicity, religion,
                  race, or intergroup issues), pornography, or any content that
                  violates social norms.
                </li>
                <li>
                  Each team is only allowed to submit one paper that is
                  original, has never been published, and has never been and is
                  not currently being submitted to a similar competition.
                </li>
                <li>
                  Any act of fraud or violation of the competition rules will
                  result in disqualification by the organizing committee.
                </li>
                <li>
                  The submitted paper must be in the form of an abstract and
                  must be relevant to the given theme.
                </li>
                <li>
                  The paper must contain valid data and must include proper
                  sources.
                </li>
                <li>
                  References may be obtained from research results or academic
                  studies supported by literature from books, national, or
                  international scientific journals, which may be attached.
                </li>
                <li>
                  The paper must be written in Indonesian in accordance with the
                  Indonesian Spelling System (EYD).
                </li>
                <li>
                  Any form of fraud is strictly prohibited. If evidence of fraud
                  is found, the organizing committee has the right to disqualify
                  the team and revoke its participation status.
                </li>
                <li>
                  All information and announcements will be delivered to
                  participants through the Futurest 2026 social media accounts
                  or sent directly via email to the team leader.
                </li>
                <li>
                  The decisions of the organizing committee are final and cannot
                  be changed or contested under any circumstances.
                </li>
              </ol>
            </div>
          </div>

          <NextImage
            src="/landing-page/repi/card-border-repi.svg"
            alt="decor"
            width={1030}
            height={1414}
            className="hidden lg:absolute lg:block bottom-0 right-0 pointer-events-none -z-5"
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
          animate={{
            x: ["-20%", "-0%", "-20%"],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <NextImage
            src="/landing-page/bcc/yellow-plane.svg"
            alt="decor"
            width={520}
            height={220}
          />
        </motion.div>

        <motion.div
          animate={{
            x: ["-30%", "-40%", "-30%"],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
    </>
  );
}
