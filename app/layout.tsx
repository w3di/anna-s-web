import type { Metadata } from "next";
import { Playfair_Display, Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
import { getSiteDictionary } from "@/lib/locale";
import SmoothScroll from "@/components/SmoothScroll";
import {
  availableLanguages,
  buildPageMetadata,
  businessAddress,
  personId,
  serviceId,
  siteName,
  siteUrl,
  toAbsoluteUrl,
  websiteId,
} from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-open-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getSiteDictionary();
  const pageMetadata = buildPageMetadata({
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription,
    pathname: "/",
    locale,
  });

  return {
    ...pageMetadata,
    metadataBase: new URL(siteUrl),
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
      "Anna Kolmykova",
      "systemic constellations",
      "family constellations",
      "organisational constellations",
      "process-oriented psychology",
      "psychologist Prague",
      "online coaching",
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
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dictionary } = await getSiteDictionary();
  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Anna Kolmykova",
        jobTitle:
          "Systemic constellation facilitator and process-oriented psychologist",
        description: dictionary.metadata.homeDescription,
        email: "info@mindofheart.com",
        telephone: "+420608514450",
        url: siteUrl,
        image: toAbsoluteUrl("/about-anna.webp"),
        address: businessAddress,
        knowsLanguage: [...availableLanguages],
        worksFor: { "@id": serviceId },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: siteName,
        url: siteUrl,
        image: toAbsoluteUrl("/hero-landscape.webp"),
        description: dictionary.metadata.homeDescription,
        areaServed: ["Prague", "Online"],
        availableLanguage: [...availableLanguages],
        email: "info@mindofheart.com",
        telephone: "+420608514450",
        address: businessAddress,
        provider: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: dictionary.metadata.homeDescription,
        inLanguage: locale,
        publisher: { "@id": serviceId },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${raleway.variable} ${openSans.variable}`}
    >
      <head>
        <meta name="theme-color" content="#fdfaf6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body id="site-top" className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
