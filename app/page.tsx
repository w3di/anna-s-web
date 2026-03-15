import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getSiteDictionary } from "@/lib/locale";
import type { Metadata } from "next";
import {
  buildPageMetadata,
  personId,
  serviceId,
  siteName,
  siteUrl,
  toAbsoluteUrl,
  websiteId,
} from "@/lib/seo";

const HOME_SERVICE_IDS = ["private", "business", "coaching"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getSiteDictionary();

  return buildPageMetadata({
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription,
    pathname: "/",
    locale,
    imagePath: "/hero-landscape.webp",
  });
}

export default async function Home() {
  const { locale, dictionary } = await getSiteDictionary();
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: dictionary.metadata.homeTitle,
        description: dictionary.metadata.homeDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": `${siteUrl}/#services` },
        inLanguage: locale,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/hero-landscape.webp"),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#services`,
        name: dictionary.homeServices.title,
        itemListElement: dictionary.homeServices.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${item.title} ${item.subtitle}`.trim(),
          item: `${siteUrl}/sessions#${HOME_SERVICE_IDS[index] ?? "private"}`,
        })),
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: siteName,
        url: siteUrl,
        hasOfferCatalog: { "@id": `${siteUrl}/#services` },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header
        transparent
        locale={locale}
        dictionary={{
          localeLabel: dictionary.localeLabel,
          languages: dictionary.languages,
          languagesShort: dictionary.languagesShort,
          nav: dictionary.nav,
        }}
      />
      <Hero copy={dictionary.hero} />
      <AboutSection copy={dictionary.homeAbout} />
      <ServicesSection copy={dictionary.homeServices} />
      <PhilosophySection copy={dictionary.philosophy} />
      <ProcessSection copy={dictionary.process} />
      <Footer dictionary={{ nav: dictionary.nav, footer: dictionary.footer }} />
      <BackToTop />
    </main>
  );
}
