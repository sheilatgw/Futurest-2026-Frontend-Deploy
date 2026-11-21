"use client";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-auto md:h-[150vh] min-h-fit overflow-hidden bg-[#3A6AB2] pb-20 md:pb-0">
      {/* TANGAN DAN KAWAN KAWAN */}
      <div className="absolute inset-x-0 -top-[0%] md:top-[0%] lg:-top-[5%] z-20 pointer-events-none w-full h-fit">
        {/* Mobile Version */}
        <div className="block md:hidden">
          <NextImage
            src="/home/hero/futurest-energy-summit.webp"
            alt="Hero Background Mobile"
            width={1080}
            height={1920}
            className="w-full h-auto"
            imgClassName="w-full h-auto object-cover object-top origin-top"
            priority
          />
        </div>
        {/* Desktop Version */}
        <div className="hidden md:block">
          <NextImage
            src="/home/hero/what-is-futurest.svg"
            alt="Hero Background Desktop"
            width={1920}
            height={1080}
            className="w-full h-auto"
            imgClassName="w-full h-auto object-cover object-top origin-top"
            priority
          />
        </div>
      </div>

      {/* AWAN-AWAN */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] top-[10%] w-[80px] md:w-[220px]"
        >
          <NextImage
            src="/home/hero/cloud1.svg"
            alt="Cloud 1"
            width={190}
            height={110}
            imgClassName="opacity-80"
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, -15, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute right-0 top-0 w-[90px] md:w-[160px]"
        >
          <NextImage
            src="/home/hero/cloud2.svg"
            alt="Cloud 2"
            width={160}
            height={80}
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute left-[77.78%] top-[34.23%] w-[70px] md:w-[145px]"
        >
          <NextImage
            src="/home/hero/cloud3.svg"
            alt="Cloud 3"
            width={145}
            height={68}
            imgClassName="opacity-60"
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[60%] w-[60px] md:w-[130px]"
        >
          <NextImage
            src="/home/hero/cloud4.svg"
            alt="Cloud 4"
            width={130}
            height={90}
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute right-0 top-[65%] w-[80px] md:w-[140px]"
        >
          <NextImage
            src="/home/hero/cloud5.svg"
            alt="Cloud 5"
            width={140}
            height={70}
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, -10, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute left-0 bottom-[5%] w-[80px] md:w-[160px]"
        >
          <NextImage
            src="/home/hero/cloud6.svg"
            alt="Cloud 6"
            width={140}
            height={80}
          />
        </motion.div>
        <motion.div
          animate={{ x: [0, 25, 0] }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute right-[10%] bottom-[8%] w-[90px] md:w-[150px]"
        >
          <NextImage
            src="/home/hero/cloud7.svg"
            alt="Cloud 7"
            width={140}
            height={75}
          />
        </motion.div>
      </div>

      {/* ELEMEN UTAMA */}
      <div className="relative z-30 flex flex-col items-center justify-start md:justify-center w-full h-full pt-[20%] md:pt-0">
        <div className="relative flex flex-col items-center justify-start md:justify-center w-full max-w-[1440px] h-full">
          {/* YELLOW CLOUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-[16%] top-[5%] md:top-[20%] z-40 drop-shadow-xl"
          >
            <NextImage
              src="/home/hero/yellow-cloud.svg"
              alt="Yellow Cloud"
              width={150}
              height={100}
              className="w-[80px] md:w-[150px]"
            />
          </motion.div>

          {/* RED CLOUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-[78%] top-[40%] z-40 hidden md:block rotate-[-4.67deg] drop-shadow-lg"
          >
            <NextImage
              src="/home/hero/red-cloud.svg"
              alt="Red Cloud"
              width={120}
              height={80}
              className="w-[120px]"
            />
          </motion.div>

          {/* PESAWAT KIRI */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="absolute left-[5%] top-[15%] md:left-[22%] md:top-[60%] z-50 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]"
          >
            <div className="block md:hidden">
              <NextImage
                src="/home/hero/paper-plane-left-mobile.svg"
                alt="Plane"
                width={85}
                height={85}
                className="w-[85px]"
              />
            </div>
            <div className="hidden md:block">
              <NextImage
                src="/home/hero/paper-plane-left.svg"
                alt="Plane"
                width={438}
                height={480}
                className="w-[25vw] max-w-[438px] min-w-[300px] transform -translate-x-1/2 -translate-y-1/2 origin-center"
              />
            </div>
          </motion.div>

          {/* KATA KATA & TOMBOL*/}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-30 flex flex-col items-center text-center px-4 mt-[300px] md:mt-[350px]"
          >
            <Typography
              as="h2"
              variant="h4"
              font="FiraSans"
              weight="bold"
              className="text-[#FFC533] uppercase leading-tight md:leading-[1.2] text-[20px] md:text-[32px] max-w-[900px] mt-4 md:mt-32 tracking-tighter"
            >
              BOLSTERING GLOBAL PROCESS THROUGH SUSTAINABLE POLICY
            </Typography>

            <Typography
              as="p"
              variant="p"
              font="Sora"
              weight="regular"
              className="text-white text-[14px] md:text-[24px] leading-[20px] md:leading-[32px] max-w-[850px] mt-4 md:mt-8 text-center"
            >
              FUTUREST (Future Energy Summit) stands as Indonesia's grand stage
              for renewable energy, orchestrated by SRE ITS, igniting students
              passion across the nation to pioneer energy transformation through
              innovative exploration and strategic implementation.
            </Typography>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 flex flex-row justify-center items-center px-4 gap-[12px] w-[190px] h-[48px] bg-[#FFC533] rounded-[12px] hover:brightness-105 transition-all"
            >
              <span className="font-sora font-semibold text-[#3E1623] text-[16px]">
                More About Us
              </span>
              <NextImage
                src="/home/hero/arrow-right.svg"
                alt="Arrow"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </motion.button>
          </motion.div>

          {/* PESAWAT KANAN */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="absolute right-[5%] top-[10%] md:right-[22%] md:top-[60%] z-50 filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
          >
            <div className="block md:hidden">
              <NextImage
                src="/home/hero/paper-plane-right-mobile.svg"
                alt="Plane"
                width={100}
                height={100}
                className="w-[100px]"
              />
            </div>
            <div className="hidden md:block">
              <NextImage
                src="/home/hero/paper-plane-right.svg"
                alt="Plane"
                width={609}
                height={780}
                className="w-[35vw] max-w-[609px] min-w-[400px] transform translate-x-1/2 -translate-y-1/2 origin-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
