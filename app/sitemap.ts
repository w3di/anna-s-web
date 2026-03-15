import type { MetadataRoute } from "next";
import { locales } from "@/lib/dictionaries";
import { buildLanguageAlternates, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    {
      path: "/",
      imagePath: "/hero-landscape.webp",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: "/about",
      imagePath: "/about-banner.webp",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/sessions",
      imagePath: "/sessions-banner.webp",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/contact",
      imagePath: "/contact-banner.webp",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return pages.flatMap((page) => {
    const languages = buildLanguageAlternates(page.path);

    return locales.map((locale) => ({
      url: languages[locale],
      alternates: { languages },
      images: [toAbsoluteUrl(page.imagePath)],
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }));
  });
}
