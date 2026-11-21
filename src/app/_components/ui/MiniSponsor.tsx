"use client";
import NextImage from "@/components/next-image";
import { motion } from "framer-motion";

const MiniSponsor = () => {
  return (
    <div className="w-full min-h-[600px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[1000px] bg-[#FFFAF6] overflow-hidden flex flex-col">
      <div className="h-24 lg:h-40 flex justify-center items-center z-10">
        <NextImage
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
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-10 md:gap-20 w-full flex-1"
      >
        {/* Baris 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="
            flex flex-col md:flex-row justify-center items-center
            xl:gap-16 lg:gap-12 md:gap-10 sm:gap-8 gap-5
            w-full
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[24%] lg:w-[30%] md:w-[30%] sm:w-[35%] w-[35%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/logo-s2p.webp"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[22%] lg:w-[24%] md:w-[24%] sm:w-[32%] w-[30%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/platinum/logo-fithub.webp"
              width={3000}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
        </motion.div>

        {/* Baris 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="
            flex flex-col md:flex-row justify-center items-center
            xl:gap-16 lg:gap-12 md:gap-10 sm:gap-8 gap-5
            w-full
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[22%] lg:w-[27%] md:w-[30%] sm:w-[35%] w-[40%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/gold/logo-coffeetoffee.webp"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[22%] lg:w-[27%] md:w-[30%] sm:w-[35%] w-[40%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/gold/logo-pelindo.png"
              width={3000}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
        </motion.div>
        {/* Baris 3 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="
            flex flex-col justify-center items-center
            xl:gap-16 lg:gap-12 md:gap-10 sm:gap-8 gap-5
            w-full
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[60%] lg:w-[65%] md:w-[70%] sm:w-[70%] w-[80%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/silver/logo-iog.png"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[19%] lg:w-[20%] md:w-[22%] sm:w-[24%] w-[27%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/silver/logo-kpb.png"
              width={3000}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[19%] lg:w-[20%] md:w-[23%] sm:w-[26%] w-[27%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/silver/logo-nh.png"
              width={3000}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[12%] lg:w-[13%] md:w-[15%] sm:w-[18%] w-[20%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/silver/logo-yap.png"
              width={3000}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
        </motion.div>

        {/* Baris 4 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="
            flex flex-col justify-center items-center
            xl:gap-16 lg:gap-12 md:gap-10 gap-8
            w-full
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[10%] lg:w-[11%] md:w-[14%] sm:w-[13%] w-[13%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/logo-cheers.webp"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[10%] lg:w-[11%] md:w-[14%] sm:w-[13%] w-[13%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/logo-amigo.webp"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[10%] lg:w-[11%] md:w-[14%] sm:w-[13%] w-[15%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/bronze/logo-dinar.png"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[10%] lg:w-[11%] md:w-[14%] sm:w-[13%] w-[15%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/bronze/logo-fotoyu.png"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[10%] lg:w-[11%] md:w-[14%] sm:w-[13%] w-[15%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/bronze/logo-imperial.png"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[10%] lg:w-[11%] md:w-[14%] sm:w-[13%] w-[15%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/logo-pln.webp"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:w-[13%] lg:w-[20%] md:w-[20%] sm:w-[20%] w-[45%] flex items-center justify-center"
          >
            <NextImage
              src="/landing-page/sponsor/bronze/logo-iog.png"
              width={3300}
              height={1114}
              alt="Sponsor"
            />
          </motion.div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MiniSponsor;
