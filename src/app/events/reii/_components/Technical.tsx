import Typography from "@/components/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import CloudsOverlay from "./CloudsOverlay";
import { motion } from "framer-motion";

export default function Technical() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="bg-[#F6CE5B] w-full relative flex flex-col items-center md:items-start pt-16 md:pt-28 pb-10 md:pl-20 lg:pl-48 xl:pl-56 md:pr-20 overflow-hidden">
      <CloudsOverlay />
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute hidden md:block md:max-w-44 lg:max-w-full top-[2%] lg:top-[3%] left-0 z-10"
      >
        <Image
          src="/images/competition/REII/technical-guide/white-line.png"
          alt="technical-guide title"
          width={259}
          height={1}
        />
      </motion.div>
      <motion.div
        initial={{ x: -100, y: 50, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute hidden md:block md:max-w-28 lg:max-w-full top-0 xl:-top-[1%] left-[15%] lg:left-[20%] xl:left-[15%] z-10"
      >
        <Image
          src="/images/competition/REII/technical-guide/red-plane.png"
          alt="technical-guide title"
          width={149}
          height={1}
        />
      </motion.div>

      {/* Guide Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] lg:w-[82%] xl:w-[80%] relative z-20"
      >
        <Card className="bg-white px-6 lg:py-10">
          <CardHeader className="md:items-center">
            <Image
              src="/images/competition/REII/technical-guide/technical-guide.png"
              alt="technical-guide title"
              width={200}
              height={1}
              className="w-full md:max-w-[70%]"
            />
          </CardHeader>
          <CardContent className="mt-2">
            <Typography
              font="FiraSans"
              weight="bold"
              variant="h6"
              className="text-[#199A95] tracking-tighter sm:text-xl"
            >
              Participant Requirements
            </Typography>
            <motion.ol
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="list-decimal pl-8 mt-1 text-[#199A95] space-y-1 lg:space-y-2 md:text-xl"
            >
              {[
                "Participants are senior high school/vocational high school /Islamic senior high school (SMA/SMK/MA or equivalent) students from all regions of Indonesia.",
                "Each team consists of 2–3 members from the same school.",
                "Team members may be students from Grade X, XI, or XII only, or a combination of these grades.",
                "Participants are only allowed to join one team.",
                "Each school may send more than one team.",
                "Each team is free to create a team name; however, the team name must not contain elements of SARA (ethnicity, religion, race, or intergroup issues), pornography, or any other content that violates social norms.",
                "Each team may submit only one original work that has never been published and has never been, and is not currently being, submitted to a similar competition.",
                "The submitted work must use valid data and is required to include proper sources.",
                "References may be obtained from research results or academic studies supported by literature from books, national or international scientific journals, which may be attached.",
                "The work must be written in proper and correct Indonesian in accordance with the General Guidelines for Indonesian Spelling (PUEBI).",
                "Any form of cheating or violation of the competition rules will result in sanctions in the form of disqualification from REII Futurest 2026.",
                "All announcements will be delivered to participants through social media accounts, the Futurest 2026 website, or sent directly via email to the team leader.",
                "The decisions of the organizing committee are final and cannot be contested.",
              ].map((text, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <Typography
                    font="Sora"
                    variant="h6"
                    className="text-[#199A95] text-justify"
                  >
                    {text}
                  </Typography>
                </motion.li>
              ))}
            </motion.ol>
          </CardContent>
          <CardFooter className="relative min-h-40 md:hidden">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rotate-6 sm:-right-[4%]"
            >
              <Image
                src="/images/competition/REII/technical-guide/purple-planes.png"
                alt="purple plane"
                width={252}
                height={145}
              />
            </motion.div>
            <Image
              src="/images/competition/REII/technical-guide/blue-tree.png"
              alt="blue tree"
              width={70}
              height={196}
              className="absolute max-w-14 sm:max-w-full -right-[8%] sm:-right-[4%] sm:bottom-[2%]"
            />
            <Image
              src="/images/competition/REII/technical-guide/green-tree.png"
              alt="green tree"
              width={40}
              height={196}
              className="absolute z-10 max-w-8 sm:max-w-full -right-[8%] sm:-right-[4%] bottom-[12%] sm:bottom-[6%]"
            />
            <Image
              src="/images/competition/REII/technical-guide/yellow-tree.png"
              alt="yellow tree"
              width={55}
              height={196}
              className="absolute z-10 max-w-11 sm:max-w-full -right-[2%] sm:right-0 bottom-[12%] sm:bottom-[8%]"
            />
            <Image
              src="/images/competition/REII/technical-guide/white-cloud.png"
              alt="white cloud"
              width={130}
              height={196}
              className="absolute z-10 max-w-24 sm:max-w-full -right-[8%] sm:-right-[4%] bottom-[10%] sm:bottom-[5%]"
            />
            <Image
              src="/images/competition/REII/technical-guide/gray-cloud.png"
              alt="gray cloud"
              width={30}
              height={196}
              className="absolute z-10 -right-[8%] sm:-right-[4%] top-0 sm:-top-[12%]"
            />
          </CardFooter>
        </Card>
      </motion.div>
      <div className="hidden md:block relative min-h-40 w-full">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute max-w-[300px] lg:max-w-sm xl:max-w-full right-[20%] lg:right-[35%] -bottom-[30%] lg:-bottom-[70%] xl:right-[35%] xl:-bottom-[80%]"
        >
          <Image
            src="/images/competition/REII/technical-guide/purple-planes.png"
            alt="purple plane"
            width={500}
            height={145}
          />
        </motion.div>
        <Image
          src="/images/landing-page/timeline/blue-tree.png"
          alt="blue tree"
          width={456}
          height={196}
          className="absolute max-w-xs lg:max-w-sm xl:max-w-full -scale-x-100 -right-[31%] lg:-right-[25%] xl:-right-[15%] sm:bottom-0"
        />
        <Image
          src="/images/landing-page/timeline/green-tree.png"
          alt="green tree"
          width={300}
          height={196}
          className="absolute z-10 max-w-52 lg:max-w-60 xl:max-w-full -scale-x-100 -right-[26%] lg:-right-[20%] xl:-right-[12%] bottom-0"
        />
        <Image
          src="/images/competition/REII/technical-guide/yellow-tree.png"
          alt="yellow tree"
          width={207}
          height={196}
          className="absolute z-10 max-w-32 lg:max-w-40 xl:max-w-full bottom-0 -right-[0%] lg:right-[4%] xl:right-[6%]"
        />
        <Image
          src="/images/landing-page/timeline/big-cloud.png"
          alt="white cloud"
          width={750}
          height={196}
          className="absolute z-10 max-w-md lg:max-w-xl xl:max-w-full -scale-x-100 -right-[36%] lg:-right-[33%] -bottom-[5%] lg:-bottom-[10%] xl:bottom-0 xl:-right-[25%]"
        />
        <Image
          src="/images/landing-page/timeline/small-cloud.png"
          alt="gray cloud"
          width={327}
          height={196}
          className="absolute z-10 max-w-52 lg:max-w-60 -top-[190%] lg:-top-[230%] -right-[25%] lg:-right-[20%] xl:max-w-full xl:-top-[115%] xl:-right-[18%]"
        />
      </div>
    </section>
  );
}
