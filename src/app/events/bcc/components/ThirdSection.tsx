"use client";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { motion } from "framer-motion";

export default function ThirdSection() {
  const timelineData = [
    {
      date: "February 20 – March 12, 2026",
      title: "Early Registration and Submission",
    },
    {
      date: "March 13 – April 14, 2026",
      title: "Normal Registration and Submission",
    },
    { date: "April 20, 2026", title: "Announcement Semifinal" },
    { date: "April 21 – May 4, 2026", title: "Semifinal Submission" },
    { date: "April 28, 2026", title: "Pitch Deck Workshop" },
    { date: "May 10, 2026", title: "Announcement Final" },
    { date: "May 15, 2026", title: "Finalist Technical Meeting" },
    { date: "May 23, 2026", title: "Exhibition and Awarding Night" },
  ];
  return (
    <section className="relative w-full min-h-screen bg-[#3A6AB2] flex flex-col items-center py-20 overflow-hidden">
      {/* awan-awan */}
      <div className="absolute top-10 left-10 z-0 opacity-60">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>
      <div className="absolute top-40 right-10 z-0 opacity-50">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>
      <div className="absolute top-[30%] right-[15%] z-0 opacity-40 hidden md:block">
        <NextImage
          src="/home/event/cloud-bottom-middle.svg"
          alt="cloud"
          width={150}
          height={70}
          className="looping"
        />
      </div>
      <div className="absolute top-[50%] left-[10%] z-0 opacity-50">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>
      <div className="absolute top-[65%] right-[5%] z-0 opacity-40">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={191}
          height={92}
          className="looping"
        />
      </div>
      <div className="absolute bottom-20 left-1/3 z-0 opacity-30">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={150}
          height={70}
          className="looping"
        />
      </div>
      <div className="absolute top-[15%] left-[20%] z-0 opacity-40 hidden md:block">
        <NextImage
          src="/home/event/cloud-bottom-middle.svg"
          alt="cloud"
          width={120}
          height={60}
          className="looping"
        />
      </div>
      <div className="absolute top-[40%] right-[25%] z-0 opacity-30">
        <NextImage
          src="/home/event/cloud-top-left.svg"
          alt="cloud"
          width={160}
          height={80}
          className="looping"
        />
      </div>
      <div className="absolute top-[80%] left-[5%] z-0 opacity-45">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={180}
          height={90}
          className="looping"
        />
      </div>
      <div className="absolute top-[25%] right-[5%] z-0 opacity-50 md:hidden">
        <NextImage
          src="/home/event/cloud-top-right.svg"
          alt="cloud"
          width={100}
          height={50}
          className="looping"
        />
      </div>

      {/* banner "TIME LINE" */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 mb-24"
      >
        <NextImage
          src="/landing-page/bcc/timeline-banner.webp"
          alt="Timeline Banner"
          width={780}
          height={200}
          className="w-[320px] md:w-[780px]"
        />
      </motion.div>

      {/* timeline content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 pb-60 md:pb-[400px] mt-8 md:mt-32">
        {/* garis kuning tengah */}
        <div className="absolute top-[2%] bottom-[16%] md:top-[3%] md:bottom-[20%] w-[10px] md:w-[12px] bg-[#F6CE5B] rounded-full shadow-[0_0_10px_rgba(255,197,51,0.5)]" />
        <div className="flex flex-col gap-12 md:gap-16 w-full mt-24 md:mt-32">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-full min-h-fit"
            >
              {/* bintang/bunga di tengah */}
              <div className="absolute left-1/2 -translate-x-1/2 z-20">
                <NextImage
                  src="/landing-page/bcc/timeline-star.svg"
                  alt="star"
                  width={60}
                  height={60}
                  className="w-[35px] md:w-[60px]"
                />
              </div>

              {/* kiri = timeline ganjil*/}
              <div
                className={`w-1/2 pr-5 md:pr-12 text-right ${index % 2 !== 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <Typography
                  weight="bold"
                  className="text-white text-[11px] md:text-[22px] leading-4 md:leading-[48px] tracking-tight"
                >
                  {item.date}
                </Typography>
                <Typography className="text-white opacity-90 text-[10px] md:text-[20px] leading-4 md:leading-6 font-normal md:font-semibold">
                  {item.title}
                </Typography>
              </div>

              {/* kanan = timeline genap */}
              <div
                className={`w-1/2 pl-5 md:pl-12 text-left ${index % 2 === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <Typography
                  weight="bold"
                  className="text-white text-[11px] md:text-[22px] leading-4 md:leading-[48px] tracking-tight"
                >
                  {item.date}
                </Typography>
                <Typography className="text-white opacity-90 text-[10px] md:text-[20px] leading-4 md:leading-6 font-normal md:font-semibold">
                  {item.title}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pesawat merah */}
      <motion.div
        animate={{
          x: ["-50%", "-40%", "-50%"],
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[180px] md:top-[280px] left-1/2 z-10 pointer-events-none"
      >
        <NextImage
          src="/landing-page/bcc/red-plane.svg"
          alt="decor"
          width={500}
          height={200}
          className="w-[180px] md:w-[500px]"
        />
      </motion.div>

      {/* kerdus merah */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          delay: 0.2,
        }}
        className="absolute bottom-[-20px] left-0 w-full max-w-[1100px] z-20 pointer-events-none"
      >
        <NextImage
          src="/landing-page/bcc/red-box.svg"
          alt="box decor"
          width={900}
          height={300}
          className="w-[90%] md:w-full object-contain"
        />
      </motion.div>

      {/* pesawat ijo */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [17.39, 20, 17.39],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[1400px] md:top-[1600px] right-[40px] md:right-[150px] z-10 pointer-events-none"
      >
        <NextImage
          src="/landing-page/bcc/green-plane.svg"
          alt="decor"
          width={500}
          height={200}
          className="w-[180px] md:w-[500px]"
        />
      </motion.div>
    </section>
  );
}
