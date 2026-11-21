"use client";
import NextImage from "@/components/next-image";
import { motion } from "framer-motion";

const Sponsor = () => {
  return (
    <div className="w-full min-h-[450px] md:min-h-[750px] lg:min-h-[900px] bg-[#FFFAF6] overflow-hidden flex flex-col">
      <div className="h-24 lg:h-full flex justify-center items-center z-10">
        {/* <NextImage
          src="/landing-page/sponsor/SPONSOR.png"
          width={278}
          height={96}
          alt="Sponsor"
          className="hidden lg:block"
        />

        <NextImage
          src="/landing-page/sponsor/SPONSOR.png"
          width={167}
          height={32}
          alt="Sponsor"
          className="lg:hidden"
        /> */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative justify-center items-end md:items-start lg:items-start flex-1 w-screen flex"
      >
        <NextImage
          src="/landing-page/sponsor/sponsor-bg.webp"
          alt="Sponsor Background"
          width={1450}
          height={900}
          className="absolute min-w-screen md:max-h-screen"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="
            min-w-screen min-h-full flex
            xl:gap-16 lg:gap-12 md:gap-10 sm:gap-8 gap-5
            z-10 absolute justify-center items-start
            min-[400px]:top-[40%] min-[500px]:top-[30%] min-[600px]:top-[20%] min-[768px]:top-[24%] min-[868px]:top-[30%] min-[1024px]:top-[55%]
            min-[1124px]:top-[50%] min-[1224px]:top-[45%] min-[1324px]:top-[40%] min-[1440px]:top-[35%] 
            [@media(min-height:1100px)]:top-[20%]
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="xl:w-[15%] lg:w-[13%] md:w-[12%] sm:w-[10%] w-[7%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/logo-cakap.webp"
              width={3300}
              height={1114}
              alt="Sponsor"
              className="block"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sponsor;
