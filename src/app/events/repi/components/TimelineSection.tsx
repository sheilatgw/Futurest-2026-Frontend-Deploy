"use client";
import NextImage from "@/components/next-image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Timeline from "./Timeline";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        envelopeRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: envelopeRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        boxRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);
  return (
    <div
      // ref={containerRef}
      // UPDATE CSS:
      // 1. h-screen -> min-h-screen (Biar mobile bisa manjang sesuai konten)
      // 2. md:h-screen (Desktop tetep fixed height buat pinning)
      // 3. py-20 (Mobile dikasih padding atas bawah biar ga mepet)
      className="bg-[#0F936D] relative overflow-hidden flex flex-col justify-center items-center w-full min-h-screen py-12 md:py-24 md:min-h-screen"
    >
      {/* --- DECORATION AREA --- */}
      <NextImage
        src="/landing-page/repi/awan-1-timeline.svg"
        alt="cloud"
        width={195}
        height={92}
        className="absolute left-[40%] top-[2%] w-[25%] md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-2-timeline.svg"
        alt="cloud"
        width={195}
        height={92}
        className="absolute left-[10%] top-[17%] w-[17%] md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-3-timeline.svg"
        alt="cloud"
        width={195}
        height={92}
        className="absolute right-[10%] top-[11%] w-[20%] md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-4-timeline.svg"
        alt="cloud"
        width={195}
        height={92}
        className="absolute -right-[1%] top-[30%] max-md:hidden md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-3-timeline.svg"
        alt="cloud"
        width={150}
        height={92}
        className="absolute left-[10%] top-[38%] max-md:hidden md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-5-timeline.svg"
        alt="cloud"
        width={195}
        height={92}
        className="absolute right-[7%] top-[46%] w-[18%] md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-8-timeline.svg"
        alt="cloud"
        width={195}
        height={92}
        className="absolute -left-[5%] top-[54%] w-[22%] md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-3-timeline.svg"
        alt="cloud"
        width={145}
        height={92}
        className="absolute right-[13%] top-[61%] max-md:hidden md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-8-timeline.svg"
        alt="cloud"
        width={165}
        height={92}
        className="absolute left-[15%] top-[70%] w-[18%] md:w-[20%] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/repi/awan-10-timeline.svg"
        alt="cloud"
        width={165}
        height={92}
        className="absolute left-[50%] top-[80%] w-[17%] md:w-[20%] looping pointer-events-none"
      />
      <div
        ref={envelopeRef}
        className="absolute left-0 bottom-0 w-[40%] pointer-events-none"
      >
        <NextImage
          src="/landing-page/repi/amplop-bawah.svg"
          alt="envelope"
          width={586}
          height={500}
          className="w-full h-auto"
        />
      </div>

      <div
        ref={boxRef}
        className="absolute left-[20%] bottom-0 w-[40%] md:w-[50%] pointer-events-none"
      >
        <NextImage
          src="/landing-page/repi/box-bawah.svg"
          alt="box"
          width={567}
          height={440}
          className="w-full h-auto"
        />
      </div>

      {/* --- MOTION ELEMENTS --- */}
      <motion.div
        animate={{
          x: ["-50%", "-40%", "-50%"],
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute 2xl:right-[28%] 2xl:top-[15%] md:right-[36%] md:top-[12%] hidden md:block pointer-events-none z-20"
      >
        <NextImage
          src="/landing-page/repi/plane-biru.svg"
          alt="blue plane"
          width={400}
          height={102}
        />
      </motion.div>

      <motion.div
        animate={{
          x: ["-50%", "-40%", "-50%"],
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute 2xl:right-[14%] 2xl:bottom-[10%] md:right-[15%] md:bottom-[10%] max-md:bottom-[7%] max-md:right-[10%] pointer-events-none z-20"
      >
        <NextImage
          src="/landing-page/repi/plane-merah.svg"
          alt="red plane"
          width={472}
          height={224}
          className="max-md:w-[250px]"
        />
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-0 w-full max-w-[1440px] px-0 md:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="flex justify-center items-center"
        >
          <NextImage
            src="/landing-page/repi/pita-timeline.webp"
            alt="re run text"
            width={1085}
            height={306}
            className="w-full sm:w-[75%] md:w-[78%] lg:w-[95%] h-auto"
          />
        </motion.div>
        <Timeline />
      </div>
    </div>
  );
}
