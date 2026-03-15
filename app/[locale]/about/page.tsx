import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BackToTop from "@/components/BackToTop";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import { getRouteDictionary } from "@/lib/locale";
import {
  buildLocalizedBreadcrumbSchema,
  buildPageMetadata,
  personId,
  toAbsoluteUrl,
  toLocalizedAbsoluteUrl,
  websiteId,
} from "@/lib/seo";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale, dictionary } = await getRouteDictionary((await params).locale);

  return buildPageMetadata({
    title: dictionary.metadata.aboutTitle,
    description: dictionary.metadata.aboutDescription,
    pathname: "/about",
    locale,
    imagePath: "/about-banner.webp",
  });
}

export default async function LocalizedAboutPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getRouteDictionary((await params).locale);
  const copy = dictionary.aboutPage;
  const aboutUrl = toLocalizedAbsoluteUrl(locale, "/about");
  const approachHeadingId = "about-approach-heading";
  const backgroundHeadingId = "about-background-heading";
  const ctaHeadingId = "about-cta-heading";

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: dictionary.metadata.aboutTitle,
        description: dictionary.metadata.aboutDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: locale,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/about-banner.webp"),
        },
      },
      {
        ...buildLocalizedBreadcrumbSchema(locale, [
          { name: dictionary.nav.home, path: "/" },
          { name: dictionary.nav.about, path: "/about" },
        ]),
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <PageBanner
        title={copy.title}
        backgroundImage="/about-banner.webp"
        imageFilter="saturate(0.45) contrast(0.92) sepia(0.12) brightness(1.02)"
        imagePosition="center bottom"
        eyebrow={copy.eyebrow}
        subtitle={copy.subtitle}
      />

      <section
        className="defer-section"
        aria-labelledby={approachHeadingId}
        style={{ backgroundColor: "#fdfaf6" }}
      >
        <div
          className="container section-pad-lg about-intro-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "clamp(2.5rem, 7vw, 7rem)",
            alignItems: "center",
          }}
        >
          <AnimateOnScroll direction="left">
            <div
              className="img-zoom"
              style={{
                borderRadius: "2px",
                aspectRatio: "4/5",
                position: "relative",
              }}
            >
              <Image
                src="/about-anna.webp"
                alt="Anna Kolmykova"
                fill
                sizes="(max-width: 860px) 92vw, min(42vw, 640px)"
                loading="lazy"
                quality={90}
                fetchPriority="low"
                style={{ objectFit: "cover", borderRadius: "2px" }}
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={0.15}>
            <div>
              <span
                className="t-overline"
                style={{ display: "block", marginBottom: "1.2rem" }}
              >
                {copy.approachOverline}
              </span>
              <h2
                id={approachHeadingId}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#0a0a0a",
                  marginBottom: "2rem",
                }}
              >
                {copy.approachTitle}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: "1.9",
                  color: "#444",
                  marginBottom: "1.5rem",
                }}
              >
                {copy.intro1}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: "1.9",
                  color: "#444",
                  marginBottom: "2.5rem",
                }}
              >
                {copy.intro2}
              </p>

              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {copy.principles.map((principle, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      padding: "0.9rem 0",
                      borderTop: "1px solid #e8e4de",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        color: "var(--c-blue)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      {principle.icon}
                    </span>
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: "#2a2a2a",
                          display: "block",
                          marginBottom: "2px",
                        }}
                      >
                        {principle.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "#5a5a5a",
                        }}
                      >
                        {principle.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section
        className="defer-section"
        aria-labelledby={backgroundHeadingId}
        style={{ backgroundColor: "#111111", position: "relative" }}
      >
        <div className="container section-pad-lg">
          <AnimateOnScroll direction="up">
            <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                className="t-overline"
                style={{
                  display: "block",
                  marginBottom: "1rem",
                  color: "#8eb7ff",
                }}
              >
                {copy.backgroundOverline}
              </span>
              <h2
                id={backgroundHeadingId}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: 1.15,
                }}
              >
                {copy.backgroundTitle}
              </h2>
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  background: "var(--c-blue)",
                  marginTop: "1.5rem",
                }}
              />
            </div>
          </AnimateOnScroll>

          <ul style={{ maxWidth: "760px", listStyle: "none", margin: 0, padding: 0 }}>
            {copy.education.map((item, index) => (
              <li key={index}>
                <AnimateOnScroll direction="left" delay={index * 0.06}>
                  <div
                    style={{
                      display: "flex",
                      gap: "2rem",
                      padding: "1.4rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      alignItems: "flex-start",
                    }}
                  >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      color: "#8eb7ff",
                      flexShrink: 0,
                      paddingTop: "3px",
                      minWidth: "52px",
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      lineHeight: "1.65",
                      color: "rgba(255,255,255,0.84)",
                    }}
                  >
                    {item.item}
                  </span>
                  </div>
                </AnimateOnScroll>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="defer-section"
        aria-labelledby={ctaHeadingId}
        style={{ backgroundColor: "#fdfaf6" }}
      >
        <div className="container section-pad" style={{ textAlign: "center" }}>
          <AnimateOnScroll direction="up">
            <span
              className="t-overline"
              style={{ display: "block", marginBottom: "1rem" }}
            >
              {copy.ctaOverline}
            </span>
            <h2
              id={ctaHeadingId}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: "#0a0a0a",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              {copy.ctaTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "#666",
                maxWidth: "440px",
                margin: "0 auto 2.5rem",
                lineHeight: "1.75",
              }}
            >
              {copy.ctaText}
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                as="link"
                href="/contact#form"
                locale={locale}
                variant="primary"
                size="lg"
                iconRight={<Icon name="arrow-right" white />}
              >
                {copy.ctaPrimary}
              </Button>
              <Button
                as="link"
                href="/sessions"
                locale={locale}
                variant="outline"
                size="lg"
              >
                {copy.ctaSecondary}
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .about-intro-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </main>
      <Footer
        locale={locale}
        dictionary={{ nav: dictionary.nav, footer: dictionary.footer }}
      />
      <BackToTop />
    </>
  );
}
