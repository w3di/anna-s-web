import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BackToTop from "@/components/BackToTop";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import Image from "next/image";
import type { Metadata } from "next";
import { getSiteDictionary } from "@/lib/locale";
import {
  availableLanguages,
  buildPageMetadata,
  personId,
  siteUrl,
  toAbsoluteUrl,
  websiteId,
} from "@/lib/seo";

function getSessionImage(id: string) {
  switch (id) {
    case "private":
      return "/session-private.webp";
    case "business":
      return "/session-business.webp";
    default:
      return "/session-default.webp";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getSiteDictionary();
  return buildPageMetadata({
    title: dictionary.metadata.sessionsTitle,
    description: dictionary.metadata.sessionsDescription,
    pathname: "/sessions",
    locale,
    imagePath: "/sessions-banner.webp",
  });
}

export default async function SessionsPage() {
  const { locale, dictionary } = await getSiteDictionary();
  const copy = dictionary.sessionsPage;
  const sessionItems = copy.items.map((session) => ({
    "@type": "Service",
    "@id": `${siteUrl}/sessions#${session.id}`,
    url: `${siteUrl}/sessions#${session.id}`,
    name: `${session.title} ${session.subtitle}`.trim(),
    description: `${session.intro} ${session.description}`,
    serviceType: session.title,
    provider: { "@id": personId },
    areaServed: ["Prague", "Online"],
    availableLanguage: [...availableLanguages],
  }));
  const sessionsPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/sessions#webpage`,
        url: `${siteUrl}/sessions`,
        name: dictionary.metadata.sessionsTitle,
        description: dictionary.metadata.sessionsDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: locale,
        mainEntity: { "@id": `${siteUrl}/sessions#list` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/sessions-banner.webp"),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/sessions#list`,
        name: copy.title,
        itemListElement: sessionItems.map((session, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: session.name,
          item: `${siteUrl}/sessions#${copy.items[index].id}`,
        })),
      },
      ...sessionItems,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dictionary.nav.home,
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dictionary.nav.sessions,
            item: `${siteUrl}/sessions`,
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sessionsPageSchema) }}
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
      <PageBanner
        title={copy.title}
        backgroundImage="/sessions-banner.webp"
        imageFilter="saturate(0.45) sepia(0.2) hue-rotate(20deg) contrast(0.9) brightness(1.05)"
        imagePosition="25% 0%"
        eyebrow={copy.eyebrow}
        subtitle={copy.subtitle}
      />

      {copy.items.map((session, index) => (
        <section
          key={session.id}
          id={session.id}
          className="defer-section"
          style={{ backgroundColor: index % 2 === 0 ? "#fdfaf6" : "#111111" }}
        >
          <div
            className="container section-pad-lg session-grid"
            style={{
              display: "grid",
              gridTemplateColumns: index % 2 === 0 ? "1fr 1.1fr" : "1.1fr 1fr",
              gap: "clamp(2.5rem, 7vw, 7rem)",
              alignItems: "center",
            }}
          >
            <AnimateOnScroll
              direction={index % 2 === 0 ? "left" : "right"}
              style={{ order: index % 2 === 0 ? 0 : 1 }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-1rem",
                    left: "-1rem",
                    zIndex: 10,
                    width: "3.5rem",
                    height: "3.5rem",
                    background: "var(--c-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      color: "white",
                    }}
                  >
                    {session.num}
                  </span>
                </div>
                <div
                  className="img-zoom"
                  style={{
                    borderRadius: "2px",
                    aspectRatio: "4/5",
                    position: "relative",
                  }}
                >
                  <Image
                    src={getSessionImage(session.id)}
                    alt={session.title}
                    fill
                    sizes="(max-width: 860px) 92vw, (max-width: 1400px) 48vw, 640px"
                    loading="lazy"
                    fetchPriority="low"
                    style={{
                      objectFit: "cover",
                      borderRadius: "2px",
                      filter:
                        session.id === "private"
                          ? "saturate(0.75) sepia(0.22) hue-rotate(-12deg) contrast(0.94) brightness(1.05)"
                          : undefined,
                    }}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll
              direction={index % 2 === 0 ? "right" : "left"}
              delay={0.15}
              style={{ order: index % 2 === 0 ? 1 : 0 }}
            >
              <div>
                <span
                  className="t-overline"
                  style={{
                    display: "block",
                    marginBottom: "0.8rem",
                    color: index % 2 === 0 ? "var(--c-blue)" : "#8eb7ff",
                  }}
                >
                  {session.subtitle}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: index % 2 === 0 ? "#0a0a0a" : "white",
                    marginBottom: "2rem",
                  }}
                >
                  {session.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    lineHeight: "1.9",
                    color: index % 2 === 0 ? "#444" : "rgba(255,255,255,0.84)",
                    marginBottom: "1.2rem",
                  }}
                >
                  {session.intro}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    lineHeight: "1.9",
                    color: index % 2 === 0 ? "#444" : "rgba(255,255,255,0.84)",
                    marginBottom: "2rem",
                  }}
                >
                  {session.description}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  {session.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color:
                          index % 2 === 0 ? "#444" : "rgba(255,255,255,0.8)",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--c-blue)",
                          flexShrink: 0,
                        }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Button
                  as="link"
                  href="/contact#form"
                  variant={index % 2 === 0 ? "primary" : "white"}
                  size="md"
                  iconRight={<Icon name="arrow-right" white />}
                >
                  {session.cta}
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      ))}

      <section className="defer-section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container section-pad" style={{ textAlign: "center" }}>
          <AnimateOnScroll direction="up">
            <span
              className="t-overline"
              style={{ display: "block", marginBottom: "1rem", color: "#8eb7ff" }}
            >
              {copy.ctaOverline}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "white",
                marginBottom: "1rem",
              }}
            >
              {copy.ctaTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "rgba(255,255,255,0.82)",
                maxWidth: "440px",
                margin: "0 auto 2.5rem",
                lineHeight: "1.75",
              }}
            >
              {copy.ctaText}
            </p>
            <Button
              as="link"
              href="/contact#form"
              variant="primary"
              size="lg"
              iconRight={<Icon name="arrow-right" white />}
            >
              {copy.ctaButton}
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer dictionary={{ nav: dictionary.nav, footer: dictionary.footer }} />
      <BackToTop />

      <style>{`
        @media (max-width: 860px) {
          .session-grid { grid-template-columns: 1fr !important; }
          .session-grid > * { order: unset !important; }
        }
      `}</style>
    </main>
  );
}
