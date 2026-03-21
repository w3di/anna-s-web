import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/lib/dictionaries";
import { getLocalizedPath, getLocalizedPaths } from "@/lib/locale-routing";

export const siteUrl = "https://mindofheart.com";
export const siteName = "Mind of Heart";
export const personId = `${siteUrl}/#person`;
export const serviceId = `${siteUrl}/#service`;
export const websiteId = `${siteUrl}/#website`;
export const defaultOgImagePath = "/opengraph-image.png";
export const availableLanguages = ["en", "cz", "ru"] as const;
export const contactEmail = "info@mindofheart.com";
export const contactPhone = "+420608514450";
export const serviceAreas = ["Prague", "Online"] as const;
export const businessAddress = {
  "@type": "PostalAddress",
  addressLocality: "Prague",
  addressRegion: "Prague",
  addressCountry: "CZ",
} as const;

export const businessGeo = {
  "@type": "GeoCoordinates",
  latitude: "50.0755",
  longitude: "14.4378",
} as const;

const openGraphLocaleMap: Record<Locale, string> = {
  en: "en_US",
  cz: "cs_CZ",
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

export function toLocalizedAbsoluteUrl(locale: Locale, pathname: string) {
  return toAbsoluteUrl(getLocalizedPath(locale, pathname));
}

export function getOpenGraphLocale(locale: Locale) {
  return openGraphLocaleMap[locale];
}

export function buildLanguageAlternates(pathname: string) {
  return Object.fromEntries(
    Object.entries(getLocalizedPaths(pathname)).map(([language, path]) => [
      language,
      toAbsoluteUrl(path),
    ])
  ) as Record<Locale, string>;
}

export function buildPageMetadata({
  title,
  description,
  pathname,
  locale,
  imagePath = defaultOgImagePath,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalUrl = toLocalizedAbsoluteUrl(locale, pathname);
  const imageUrl = toAbsoluteUrl(imagePath);
  const languageAlternates = buildLanguageAlternates(pathname);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languageAlternates,
        "x-default": toLocalizedAbsoluteUrl(defaultLocale, pathname),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      locale: getOpenGraphLocale(locale),
      alternateLocale: availableLanguages
        .filter((language) => language !== locale)
        .map(getOpenGraphLocale),
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

type SiteSchemaInput = {
  locale: Locale;
  description: string;
};

export function buildSiteSchema({ locale, description }: SiteSchemaInput) {
  const defaultHomeUrl = toLocalizedAbsoluteUrl(defaultLocale, "/");
  const defaultAboutUrl = toLocalizedAbsoluteUrl(defaultLocale, "/about");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Anna Kolmykova",
        jobTitle:
          "Psychologist in Prague — Systemic constellation facilitator and process-oriented therapist",
        description,
        email: contactEmail,
        telephone: contactPhone,
        url: defaultAboutUrl,
        image: toAbsoluteUrl("/about-anna.webp"),
        address: businessAddress,
        knowsLanguage: [...availableLanguages],
        worksFor: { "@id": serviceId },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Clinical Psychology — Professional Requalification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "International Training in Family Constellations",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "International Training in Organisational Constellations",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Sacred and Spiritual Process-Oriented Therapy (3-year training)",
          },
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Psychologist",
          occupationLocation: {
            "@type": "City",
            name: "Prague",
          },
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: siteName,
        url: defaultHomeUrl,
        image: toAbsoluteUrl("/hero-landscape.webp"),
        logo: toAbsoluteUrl("/mind_of_heart_black_cropped.webp"),
        description,
        areaServed: [...serviceAreas],
        email: contactEmail,
        telephone: contactPhone,
        address: businessAddress,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: defaultHomeUrl,
        name: siteName,
        description,
        inLanguage: [
          locale,
          ...availableLanguages.filter((language) => language !== locale),
        ],
        publisher: { "@id": serviceId },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: `${siteName} — Anna Kolmykova`,
        description,
        url: defaultHomeUrl,
        image: toAbsoluteUrl("/about-anna.webp"),
        logo: toAbsoluteUrl("/mind_of_heart_black_cropped.webp"),
        telephone: contactPhone,
        email: contactEmail,
        address: businessAddress,
        geo: businessGeo,
        areaServed: [...serviceAreas],
        priceRange: "$$",
        sameAs: [defaultHomeUrl],
      },
    ],
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

export function buildLocalizedBreadcrumbSchema(
  locale: Locale,
  items: BreadcrumbInput[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toLocalizedAbsoluteUrl(locale, item.path),
    })),
  };
}
