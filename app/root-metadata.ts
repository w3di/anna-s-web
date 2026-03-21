import type { Metadata, Viewport } from "next";
import { siteName, siteUrl } from "@/lib/seo";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  applicationName: siteName,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  authors: [{ name: "Anna Kolmykova", url: siteUrl }],
  creator: "Anna Kolmykova",
  publisher: siteName,
  category: "Psychology",
  keywords: [
    "psychologist Prague",
    "psycholog Praha",
    "психолог Прага",
    "psycholožka Praha",
    "психолог в Праге",
    "Anna Kolmykova",
    "systemic constellations Prague",
    "systemické konstelace Praha",
    "системные расстановки Прага",
    "family constellations",
    "rodinné konstelace",
    "семейные расстановки",
    "process-oriented psychology",
    "online coaching",
    "organisational constellations",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const rootViewport: Viewport = {
  themeColor: "#fdfaf6",
};
