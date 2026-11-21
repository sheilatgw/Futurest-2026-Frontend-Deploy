"use client";

import ButtonLink from "@/components/links/button-link";
import Typography from "@/components/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layouts from "@/layouts/Layouts";
import { motion } from "framer-motion";
import Image from "next/image";

// Button Icon
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

export default function REII() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layouts withNavbar>
      <main>
        {/* Our Event */}
        <section className="bg-[#F6CE5B] w-full relative flex flex-col items-center py-20">
          <Card className="bg-white w-[90%] lg:w-[80%] md:pt-4 md:pb-20 md:px-12">
            <CardHeader>
              <Image
                src="/images/competition/REII/our-event/banner.png"
                alt="event banner"
                width={1300}
                height={326}
              />
            </CardHeader>
            <CardContent className="-mt-4 md:mt-0 flex flex-col gap-2 md:gap-4">
              <Typography
                font="FiraSans"
                weight="bold"
                variant="h4"
                className="text-[#199A95]  text-2xl"
              >
                Renewable Energy Innovation Ideas
              </Typography>

              <Typography
                font="Sora"
                variant="h6"
                className="text-justify text-xs md:text-lg lg:text-xl leading-6"
              >
                The Renewable Energy Innovation Idea (REII) is a national-level
                competition designed for high school and vocational school
                students (SMA/SMK/MA or equivalent) across Indonesia. The
                competition encourages young innovators to explore, develop, and
                apply renewable energy technologies while promoting global
                sustainability. The grand theme for 2026 is “Empowering Youth
                for Sustainable Energy Transition.” Participants are challenged
                to propose creative and impactful ideas that support the shift
                toward cleaner, more efficient, and sustainable energy systems.
              </Typography>
            </CardContent>
            <CardFooter className="flex-col lg:flex-row gap-2 lg:mt-8 py-2">
              <ButtonLink
                href="/events/register/reii"
                className="bg-blue-600 hover:bg-blue-700 w-full py-2 lg:py-4 justify-center"
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
                href="https://its.id/m/GuidebookREII26"
                className="border-blue-700 border-2 w-full py-2 lg:py-4 justify-center hover:bg-blue-50"
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
            </CardFooter>
          </Card>
        </section>

        {/* Technical Guide */}
        <section className="bg-[#F6CE5B] w-full relative flex flex-col items-center md:items-start pt-16 md:pt-28 pb-10 md:pl-20 lg:pl-48 xl:pl-56 md:pr-20 overflow-hidden">
          {/* Background Assets */}
          <Image
            src="/images/competition/REII/technical guide/white-line.png"
            alt="technical guide title"
            width={259}
            height={1}
            className="absolute hidden md:block md:max-w-44 lg:max-w-full top-[2%] lg:top-[3%] left-0"
          />
          <Image
            src="/images/competition/REII/technical guide/red-plane.png"
            alt="technical guide title"
            width={149}
            height={1}
            className="absolute hidden md:block md:max-w-28 lg:max-w-full top-0 xl:-top-[1%] left-[15%] lg:left-[20%] xl:left-[15%]"
          />

          {/* Guide Card */}
          <Card className="bg-white w-[90%] lg:w-[82%] xl:w-[80%] px-6 lg:py-10">
            <CardHeader className="md:items-center">
              <Image
                src="/images/competition/REII/technical guide/technical-guide.png"
                alt="technical guide title"
                width={200}
                height={1}
                className="w-full md:max-w-[70%]"
              />
            </CardHeader>
            <CardContent className="mt-2">
              <Typography
                font="FiraSans"
                weight="bold"
                variant="h6"
                className="text-[#199A95] tracking-tighter sm:text-xl"
              >
                Participant Requirements
              </Typography>
              <ol className="list-decimal pl-8 mt-1 text-[#199A95] space-y-1 lg:space-y-2 md:text-xl">
                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Participants are senior high school/vocational high school
                    /Islamic senior high school (SMA/SMK/MA or equivalent)
                    students from all regions of Indonesia.{" "}
                  </Typography>
                </li>
                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Each team consists of 2–3 members from the same school.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Team members may be students from Grade X, XI, or XII only,
                    or a combination of these grades.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Participants are only allowed to join one team.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Each school may send more than one team.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Each team is free to create a team name; however, the team
                    name must not contain elements of SARA (ethnicity, religion,
                    race, or intergroup issues), pornography, or any other
                    content that violates social norms.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Each team may submit only one original work that has never
                    been published and has never been, and is not currently
                    being, submitted to a similar competition.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    The submitted work must use valid data and is required to
                    include proper sources.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    References may be obtained from research results or academic
                    studies supported by literature from books, national or
                    international scientific journals, which may be attached.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    The work must be written in proper and correct Indonesian in
                    accordance with the General Guidelines for Indonesian
                    Spelling (PUEBI).
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    Any form of cheating or violation of the competition rules
                    will result in sanctions in the form of disqualification
                    from REII Futurest 2026.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    All announcements will be delivered to participants through
                    social media accounts, the Futurest 2026 website, or sent
                    directly via email to the team leader.
                  </Typography>
                </li>

                <li>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    The decisions of the organizing committee are final and
                    cannot be contested.
                  </Typography>
                </li>
              </ol>
            </CardContent>
            <CardFooter className="relative min-h-40 md:hidden">
              <Image
                src="/images/competition/REII/technical guide/purple-plane.png"
                alt="purple plane"
                width={252}
                height={145}
                className="absolute rotate-6 sm:-right-[4%]"
              />
              <Image
                src="/images/competition/REII/technical guide/blue-tree.png"
                alt="blue tree"
                width={70}
                height={196}
                className="absolute max-w-14 sm:max-w-full -right-[8%] sm:-right-[4%] sm:bottom-[2%]"
              />
              <Image
                src="/images/competition/REII/technical guide/green-tree.png"
                alt="green tree"
                width={40}
                height={196}
                className="absolute z-10 max-w-8 sm:max-w-full -right-[8%] sm:-right-[4%] bottom-[12%] sm:bottom-[6%]"
              />
              <Image
                src="/images/competition/REII/technical guide/yellow-tree.png"
                alt="yellow tree"
                width={55}
                height={196}
                className="absolute z-10 max-w-11 sm:max-w-full -right-[2%] sm:right-0 bottom-[12%] sm:bottom-[8%]"
              />
              <Image
                src="/images/competition/REII/technical guide/white-cloud.png"
                alt="white cloud"
                width={130}
                height={196}
                className="absolute z-10 max-w-24 sm:max-w-full -right-[8%] sm:-right-[4%] bottom-[10%] sm:bottom-[5%]"
              />
              <Image
                src="/images/competition/REII/technical guide/gray-cloud.png"
                alt="gray cloud"
                width={30}
                height={196}
                className="absolute z-10 -right-[8%] sm:-right-[4%] top-0 sm:-top-[12%]"
              />
            </CardFooter>
          </Card>
          <div className="hidden md:block relative min-h-40 w-full">
            <Image
              src="/images/competition/REII/purple_plane.png"
              alt="purple plane"
              width={500}
              height={145}
              className="absolute max-w-[300px] lg:max-w-sm xl:max-w-full right-[20%] lg:right-[35%] -bottom-[30%] lg:-bottom-[70%] xl:right-[35%] xl:-bottom-[80%]"
            />
            <Image
              src="/images/landing-page/timeline/blue-tree.png"
              alt="blue tree"
              width={456}
              height={196}
              className="absolute max-w-xs lg:max-w-sm xl:max-w-full -scale-x-100 -right-[31%] lg:-right-[25%] xl:-right-[15%] sm:bottom-0"
            />
            <Image
              src="/images/landing-page/timeline/green-tree.png"
              alt="green tree"
              width={300}
              height={196}
              className="absolute z-10 max-w-52 lg:max-w-60 xl:max-w-full -scale-x-100 -right-[26%] lg:-right-[20%] xl:-right-[12%] bottom-0"
            />
            <Image
              src="/images/competition/REII/yellow_tree.png"
              alt="yellow tree"
              width={207}
              height={196}
              className="absolute z-10 max-w-32 lg:max-w-40 xl:max-w-full bottom-0 -right-[0%] lg:right-[4%] xl:right-[6%]"
            />
            <Image
              src="/images/landing-page/timeline/big-cloud.png"
              alt="white cloud"
              width={750}
              height={196}
              className="absolute z-10 max-w-md lg:max-w-xl xl:max-w-full -scale-x-100 -right-[36%] lg:-right-[33%] -bottom-[5%] lg:-bottom-[10%] xl:bottom-0 xl:-right-[25%]"
            />
            <Image
              src="/images/landing-page/timeline/small-cloud.png"
              alt="gray cloud"
              width={327}
              height={196}
              className="absolute z-10 max-w-52 lg:max-w-60 -top-[190%] lg:-top-[230%] -right-[25%] lg:-right-[20%] xl:max-w-full xl:-top-[115%] xl:-right-[18%]"
            />
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[#F6CE5B] flex flex-col items-center gap-10 lg:gap-24 relative w-full px-2 py-20">
          <div className="relative">
            <Image
              src="/images/competition/REII/timeline/title-bg.png"
              alt="title background"
              width={1085}
              height={74}
              className=""
            />
            <Image
              src="/images/competition/REII/timeline/timeline-title.png"
              alt="timeline title"
              width={362}
              height={74}
              className="absolute top-[12%] sm:top-[15%] left-[35%] max-w-28 sm:max-w-44 md:max-w-56 lg:max-w-full"
            />
          </div>
          <div className="w-full">
            <Separator
              orientation="vertical"
              className="
              absolute left-1/2 -translate-x-1/2
              min-w-3 lg:min-w-4 max-h-[850px] lg:max-h-[1077px] bg-[#CF4A4A] rounded-full
            "
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.2 }}
              className="flex flex-col gap-10 lg:gap-16 mt-6 lg:mt-8"
            >
              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-12 text-right" />
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full"
                />
                <div className="w-1/2 pl-2 lg:pl-6">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    February 26 – March 12, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Early Registration and Submission
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-8 lg:pr-16 text-right">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    March 13 – April 14, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Normal Registration and Submission
                  </Typography>
                </div>
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full absolute left-1/2 -translate-x-1/2"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-12 text-right" />
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full"
                />
                <div className="w-1/2 pl-2 lg:pl-6">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    April 20, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Announcement Semifinal
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-8 lg:pr-16 text-right">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    April 21 – May 4, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Semifinal Submission
                  </Typography>
                </div>
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full absolute left-1/2 -translate-x-1/2"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-12 text-right" />
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full"
                />
                <div className="w-1/2 pl-2 lg:pl-6">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    April 27, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Coaching Workshop
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-8 lg:pr-16 text-right">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    May 10, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Announcement Final
                  </Typography>
                </div>
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full absolute left-1/2 -translate-x-1/2"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-12 text-right" />
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full"
                />
                <div className="w-1/2 pl-2 lg:pl-6">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    May 15, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Finalist Technical Meeting
                  </Typography>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex items-start min-h-16"
              >
                <div className="w-1/2 pr-8 lg:pr-16 text-right">
                  <Typography
                    variant="h5"
                    font="FiraSans"
                    weight="extrabold"
                    className="text-[#CF4A4A] text-xs md:text-xl lg:text-2xl"
                  >
                    May 23, 2026
                  </Typography>
                  <Typography
                    variant="t"
                    font="FiraSans"
                    className="text-[#CF4A4A] text-xs"
                  >
                    Grand Final
                  </Typography>
                </div>
                <Image
                  src="/images/competition/REII/timeline/timeline-icon.png"
                  alt="icon"
                  width={74}
                  height={74}
                  className="max-w-11 lg:max-w-full absolute left-1/2 -translate-x-1/2"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </Layouts>
  );
}
