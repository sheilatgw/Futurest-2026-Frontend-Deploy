"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import {
  type MotionValue,
  type Transition,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const What = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation Maps
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Individual Transforms
  const mainFrameY = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
  const topLeftX = useTransform(scrollYProgress, [0, 0.25], [-100, 0]);
  const topLeftY = useTransform(scrollYProgress, [0, 0.25], [-100, 0]);
  const bottomLeftX = useTransform(scrollYProgress, [0, 0.25], [-100, 0]);
  const bottomLeftY = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
  const planeEntranceX = useTransform(scrollYProgress, [0, 0.25], [200, 0]); // From right
  const cloudLeftEntranceX = useTransform(
    scrollYProgress,
    [0, 0.25],
    [-150, 0],
  );
  const cloudRightEntranceX = useTransform(
    scrollYProgress,
    [0, 0.25],
    [150, 0],
  );

  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.3], [20, 0]);

  // Text Content
  const text =
    "BA Futurest is a program for high school/vocational school students and college students to become part of the success of the Futurest event by helping share information, introduce the event, and promote Futurest 2026 activities.";
  const words = text.split(" ");

  // Floating Animation (Continuous)
  const floatTransition: Transition = {
    repeat: Number.POSITIVE_INFINITY,
    duration: 6,
    ease: "easeInOut",
  };

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden py-10 md:py-0">
        <div className="mx-8 max-w-7xl z-10 w-full">
          <div
            className="
            flex
            flex-col lg:flex-row
            items-center lg:items-start
            justify-center
            gap-12 lg:gap-16
            z-10
          "
          >
            {/* Left Image Section */}
            <motion.div
              style={{ opacity: imageOpacity }}
              className="relative lg:min-w-[410px]"
            >
              <motion.div style={{ y: mainFrameY }}>
                <NextImage
                  src="/events/brand-ambassador/what-frame.svg"
                  width={410}
                  height={486}
                  alt="what frame"
                  className="w-full"
                />
              </motion.div>

              <motion.div
                style={{ x: planeEntranceX }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ ...floatTransition, duration: 8 }}
                  className="absolute bottom-[40%] left-[80%] w-full max-w-[50px] sm:max-w-[70px] md:max-w-[100px] lg:max-w-[144px]"
                >
                  <NextImage
                    src="/events/brand-ambassador/plane.svg"
                    width={144}
                    height={65}
                    alt="plane"
                    className="w-full"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                style={{ x: topLeftX, y: topLeftY }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <NextImage
                  src="/events/brand-ambassador/top-left-frame-vector.svg"
                  width={183}
                  height={425}
                  alt="top left frame vector"
                  className="w-full absolute -top-[5%] -left-[5%] max-w-[42px] sm:max-w-[83px] md:max-w-[104px] lg:max-w-[183px]"
                />
              </motion.div>

              <motion.div
                style={{ x: bottomLeftX, y: bottomLeftY }}
                className="absolute inset-0 w-full h-full pointer-events-none -z-10"
              >
                <NextImage
                  src="/events/brand-ambassador/bottom-left-frame-vector.png"
                  width={1091}
                  height={520}
                  alt="bottom left frame vector"
                  className="w-full absolute bottom-[13%] -left-[18%] lg:max-w-[1091px]"
                />
              </motion.div>

              <motion.div
                style={{ x: cloudLeftEntranceX }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <motion.div
                  animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                  transition={{ ...floatTransition, duration: 7 }}
                  className="absolute -bottom-[20%] -left-[30%] w-full max-w-[70px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[258px]"
                >
                  <NextImage
                    src="/events/brand-ambassador/bottom-left-cloud.svg"
                    width={258}
                    height={147}
                    alt="bottom left cloud"
                    className="w-full"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                style={{ x: cloudRightEntranceX }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <motion.div
                  animate={{ x: [0, -5, 0], y: [0, -8, 0] }}
                  transition={{ ...floatTransition, duration: 9, delay: 1 }}
                  className="absolute -bottom-[15%] left-[60%] w-full max-w-[70px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[286px]"
                >
                  <NextImage
                    src="/events/brand-ambassador/bottom-right-cloud.svg"
                    width={286}
                    height={147}
                    alt="bottom left cloud"
                    className="w-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Text Section */}
            <div className="flex flex-col items-center text-center lg:text-left">
              <motion.div style={{ opacity: titleOpacity, y: titleY }}>
                <NextImage
                  src="/events/brand-ambassador/what-title.png"
                  width={751}
                  height={275}
                  alt="what title"
                  className="w-full max-w-[751px]"
                />
              </motion.div>

              <Typography
                font="Pagkaki"
                variant="h3"
                weight="regular"
                className="
                  mt-2
                  text-center
                  text-white
                  [-webkit-text-stroke:0.65px_#2B45AD]
                  sm:[-webkit-text-stroke:0.75px_#2B45AD]
                  md:[-webkit-text-stroke:1.25px_#2B45AD]
                  lg:[-webkit-text-stroke:1.5px_#2B45AD]
                  text-base
                  sm:text-lg
                  md:text-xl
                  lg:text-3xl
                  max-w-[320px]
                  sm:max-w-[450px]
                  md:max-w-[700px]
                  flex flex-wrap justify-center gap-x-2
                "
              >
                {words.map((word, i) => {
                  const start = 0.3 + (i / words.length) * 0.5; // Start typing from 30% to 80% scroll
                  const end = start + 0.05; // Short transition for strict typing effect
                  return (
                    <Word
                      key={i}
                      progress={scrollYProgress}
                      range={[start, end]}
                    >
                      {word}
                    </Word>
                  );
                })}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const strictOpacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span
      style={{ opacity: strictOpacity }}
      className="relative inline-block"
    >
      {children}
    </motion.span>
  );
};

export default What;
