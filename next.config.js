/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "*.instagram.com",
      },
      {
        protocol: "https",
        hostname: "instagram.*.fbcdn.net",
      },
      // 👇 TAMBAHKAN INI UNTUK ASSETS DEVELOPMENT
      {
        protocol: "https",
        hostname: "assets-dev.futurest.id",
      },
      // 👇 TAMBAHKAN INI UNTUK ASSETS PRODUCTION (Jaga-jaga saat rilis)
      {
        protocol: "https",
        hostname: "assets.futurest.id",
      },
    ],
  },
};

module.exports = nextConfig;
