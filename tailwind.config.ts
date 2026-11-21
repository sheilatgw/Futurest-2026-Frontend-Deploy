import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      /* =======================
       * FONT FAMILY
       * ======================= */
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        firasans: ["var(--font-fira-sans)", "sans-serif"],
        titillium: ["var(--font-titillium)", "sans-serif"],
        pagkaki: ["var(--font-pagkaki)", "sans-serif"],
      },

      /* =======================
       * COLORS
       * ======================= */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        info: {
          main: "#3454d1",
          hover: "#213585",
        },
        success: {
          main: "#0f936d",
          hover: "#0b7054",
        },
        warning: {
          main: "#fe5d26",
          hover: "#db4f21",
        },
        danger: {
          main: "#fe5d26",
          hover: "#db4f21",
        },

        green: {
          10: "#17ebaf",
          20: "#13c290",
          30: "#0f936d",
          40: "#0b7054",
          50: "#074735",
        },
        blue: {
          10: "#4066ff",
          20: "#3454d1",
          30: "#2b45ad",
          40: "#213585",
          50: "#17255c",
        },
        yellow: {
          10: "#ffc533",
          20: "#dbaa2c",
          30: "#b38a24",
          40: "#8a6a1c",
          50: "#614b13",
        },
        orange: {
          10: "#fe5d26",
          20: "#db4f21",
          30: "#b3411b",
          40: "#8a3215",
          50: "#61230f",
        },
        red: {
          10: "#f25757",
          20: "#cf4a4a",
          30: "#a63c3c",
          40: "#f25757",
          50: "#f25757",
        },
      },
    },
  },

  plugins: [],
};

export default config;
