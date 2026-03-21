import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/dictionaries";
import { buildLanguageAlternates, toAbsoluteUrl } from "@/lib/seo";
import { getBlogDictionary } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultOgImage = "/opengraph-image.png";
  const lastModified = new Date("2026-03-21");
  const pages = [
    {
      path: "/",
      imagePath: defaultOgImage,
      changeFrequency: "weekly" as const,
      priority: 1,
      lastModified,
    },
    {
      path: "/about",
      imagePath: defaultOgImage,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified,
    },
    {
      path: "/sessions",
      imagePath: defaultOgImage,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      lastModified,
    },
    {
      path: "/blog",
      imagePath: defaultOgImage,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified,
    },
    {
      path: "/contact",
      imagePath: defaultOgImage,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified,
    },
  ];

  const staticPages = pages.flatMap((page) => {
    const languages = buildLanguageAlternates(page.path);

    return locales.map((locale) => ({
      url: languages[locale],
      lastModified: page.lastModified,
      alternates: { languages },
      images: [toAbsoluteUrl(page.imagePath)],
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }));
  });

  const blogsByLocale = Object.fromEntries(
    locales.map((l) => [l, getBlogDictionary(l).articles])
  ) as Record<Locale, ReturnType<typeof getBlogDictionary>["articles"]>;
  const articleCount = blogsByLocale.en.length;

  const blogPages = Array.from({ length: articleCount }, (_, index) => {
    return locales.map((locale) => {
      const article = blogsByLocale[locale][index];
      const languages = Object.fromEntries(
        locales.map((l) => [
          l,
          toAbsoluteUrl(`/${l}/blog/${blogsByLocale[l][index].slug}`),
        ])
      ) as Record<Locale, string>;

      return {
        url: languages[locale],
        lastModified: new Date(article.date),
        alternates: { languages },
        images: [toAbsoluteUrl(article.image)],
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
  }).flat();

  return [...staticPages, ...blogPages];
}
