import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProcessSection from "@/components/ProcessSection";
import HomeFaq from "@/components/HomeFaq";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getRouteDictionary } from "@/lib/locale";
import {
  buildLocalizedBreadcrumbSchema,
  buildHowToSchema,
  buildSpeakableSchema,
  buildPageMetadata,
  personId,
  serviceId,
  toAbsoluteUrl,
  toLocalizedAbsoluteUrl,
  websiteId,
} from "@/lib/seo";

const HOME_SERVICE_IDS = ["private", "business", "coaching"] as const;

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale, dictionary } = await getRouteDictionary(
    (
      await params
    ).locale
  );

  return buildPageMetadata({
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription,
    pathname: "/",
    locale,
  });
}

export default async function LocalizedHomePage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getRouteDictionary(
    (
      await params
    ).locale
  );
  const homeUrl = toLocalizedAbsoluteUrl(locale, "/");
  const sessionsUrl = toLocalizedAbsoluteUrl(locale, "/sessions");

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: dictionary.metadata.homeTitle,
        description: dictionary.metadata.homeDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": `${homeUrl}#services` },
        inLanguage: locale,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/opengraph-image.png"),
        },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${homeUrl}#services`,
        name: dictionary.homeServices.title,
        itemListElement: dictionary.homeServices.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${item.title} ${item.subtitle}`.trim(),
          item: `${sessionsUrl}#${HOME_SERVICE_IDS[index] ?? "private"}`,
        })),
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        hasOfferCatalog: { "@id": `${homeUrl}#services` },
      },
      {
        ...buildLocalizedBreadcrumbSchema(locale, [
          { name: dictionary.nav.home, path: "/" },
        ]),
      },
      {
        "@type": "FAQPage",
        "@id": `${homeUrl}#faq`,
        mainEntity: dictionary.homeFaq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      buildHowToSchema({
        name: `${dictionary.process.title} ${dictionary.process.accent}`,
        description: dictionary.process.description,
        steps: dictionary.process.steps.map((step) => ({
          name: step.title,
          text: step.body,
        })),
        locale,
      }),
    ],
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage-speakable`,
    speakable: buildSpeakableSchema([
      "#main-content h1",
      "#main-content h2",
      ".home-faq summary",
    ]),
  };

  return (
    <>
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
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
        />
        <Hero locale={locale} copy={dictionary.hero} />
        <AboutSection locale={locale} copy={dictionary.homeAbout} />
        <ServicesSection locale={locale} copy={dictionary.homeServices} />
        <PhilosophySection copy={dictionary.philosophy} />
        <ProcessSection locale={locale} copy={dictionary.process} />
        <HomeFaq copy={dictionary.homeFaq} />
      </main>
      <Footer
        locale={locale}
        dictionary={{ nav: dictionary.nav, footer: dictionary.footer }}
      />
      <BackToTop />
    </>
  );
}
