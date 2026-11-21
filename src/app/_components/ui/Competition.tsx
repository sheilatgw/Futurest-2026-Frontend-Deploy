"use client";
import NextImage from "@/components/next-image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Amplop from "./Amplop";

gsap.registerPlugin(ScrollTrigger);

export default function Competition() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Refs buat Card
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // Refs buat Pesawat
  const planePurpleRef = useRef(null);
  const planeRedRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================================
      // 1. DESKTOP ANIMATION (Min-width: 768px)
      // =========================================
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            pin: true, // Desktop: Sticky
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // --- Phase 1: Pesawat (Desktop) ---
        tl.fromTo(
          planePurpleRef.current,
          { y: "120vh", x: -200, rotation: -90, opacity: 0 },
          {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
        )
          .fromTo(
            planeRedRef.current,
            { y: "120vh", x: 200, rotation: 90, opacity: 0 },
            {
              y: 0,
              x: 0,
              rotation: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            "<",
          )
          // --- Phase 2: Kartu (Desktop) ---
          .fromTo(
            card1Ref.current,
            { y: 150, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" },
            "-=0.5",
          )
          .fromTo(
            card2Ref.current,
            { y: 150, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" },
            "-=0.2",
          )
          .fromTo(
            card3Ref.current,
            { y: 150, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" },
            "-=0.2",
          );
      });

      // =========================================
      // 2. MOBILE ANIMATION (Max-width: 767px)
      // =========================================
      mm.add("(max-width: 767px)", () => {
        // Mobile: Ga pake PIN, biar container bisa manjang ke bawah dan ga kepotong

        // Animasi Pesawat Merah (Mobile version)
        gsap.fromTo(
          planeRedRef.current,
          { y: 100, x: 100, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%", // Trigger pas user scroll dikit
              scrub: 1,
            },
          },
        );

        // Animasi Kartu: Staggered Fade Up (Satu-satu muncul pas discroll)
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
        cards.forEach((card, _i) => {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1)",
              scrollTrigger: {
                trigger: card, // Trigger per kartu
                start: "top 85%", // Muncul pas kartu masuk viewport bawah
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      // UPDATE CSS:
      // 1. h-screen -> min-h-screen (Biar mobile bisa manjang sesuai konten)
      // 2. md:h-screen (Desktop tetep fixed height buat pinning)
      // 3. py-20 (Mobile dikasih padding atas bawah biar ga mepet)
      className="bg-[#3A6AB2] relative overflow-hidden flex flex-col justify-center items-center w-full min-h-screen py-24 md:py-0 md:h-screen"
    >
      {/* --- DECORATION AREA --- */}
      <NextImage
        src="/landing-page/re-run/deco-left-top.svg"
        alt="deco"
        width={137}
        height={93}
        className="absolute left-0 top-[3%] max-md:hidden pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-left-bottom.svg"
        alt="deco"
        width={195}
        height={92}
        className="absolute left-[4%] bottom-[15%] max-md:hidden looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-left-bottom-mobile.svg"
        alt="deco"
        width={51}
        height={35}
        className="absolute left-0 bottom-[10%] md:hidden pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-mid-bottom-mobile.svg"
        alt="deco"
        width={67}
        height={35}
        className="absolute left-[20%] bottom-[3%] md:hidden looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-mid-left.svg"
        alt="deco"
        width={202}
        height={105}
        className="absolute left-[20%] top-[25%] max-md:hidden looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-right-top.svg"
        alt="deco"
        width={195}
        height={92}
        className="absolute right-[20%] top-[5%] max-md:left-0 max-md:w-[75px] looping pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-right-top-mobile.svg"
        alt="deco"
        width={67}
        height={35}
        className="absolute right-0 top-[6%] md:hidden pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-right-bottom.svg"
        alt="deco"
        width={202}
        height={105}
        className="absolute right-0 bottom-[5%] max-md:hidden pointer-events-none"
      />
      <NextImage
        src="/landing-page/re-run/deco-mid-right.svg"
        alt="deco"
        width={146}
        height={81}
        className="absolute right-[10%] bottom-[50%] max-md:bottom-[10%] max-md:w-[58px] looping pointer-events-none"
      />

      {/* --- MOTION ELEMENTS --- */}
      <div
        ref={planePurpleRef}
        className="absolute 2xl:right-[10%] 2xl:top-[20%] md:right-[5%] md:top-[15%] hidden md:block pointer-events-none z-20"
      >
        <NextImage
          src="/landing-page/re-run/paper-plane-purple.svg"
          alt="paper plane"
          width={228}
          height={262}
        />
      </div>

      <div
        ref={planeRedRef}
        className="absolute 2xl:left-[9%] 2xl:bottom-[5%] md:left-[5%] md:bottom-[3%] max-md:bottom-[12%] max-md:-right-10 pointer-events-none z-20"
      >
        <NextImage
          src="/landing-page/re-run/paper-plane-red.svg"
          alt="paper plane"
          width={399}
          height={101}
          className="max-md:w-[200px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 w-full max-w-[1440px] px-4 md:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <NextImage
            src="/landing/competition/Competition-Text.webp"
            alt="re run text"
            width={472}
            height={96}
            className="w-[345px] md:w-[472px] h-auto"
          />
        </motion.div>

        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 items-center justify-center w-full pb-10 md:pb-0"
        >
          <div ref={card1Ref} className="w-full md:flex-1 md:min-w-0 opacity-0">
            <Amplop
              imageSrc="/landing/competition/reii.png"
              imageSrcMobile="/landing/competition/reii-mobile.png"
              className="w-full"
              registerLink="/events/reii"
              guidebookLink="https://its.id/m/GuidebookREII26"
            />
          </div>
          <div ref={card2Ref} className="w-full md:flex-1 md:min-w-0 opacity-0">
            <Amplop
              imageSrc="/landing/competition/repi.png"
              imageSrcMobile="/landing/competition/repi-mobile.png"
              className="w-full"
              registerLink="/events/repi"
              guidebookLink="https://its.id/m/GuidebookPreliminaryREPI26"
            />
          </div>
          <div ref={card3Ref} className="w-full md:flex-1 md:min-w-0 opacity-0">
            <Amplop
              imageSrc="/landing/competition/bcc.png"
              imageSrcMobile="/landing/competition/bcc-mobile.png"
              className="w-full"
              registerLink="/events/bcc"
              guidebookLink="https://its.id/m/KeperluannPesertaFBCC2026"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
