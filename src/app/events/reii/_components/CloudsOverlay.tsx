"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CloudProps {
  id: number;
  top: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
}

export default function CloudsOverlay() {
  const [clouds, setClouds] = useState<CloudProps[]>([]);

  useEffect(() => {
    // Generate random clouds on client side to avoid hydration mismatch
    // Increase clouds to 10-20 as requested
    const cloudCount = Math.floor(Math.random() * 11) + 10;
    const generatedClouds: CloudProps[] = [];
    const minDistance = 10; // Reduced minimum distance to fit more clouds

    // Helper to calculate distance
    const getDistance = (
      c1: { top: number; left: number },
      c2: { top: number; left: number },
    ) => {
      const dx = c1.left - c2.left;
      const dy = c1.top - c2.top;
      return Math.sqrt(dx * dx + dy * dy);
    };

    for (let i = 0; i < cloudCount; i++) {
      let attempts = 0;
      let validPosition = false;
      let newCloud: CloudProps | null = null;

      while (!validPosition && attempts < 100) {
        const potentialTop = Math.random() * 90 + 2; // 2% to 92%
        const potentialLeft = Math.random() * 90 + 2; // 2% to 92%

        // check against existing clouds
        let tooClose = false;
        for (const existing of generatedClouds) {
          if (
            getDistance({ top: potentialTop, left: potentialLeft }, existing) <
            minDistance
          ) {
            tooClose = true;
            break;
          }
        }

        if (!tooClose) {
          newCloud = {
            id: i,
            top: potentialTop,
            left: potentialLeft,
            scale: Math.random() * 0.5 + 0.6, // 0.6 to 1.1 scale
            duration: Math.random() * 15 + 15, // 15s to 30s slower float
            delay: Math.random() * 5,
          };
          validPosition = true;
        }
        attempts++;
      }

      if (newCloud) {
        generatedClouds.push(newCloud);
      }
    }

    setClouds(generatedClouds);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.8,
            x: [0, 40, 0, -40, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cloud.delay,
            opacity: { duration: 1.5, ease: "easeOut" },
          }}
        >
          <Image
            src="/images/competition/REII/deco/awan.svg"
            alt="cloud decoration"
            width={150}
            height={100}
            className="w-[100px] md:w-[150px] lg:w-[200px] opacity-70"
            style={{ transform: `scale(${cloud.scale})` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
