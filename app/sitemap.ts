import type { MetadataRoute } from "next";
import { locales } from "@/lib/dictionaries";
import { buildLanguageAlternates, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultOgImage = "/opengraph-image.png";
  const pages = [
    {
      path: "/",
      imagePath: defaultOgImage,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: "/about",
      imagePath: defaultOgImage,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/sessions",
      imagePath: defaultOgImage,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/contact",
      imagePath: defaultOgImage,
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
