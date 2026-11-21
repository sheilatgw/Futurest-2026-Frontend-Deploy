import { getMetadataItems } from "@/utils/metadata";

const metadataItems = getMetadataItems();

export const BASE_METADATA = {
  title: metadataItems.title,
  description: metadataItems.description,
  creator: "Futurest 2026 Website Team",
  publisher: "Futurest 2026",
  keywords: [
    "Futurest 2026",
    "Futurest",
    "ITS",
    "Institut Teknologi Sepuluh Nopember",
    "Sepuluh Nopember Institute of Technology",
  ],
  robots: "follow, index",
  generator: "Next.js",
  alternates: {
    canonical: metadataItems.pathname,
  },
  metadataBase: new URL("https://www.futurest.com/"),
  icons: {
    icon: [
      {
        url: "/logo/logo.png",
        type: "image/png",
      },
      {
        url: "/logo/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/logo/logo-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo/logo-16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/logo/logo-180.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    title: metadataItems.title,
    description: metadataItems.description,
    url: metadataItems.pathname,
    siteName: "Futurest 2026",
    images: {
      url: metadataItems.ogUrl,
      alt: metadataItems.title,
    },
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metadataItems.title,
    description: metadataItems.description,
    creator: "@Futurest2026",
    images: {
      url: metadataItems.ogUrl,
      alt: metadataItems.title,
    },
  },
};
