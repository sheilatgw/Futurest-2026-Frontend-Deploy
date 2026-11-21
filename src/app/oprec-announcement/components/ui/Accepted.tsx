"use client";

import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Accepted({
  name,
  nrp,
  division,
  department,
  dresscode,
}: {
  name?: string;
  nrp: string;
  division?: string;
  department?: string;
  dresscode?: string;
}) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const audio = new Audio(
      "/images/announcement/among-us-role-reveal-sound.mp3",
    );

    toast("Welcome aboard! You are now officially part of the team!");
    const groupUrl =
      "https://chat.whatsapp.com/Gs5WDwPHGDEG1WldMciqie?mode=wwt";

    audio
      .play()
      .then(() => {
        audio.onended = () => {
          toast.success("Joining WhatsApp group...");
          router.push(groupUrl);
        };
      })
      .catch((err) => {
        console.error("Audio playback failed:", err);
        toast.error("⚠️ Audio playback failed, redirecting...");
        router.push(groupUrl);
      });
  };

  return (
    <form>
      <div className="flex justify-center items-center mb-4 gap-2">
        <NextImage
          src="/logo-24.png"
          alt="Logo"
          className="hidden md:block h-full object-contain"
          width={90}
          height={90}
        />
        <div>
          <Typography
            weight="extrabold"
            font="FiraSans"
            className="text-[#2DA180] text-start text-[35px] md:text-[35px] 
            leading-none"
          >
            Welcome to
            <br></br>
            Futurest 2026
          </Typography>
        </div>
      </div>

      <div
        className="grid grid-cols-1 auto-rows-auto border-2 border-black 
      divide-y divide-black"
      >
        <div
          className="flex flex-col items-start justify-center px-4 py-2 
        gap-1"
        >
          <Typography
            variant="h6"
            weight="bold"
            font="FiraSans"
            className="text-[#3F3F46]"
          >
            <span className="text-gray-500">Congratulations!</span>
            <br></br>
            You are now officially part of Futurest 2026 staff:
          </Typography>
        </div>

        <div
          className="flex flex-col items-start justify-center px-4 py-2 
        gap-1"
        >
          <Label className="font-semibold text-gray-400">Name</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className="text-[#3F3F46]"
          >
            {name}
          </Typography>
        </div>

        <div
          className="flex flex-col justify-center items-start px-4 py-2 
        gap-1"
        >
          <Label className="font-semibold text-gray-400">Student ID</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className="text-[#3F3F46]"
          >
            {nrp}
          </Typography>
        </div>

        <div
          className="flex flex-col justify-center items-start px-4 py-2 
        gap-1"
        >
          <Label className="font-semibold text-gray-400">Department</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className="text-[#3F3F46]"
          >
            {department}
          </Typography>
        </div>

        <div
          className="flex flex-col justify-center items-start px-4 py-2 
        gap-1"
        >
          <Label className="font-semibold text-gray-400">Division</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className="text-[#3F3F46]"
          >
            {division}
          </Typography>
        </div>

        <div
          className="flex flex-col justify-center items-start px-4 py-2 
        gap-1"
        >
          <Label className="font-semibold text-gray-400">Dress Code</Label>
          <Typography
            variant="h6"
            weight="medium"
            font="FiraSans"
            className="text-[#3F3F46]"
          >
            {dresscode}
          </Typography>
        </div>

        <div
          className="flex flex-col justify-center items-start px-4 py-4 
        gap-3"
        >
          <Label className="font-semibold text-gray-400">
            Join Our Community
          </Label>

          <Button
            type="submit"
            variant="success"
            size="md"
            onClick={handleClick}
            className="w-full rounded-xl bg-[#0F936D] text-white text-sm 
            font-fira-sans py-2 hover:bg-[#288456]"
          >
            Join Staff WhatsApp Group
          </Button>
        </div>
      </div>

      <NextImage
        src="/announcement/quotes.svg"
        alt="Logo"
        className="h-full object-contain mt-4"
        width={200}
        height={200}
      />
    </form>
  );
}
