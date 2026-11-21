"use client";

import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { type Transition, motion } from "framer-motion";
import Link from "next/link";

const FooterBA = () => {
  const smoothTransition: Transition = {
    duration: 0.8,
    ease: [0.25, 0.8, 0.25, 1],
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: smoothTransition,
    },
  };

  return (
    <footer className="relative w-full bg-[#dbaa2c] overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex items-center gap-3">
                <NextImage
                  src="/events/brand-ambassador/footer-futurest-logo.svg"
                  width={56}
                  height={56}
                  alt="Futurest 2026"
                />
                <div>
                  <Typography
                    variant="h5"
                    font="Titillium"
                    weight="extrabold"
                    className="text-white"
                  >
                    FUTUREST
                  </Typography>
                  <Typography
                    variant="h5"
                    font="Titillium"
                    weight="extrabold"
                    className="text-white"
                  >
                    2026
                  </Typography>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-white/60" />

              <div className="flex items-center gap-4">
                <NextImage
                  src="/events/brand-ambassador/footer-sre-logo.svg"
                  width={100}
                  height={100}
                  alt="SRE ITS"
                />
                <Typography
                  variant="p"
                  font="Titillium"
                  className="text-white leading-snug"
                >
                  Institut Teknologi Sepuluh Nopember
                </Typography>
              </div>
            </div>
          </motion.div>

          <div />

          <motion.div variants={item}>
            <Typography
              variant="h6"
              font="Titillium"
              weight="bold"
              className="text-white mb-4"
            >
              Our Events
            </Typography>

            <ul className="space-y-2">
              {[
                { label: "Renewable Energy Project Initiation", href: "/" },
                { label: "Renewable Energy Ideas Innovation", href: "/" },
                { label: "Business Case Competition", href: "/" },
                { label: "FutureTalk x Minicase", href: "/" },
              ].map((event, idx) => (
                <li key={idx}>
                  <Link href={event.href}>
                    <Typography
                      variant="p"
                      font="Titillium"
                      weight="regular"
                      className="text-white cursor-pointer"
                    >
                      {event.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <Typography
              variant="h6"
              font="Titillium"
              weight="bold"
              className="text-white mb-4"
            >
              Quick Links
            </Typography>

            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Merchandise", href: "/" },
                { label: "SRE ITS", href: "/" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href}>
                    <Typography variant="p" className="text-white">
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div variants={item}>
            <Typography
              variant="l"
              font="Titillium"
              weight="regular"
              className="text-white"
            >
              © Copyright Future Energy Summit 2026. All Rights Reserved
            </Typography>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-10">
            <Link
              href="https://id.linkedin.com/company/futureenergysummit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                <NextImage
                  src="/events/brand-ambassador/footer-linkedin-logo.svg"
                  width={20}
                  height={20}
                  alt="LinkedIn"
                />
                <Typography
                  variant="l"
                  font="Titillium"
                  weight="regular"
                  className="text-white"
                >
                  Future Energy Summit
                </Typography>
              </div>
            </Link>

            <Link
              href="https://instagram.com/futurest.2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                <NextImage
                  src="/events/brand-ambassador/footer-instagram-logo.svg"
                  width={20}
                  height={20}
                  alt="Instagram"
                />
                <Typography
                  variant="l"
                  font="Titillium"
                  weight="regular"
                  className="text-white"
                >
                  @futurest.2026
                </Typography>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterBA;
