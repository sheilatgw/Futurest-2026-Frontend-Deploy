"use client";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const contactPersonsData = [
  {
    divisi: "Pre event",
    nama: "Clariza Alya Siswanto",
    wa: "https://wa.me/6282234857272",
  },
  {
    divisi: "Main event",
    nama: "Haikal Trian Hazieq",
    wa: "https://wa.me/081285091706",
  },
  {
    divisi: "Awarding & closing",
    nama: "Alethea Kezia Putri Prabowo",
    wa: "https://wa.me/6282325814980",
  },
  {
    divisi: "Competition",
    nama: "Nikmah Farismatur Riza",
    wa: "https://wa.me/62895613904300",
  },
  {
    divisi: "Logistic and Consumption",
    nama: "Aussie Rezali Ramadhan Bawolje Junior",
    wa: "https://wa.me/081275784477",
  },
  {
    divisi: "Security Fasilitator dan Surveyor",
    nama: "Zahran Athaillah",
    wa: "https://wa.me/6281334949849",
  },
  {
    divisi: "Social Media Management",
    nama: "Marcella Amanda Putri Wibowo",
    wa: "https://wa.me/6285101615726",
  },
  {
    divisi: "Creative",
    nama: "Athallah Bintang Aflah",
    wa: "https://wa.me/6281232932843",
  },
  {
    divisi: "Documentation",
    nama: "Chenata Andara Irmansyah",
    wa: "https://wa.me/6281216940118",
  },
  {
    divisi: "Talent Management",
    nama: "Tabina Fayola Zalianty",
    wa: "https://wa.me/6282255669923",
  },
  {
    divisi: "Network Hub",
    nama: "Harjune Dadink Pamungkas",
    wa: "https://wa.me/6285182273854",
  },
  { divisi: "UI/UX", nama: "Ata", wa: "https://wa.me/6285159501123" },
  { divisi: "Frontend", nama: "Ararya", wa: "https://wa.me/6282146083461" },
  {
    divisi: "Backend",
    nama: "Kafanal Kafi",
    wa: "https://wa.me/6285717927900",
  },
  {
    divisi: "Sponsorship",
    nama: "Kania Faris",
    wa: "https://wa.me/6285861284535",
  },
  {
    divisi: "Fundraising",
    nama: "Charmanisa M",
    wa: "https://wa.me/6282340114096",
  },
  { divisi: "Decoration", nama: "Dimas", wa: "https://wa.me/6285845914223" },
];

const _cpLinks: Record<string, string> = contactPersonsData.reduce(
  (acc, cp) => {
    acc[cp.divisi] = cp.wa;
    return acc;
  },
  {} as Record<string, string>,
);

const cpNames: Record<string, string> = contactPersonsData.reduce(
  (acc, cp) => {
    acc[cp.divisi] = cp.nama; // Map divisi ke nama
    return acc;
  },
  {} as Record<string, string>,
);

export default function Interviewed({
  name,
  nrp,
  division,
  dresscode,
}: {
  name?: string;
  nrp: string;
  division?: string;
  dresscode?: string;
}) {
  const router = useRouter();

  const defaultCpName = "Grup WA";
  const _contactPersonName = cpNames[division || ""] || defaultCpName;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const audio = new Audio(
      "/images/announcement/among-us-role-reveal-sound.mp3",
    );

    toast("Gah damn. Congratulations!");
    const defaultGroupUrl =
      "https://chat.whatsapp.com/Gs5WDwPHGDEG1WldMciqie?mode=wwt";
    const targetUrl = defaultGroupUrl;

    audio
      .play()
      .then(() => {
        // Setelah lagu selesai, tampilkan toast dan redirect
        audio.onended = () => {
          toast.success("Redirecting...");
          router.push(targetUrl);
        };
      })
      .catch((err) => {
        console.error("Audio playback failed:", err);
        toast.error("⚠️ Audio playback failed, redirecting...");
        router.push(targetUrl);
      });
  };
  return (
    <form>
      <div className="flex justify-center items-center mb-4 gap-2">
        <NextImage
          src="/logo-24.png"
          alt="Logo"
          className="hidden md:block h-full  object-contain"
          width={90}
          height={90}
        />
        <div>
          <Typography
            weight="extrabold"
            font="FiraSans"
            className="text-[#2DA180]  text-start text-[35px] md:text-[35px] leading-none"
          >
            Welcome to
            <br></br>
            Futurest 2026
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 auto-rows-auto border-2 border-black divide-y divide-black">
        <div className="flex flex-col items-start justify-center px-4 py-2  gap-1">
          <Typography
            variant="h6"
            weight="bold"
            font="FiraSans"
            className=" text-[#3F3F46]"
          >
            <span className="text-gray-500">Cleared for boarding:</span>
            <br></br>
            Futurest 2026 ticket issued:
          </Typography>
        </div>

        <div className="flex flex-col items-start justify-center px-4 py-2 gap-1">
          <Label className="font-semibold text-gray-400">Name</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className=" text-[#3F3F46]"
          >
            {name}
          </Typography>
        </div>
        <div className="flex flex-col justify-center items-start  px-4 py-2 gap-1">
          <Label className="font-semibold text-gray-400">Student ID</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className=" text-[#3F3F46]"
          >
            {nrp}
          </Typography>
        </div>
        <div className="flex flex-col justify-center items-start  px-4 py-2 gap-1">
          <Label className="font-semibold text-gray-400">Division</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className=" text-[#3F3F46]"
          >
            {division}
          </Typography>
        </div>
        <div className="flex flex-col justify-center items-start  px-4 py-2 gap-1">
          <Label className="font-semibold text-gray-400">Dresscode</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className=" text-[#3F3F46]"
          >
            {dresscode}
          </Typography>
        </div>

        <div className="flex flex-col  justify-center items-start px-4 py-4 gap-3">
          <Label className="font-semibold text-gray-400">Contact Person</Label>

          <Button
            type="submit"
            variant="success"
            size="md"
            onClick={handleClick}
            className="w-full rounded-xl bg-[#0F936D] text-white text-sm font-fira-sans py-2 hover:bg-[#288456]"
          >
            Click for Further Information
          </Button>
        </div>
      </div>
      <NextImage
        src="/announcement/quotes.svg"
        alt="Logo"
        className=" h-full  object-contain mt-4"
        width={200}
        height={200}
      />
    </form>
  );
}
