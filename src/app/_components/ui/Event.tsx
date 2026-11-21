"use client";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
// import Link from "next/link"; // Hapus ini karena bikin error nesting
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation"; // Pake useRouter buat navigasi manual
import { useRef } from "react";

export default function Event() {
  const _router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // --- SAFE NAVIGATION HANDLER ---
  // Ini obat buat error 'removeChild'.
  // Kita hindari nesting <a><button></a> dan kasih jeda dikit buat cleanup animasi.
  const handleRegister = () => {
    setTimeout(() => {
      window.location.replace("/dashboard");
    }, 150);
  };

  // Kita bikin track scroll sepanjang 2.5x layar (250vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- ANIMATION VALUES ---
  // 1. Scale: Dari kecil (0.5) zoom in ke normal (1)
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);

  // 2. Opacity: Dari agak transparan ke jelas
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 3. Hand Movement: Tangan kebuka (geser ke samping) pas card muncul
  const xLeftHand = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const xRightHand = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    // Height 250vh = User harus scroll sejauh 2.5 layar buat nyelesain animasi ini
    <div ref={containerRef} className="relative h-[250vh] bg-[#3A6AB2]">
      {/* Sticky Container: Ini yang bikin efek "Diem tapi Gerak" */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Wrapper Utama Animasi Zoom */}
        <motion.div
          style={{ scale, opacity }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* --- CLOUDS: Floating Animation (Infinite Loop) --- */}
          {/* Cloud Top Right */}
          <motion.div
            animate={{
              y: [0, -15, 0], // Floating up and down
              x: [0, 10, 0], // Drifting slightly right
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
            className="hidden md:block md:absolute top-[100px] right-32 z-0"
          >
            <NextImage
              src="/home/event/cloud-top-right.svg"
              alt="cloud decoration"
              width={191}
              height={92}
            />
          </motion.div>

          {/* Cloud Top Left */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1, // Offset delay so they don't move in sync
            }}
            className="hidden md:block md:absolute top-[150px] left-32 z-0"
          >
            <NextImage
              src="/home/event/cloud-top-left.svg"
              alt="cloud decoration"
              width={191}
              height={92}
            />
          </motion.div>

          {/* Cloud Bottom Right */}
          <motion.div
            animate={{
              x: [0, 15, 0], // More horizontal movement for bottom clouds
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-[200px] right-0 md:bottom-[100px] z-0"
          >
            <NextImage
              src="/home/event/cloud-bottom-right.svg"
              alt="cloud decoration"
              width={191}
              height={92}
              className="w-[80px] h-[45px] md:w-[191px] md:h-[92px]"
            />
          </motion.div>

          {/* Cloud Bottom Middle */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="hidden md:block md:absolute bottom-[50px] left-1/2 -translate-x-1/2 z-0"
          >
            <NextImage
              src="/home/event/cloud-bottom-middle.svg"
              alt="cloud decoration"
              width={191}
              height={92}
            />
          </motion.div>

          {/* Cloud Bottom Left */}
          <motion.div
            animate={{
              x: [0, -15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute bottom-[250px] left-0 md:bottom-[100px] z-0"
          >
            <NextImage
              src="/home/event/cloud-bottom-left.svg"
              alt="cloud decoration"
              width={191}
              height={92}
              className="w-[80px] h-[45px] md:w-[191px] md:h-[92px]"
            />
          </motion.div>

          {/* --- TITLE: Gentle Pulse --- */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1], // Subtle breathing effect
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[50px] md:top-[100px] z-10"
          >
            <NextImage
              src="/home/event/our-event-title.svg"
              alt="title decoration"
              width={420}
              height={420}
              className="w-[200px] h-[200px] md:w-[420px] md:h-[420px]"
            />
          </motion.div>

          {/* --- HANDS: Gentle Swaying --- */}
          {/* Left Palm & Hand Group */}
          <motion.div
            animate={{
              rotate: [0, -2, 0], // Very subtle rotation (sway)
              x: [0, -5, 0], // Slight horizontal move
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-[15rem] md:top-[12rem] z-20 origin-bottom-left" // Rotate from bottom
          >
            <NextImage
              src="/home/event/palm-left.svg"
              alt="left palm"
              width={206}
              height={281}
              className="w-[100px] md:w-[206px] md:ml-[47px]"
            />
            <NextImage
              src="/home/event/hand-left.svg"
              alt="left hand"
              width={272}
              height={1162}
              className="w-[80px] md:w-[272px] -mt-10"
            />
          </motion.div>

          {/* Right Palm & Hand Group */}
          <motion.div
            animate={{
              rotate: [0, 2, 0], // Sway opposite direction
              x: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1, // Sync offset
            }}
            className="absolute right-0 top-[15rem] md:top-[12rem] z-20 flex flex-col items-end origin-bottom-right" // Rotate from bottom
          >
            <NextImage
              src="/home/event/palm-right.svg"
              alt="right palm"
              width={206}
              height={281}
              className="w-[100px] md:w-[206px] md:mr-[47px]"
            />
            <NextImage
              src="/home/event/hand-right.svg"
              alt="right hand"
              width={272}
              height={1162}
              className="w-[80px] md:w-[272px] -mt-10"
            />
          </motion.div>

          {/* --- DECORATION HANDS (Ikut Zoom + Gerak Dikit) --- */}
          <motion.div
            style={{ x: xLeftHand }}
            className="absolute left-0 md:left-[5%] top-1/2 -translate-y-1/2 z-20 hidden md:block"
          >
            <NextImage
              src="/home/event/hand-left.svg"
              alt="left hand"
              width={272}
              height={1162}
              className="w-[200px]"
            />
          </motion.div>

          <motion.div
            style={{ x: xRightHand }}
            className="absolute right-0 md:right-[5%] top-1/2 -translate-y-1/2 z-20 hidden md:block"
          >
            <NextImage
              src="/home/event/hand-right.svg"
              alt="right hand"
              width={272}
              height={1162}
              className="w-[200px]"
            />
          </motion.div>

          {/* --- MAIN CARD --- */}
          {/* Card ini akan scaling up di tengah layar */}
          <div className="relative z-30 w-full max-w-5xl px-4 md:px-8 mt-10">
            <div className="bg-white w-full h-fit rounded-[16px] overflow-hidden p-6 md:p-12 lg:p-16 shadow-2xl relative">
              <div className="flex flex-col gap-6 md:gap-8 relative z-20">
                {/* Event Image */}
                <div className="w-full">
                  <NextImage
                    alt="Future Talk Banner"
                    width={1000}
                    height={219}
                    src="/home/minicase-header.webp"
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 text-center md:text-left">
                  <Typography
                    variant="h2"
                    weight="bold"
                    className="text-[#199A95] text-[20px] md:text-[28px]"
                  >
                    Future Talk x Mini Case
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-[14px] md:text-[18px] leading-relaxed text-gray-600"
                  >
                    FutureTalk X Minicase is an innovation platform for
                    university students that designed to encourage the creation
                    of creative ideas and sustainable solutions in the energy
                    sector.
                  </Typography>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full mt-2">
                  {/* FIX 1: Hapus <Link>, ganti logic pake onClick + router.push */}
                  {/* Ini mencegah nesting <a><button></a> yang bikin error removeChild */}
                  <div className="w-full flex-1">
                    <Button
                      onClick={handleRegister}
                      className="w-full justify-center gap-2 items-center bg-[#354FB4] hover:bg-blue-700 py-3 md:py-4 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Register Now!
                    </Button>
                  </div>

                  <a
                    href="https://drive.google.com/file/d/1L1FLrPgxbUCQCiDrARHwOpTf4kW0yPHX/view?usp=sharing"
                    className="w-full flex-1 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="w-full pointer-events-none justify-center flex gap-2 items-center border-2 border-blue-600 font-semibold text-blue-600 py-3 md:py-4 group-hover:bg-blue-50"
                      variant="outline"
                    >
                      <BookOpen className="w-4 h-4" />
                      Guidebook
                    </Button>
                  </a>
                </div>
              </div>

              {/* Inner Card Decor */}
              <NextImage
                src="/home/event/event-modal-decor.svg"
                alt="decoration"
                width={600}
                height={503}
                className="absolute bottom-0 left-0 w-[200px] md:w-[400px] lg:w-[600px] opacity-30 z-10 pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
