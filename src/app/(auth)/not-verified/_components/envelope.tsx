"use client";

import { motion } from "framer-motion";

export default function AnimatedEnvelope() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow Circle (SVG based) */}
      <circle cx="60" cy="60" r="50" fill="white" fillOpacity="0.1" />

      {/* Motion Wrapper biar amplopnya 'bernapas' */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Amplop Belakang */}
        <path d="M30 45H90V85H30V45Z" fill="white" fillOpacity="0.2" />

        {/* Kertas di dalam (Slide Up Animation) */}
        <motion.rect
          x="35"
          y="45"
          width="50"
          height="30"
          fill="white"
          fillOpacity="0.9"
          rx="2"
          initial={{ y: 0 }}
          animate={{ y: -10 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.rect
          x="40"
          y="50"
          width="40"
          height="2"
          rx="1"
          fill="#0F936D"
          initial={{ y: 0 }}
          animate={{ y: -10 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.rect
          x="40"
          y="56"
          width="25"
          height="2"
          rx="1"
          fill="#0F936D"
          fillOpacity="0.5"
          initial={{ y: 0 }}
          animate={{ y: -10 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Badan Amplop Depan */}
        <path
          d="M30 45L60 65L90 45V85H30V45Z"
          fill="white"
          fillOpacity="0.3"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Tutup Amplop (Flapping) */}
        <motion.path
          d="M30 45L60 65L90 45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <motion.path
          d="M30 45L60 25L90 45"
          fill="white"
          fillOpacity="0.3"
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          style={{ originY: "45px" }} // Ini tricky di SVG raw, simplifikasi visual aja
        />
      </motion.g>
    </svg>
  );
}
