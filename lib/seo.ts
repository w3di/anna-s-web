import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/lib/dictionaries";
import { getLocalizedPath, getLocalizedPaths } from "@/lib/locale-routing";

export const siteUrl = "https://mindofheart.com";
export const siteName = "Mind of Heart";
export const personId = `${siteUrl}/#person`;
export const serviceId = `${siteUrl}/#service`;
export const websiteId = `${siteUrl}/#website`;
export const defaultOgImagePath = "/opengraph-image.png";
export const availableLanguages = ["en", "cs", "ru"] as const;
export const contactEmail = "info@mindofheart.com";
export const contactPhone = "+420608514450";
export const serviceAreas = ["Prague", "Online"] as const;
export const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "Riegrovy sady",
  postalCode: "120 00",
  addressLocality: "Prague 2 – Vinohrady",
  addressRegion: "Prague",
  addressCountry: "CZ",
} as const;

export const businessGeo = {
  "@type": "GeoCoordinates",
  latitude: "50.0797",
  longitude: "14.4402",
} as const;

export const socialProfiles = [
  "https://www.linkedin.com/in/anna-kolmykova-msc-9b60005b/",
  "https://www.instagram.com/conste.lab",
] as const;

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
  jobTitle?: string;
};

const localizedJobTitles: Record<Locale, string> = {
  en: "Psychologist in Prague — Systemic constellation facilitator and process-oriented therapist",
  cs: "Psycholožka v Praze — Facilitátorka systemických konstelací a procesně orientovaná terapeutka",
  ru: "Психолог в Праге — Фасилитатор системных расстановок и процесс-ориентированный терапевт",
};

export function buildSiteSchema({
  locale,
  description,
  jobTitle,
}: SiteSchemaInput) {
  const defaultHomeUrl = toLocalizedAbsoluteUrl(defaultLocale, "/");
  const defaultAboutUrl = toLocalizedAbsoluteUrl(defaultLocale, "/about");
  const contactUrl = toLocalizedAbsoluteUrl(defaultLocale, "/contact");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Anna Kolmykova",
        jobTitle: jobTitle ?? localizedJobTitles[locale],
        description,
        email: contactEmail,
        telephone: contactPhone,
        url: defaultAboutUrl,
        image: toAbsoluteUrl("/about-anna.webp"),
        address: businessAddress,
        knowsLanguage: ["en", "cs", "ru"],
        sameAs: [...socialProfiles],
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
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": serviceId,
        name: `${siteName} — Anna Kolmykova`,
        url: defaultHomeUrl,
        image: toAbsoluteUrl("/about-anna.webp"),
        logo: toAbsoluteUrl("/mind_of_heart_black_cropped.webp"),
        description,
        priceRange: "$$",
        areaServed: [
          { "@type": "City", name: "Prague" },
          { "@type": "Country", name: "Czech Republic" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Austria" },
        ],
        hasMap: "https://maps.google.com/maps?q=50.0797,14.4402",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceType: "Online consultation",
          serviceUrl: contactUrl,
        },
        email: contactEmail,
        telephone: contactPhone,
        address: businessAddress,
        geo: businessGeo,
        sameAs: [...socialProfiles],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "07:00",
            closes: "22:00",
          },
        ],
        knowsAbout: [
          "Systemic Constellations",
          "Family Constellations",
          "Organisational Constellations",
          "Process-Oriented Psychology",
          "Personal Coaching",
          "Psychotherapy",
        ],
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: contactUrl,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          result: {
            "@type": "Reservation",
            name: "Psychology Session Booking",
          },
        },
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
    ],
  };
}

type HowToStep = {
  name: string;
  text: string;
};

export function buildHowToSchema({
  name,
  description,
  steps,
  locale,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  locale: Locale;
}) {
  return {
    "@type": "HowTo",
    name,
    description,
    inLanguage: locale,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

type ArticleSchemaInput = {
  url: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  date: string;
  locale: Locale;
  keywords?: string[];
  wordCount?: number;
  faq?: Array<{ question: string; answer: string }>;
  articleSection?: string;
  thumbnailUrl?: string;
};

export function buildArticleSchema({
  url,
  title,
  description,
  image,
  imageAlt,
  date,
  locale,
  keywords,
  wordCount,
  faq,
  articleSection,
  thumbnailUrl,
}: ArticleSchemaInput) {
  const imageUrl = toAbsoluteUrl(image);
  const imageObject = imageAlt
    ? {
        "@type": "ImageObject",
        url: imageUrl,
        contentUrl: imageUrl,
        description: imageAlt,
      }
    : imageUrl;
  const articleNode: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: title,
    description,
    image: imageObject,
    thumbnailUrl: thumbnailUrl ?? imageUrl,
    datePublished: date,
    dateModified: date,
    author: { "@id": personId },
    publisher: { "@id": serviceId },
    isPartOf: { "@id": websiteId },
    inLanguage: locale,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    speakable: buildSpeakableSchema(["article h1", "article h2", "article p"]),
  };

  if (articleSection) {
    articleNode.articleSection = articleSection;
  }
  if (keywords?.length) {
    articleNode.keywords = keywords;
  }
  if (wordCount) {
    articleNode.wordCount = wordCount;
  }

  const graph: Record<string, unknown>[] = [
    articleNode,
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { "@id": websiteId },
      inLanguage: locale,
    },
  ];

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return graph;
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
