import {
  Fira_Sans_Extra_Condensed,
  Sora as Sora_,
  Titillium_Web,
} from "next/font/google";
import localFont from "next/font/local";

export const Sora = Sora_({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

export const FiraSans = Fira_Sans_Extra_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-fira-sans",
});

export const Titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-titillium",
});

// Atau dengan ../public jika file ada di src
export const Pagkaki = localFont({
  src: "../public/fonts/pagkaki/PAGKAKI-Regular.ttf",
  display: "swap",
  variable: "--font-pagkaki",
});

// export const helveticaNeue = localFont({
//   src: "/fonts/helvetica-neue/HelveticaNeueRoman.otf",
//   display: "swap",
//   variable: "--font-helvetica-neue",
// });

// export const relationshipOfMelodrame = localFont({
//   src: "/fonts/relationship-of-melodrame/relationship-of-melodrame.ttf",
//   display: "swap",
//   variable: "--font-melodrame",
// });
