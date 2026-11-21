"use client";

import ButtonLink from "@/components/links/button-link";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { Instagram } from "lucide-react";

const CommingSoonPage = () => {
  return (
    <section className="relative bg-[#3969B3] w-full min-h-screen flex justify-center items-center px-8 lg:px-4 py-10">
      <div className="flex flex-col items-center text-center sm:max-w-lg md:max-w-xl lg:max-w-3xl w-full gap-6">
        {/* Gambar */}
        <div className="w-full">
          <NextImage
            src="/coming-soon/comingsoon.svg"
            width={1690}
            height={776}
            alt="Coming Soon"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* Text */}
        <Typography
          variant="h6"
          className="text-white font-sora text-base sm:text-lg leading-relaxed"
        >
          We're excited to let you know that the website is being developed to
          enhance your experience. Keep an eye out for more updates!
        </Typography>

        {/* Button */}
        <ButtonLink
          href="https://www.instagram.com/futurest.2026/"
          target="_blank"
          leftIcon={Instagram}
          className="mt-2 w-full sm:w-auto"
          variant="primary"
        >
          Check Our Social Media
        </ButtonLink>
      </div>
    </section>
  );
};

export default CommingSoonPage;
