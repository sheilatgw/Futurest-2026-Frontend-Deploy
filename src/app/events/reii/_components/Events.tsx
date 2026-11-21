"use client";
import Typography from "@/components/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

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

import CloudsOverlay from "./CloudsOverlay";
import { motion } from "framer-motion";
import ButtonLink from "@/components/links/button-link";

export default function Events() {
  return (
    <section className="bg-[#F6CE5B] w-full relative flex flex-col items-center py-20 overflow-hidden">
      <CloudsOverlay />
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute md:w-[350px] w-[100px] top-0 bottom-0 left-0 z-10"
      >
        <Image
          src="/images/competition/REII/deco/lengan-kiri.svg"
          alt="right-hand"
          width={350}
          height={250}
          className="w-full h-full object-contain object-left"
        />
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute md:w-[350px] w-[100px] top-0 bottom-0 right-0 z-10"
      >
        <Image
          src="/images/competition/REII/deco/lengan-kanan.svg"
          alt="right-hand"
          width={350}
          height={250}
          className="w-full h-full object-contain object-right"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-[90%] lg:w-[80%] relative z-20"
      >
        <Card className="bg-white w-full pb-10 md:pt-4 md:pb-20 md:px-12 relative overflow-visible">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute md:w-[250px] w-[130px] -top-[12%] -right-[5%]"
          >
            <Image
              src="/images/competition/REII/deco/tangan-kanan.svg"
              alt="right-hand"
              width={250}
              height={250}
            />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute md:w-[250px] w-[130px] -top-[12%] -left-[5%]"
          >
            <Image
              src="/images/competition/REII/deco/tangan-kiri.svg"
              alt="right-hand"
              width={250}
              height={250}
            />
          </motion.div>

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
              sustainability. The grand theme for 2026 is “Empowering Youth for
              Sustainable Energy Transition.” Participants are challenged to
              propose creative and impactful ideas that support the shift toward
              cleaner, more efficient, and sustainable energy systems.
            </Typography>
          </CardContent>
          <CardFooter className="flex-col lg:flex-row gap-2 lg:mt-8 py-2">
            <ButtonLink
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 w-full py-2 lg:py-4"
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
              className="border-blue-700 border-2 w-full py-2 lg:py-4"
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
      </motion.div>
    </section>
  );
}
