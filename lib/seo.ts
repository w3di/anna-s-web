import type { Metadata } from "next";
import type { Locale } from "@/lib/dictionaries";

export const siteUrl = "https://mindofheart.com";
export const siteName = "Mind of Heart";
export const personId = `${siteUrl}/#person`;
export const serviceId = `${siteUrl}/#service`;
export const websiteId = `${siteUrl}/#website`;
export const defaultOgImagePath = "/opengraph-image.png";
export const availableLanguages = ["en", "cs", "ru"] as const;
export const businessAddress = {
  "@type": "PostalAddress",
  addressLocality: "Prague",
  addressCountry: "CZ",
} as const;

const openGraphLocaleMap: Record<Locale, string> = {
  en: "en_US",
  cs: "cs_CZ",
  ru: "ru_RU",
};

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  imagePath?: string;
  type?: "website" | "article";
};

type BreadcrumbInput = {
  name: string;
  path: string;
};

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname || "/", siteUrl).toString();
}

export function getOpenGraphLocale(locale: Locale) {
  return openGraphLocaleMap[locale];
}

export function buildPageMetadata({
  title,
  description,
  pathname,
  locale,
  imagePath = defaultOgImagePath,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalUrl = toAbsoluteUrl(pathname);
  const imageUrl = toAbsoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      locale: getOpenGraphLocale(locale),
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}
