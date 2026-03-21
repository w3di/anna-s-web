import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/dictionaries";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description:
      "Anna Kolmykova — psychologist in Prague. Systemic constellations, process-oriented therapy, and personal coaching. In-person and online sessions.",
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#fdfaf6",
    theme_color: "#fdfaf6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
