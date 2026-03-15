import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BackToTop from "@/components/BackToTop";
import ContactForm from "@/components/ContactForm";
import AnimateOnScroll from "@/components/AnimateOnScroll";
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

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getSiteDictionary();
  return buildPageMetadata({
    title: dictionary.metadata.contactTitle,
    description: dictionary.metadata.contactDescription,
    pathname: "/contact",
    locale,
    imagePath: "/contact-banner.webp",
  });
}

export default async function ContactPage() {
  const { locale, dictionary } = await getSiteDictionary();
  const copy = dictionary.contactPage;
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact#webpage`,
        url: `${siteUrl}/contact`,
        name: dictionary.metadata.contactTitle,
        description: dictionary.metadata.contactDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: locale,
        mainEntity: { "@id": `${siteUrl}/contact#contact-point` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/contact-banner.webp"),
        },
      },
      {
        "@type": "ContactPoint",
        "@id": `${siteUrl}/contact#contact-point`,
        email: "info@mindofheart.com",
        telephone: "+420608514450",
        contactType: "consultation booking",
        areaServed: ["Prague", "Online"],
        availableLanguage: [...availableLanguages],
      },
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
            name: dictionary.nav.contact,
            item: `${siteUrl}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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
        backgroundImage="/contact-banner.webp"
        imageFilter="saturate(0.45) sepia(0.2) hue-rotate(20deg) contrast(0.92) brightness(1.02)"
        imagePosition="55% 50%"
        eyebrow={copy.eyebrow}
        subtitle={copy.subtitle}
      />

      <section
        id="form"
        className="defer-section"
        style={{
          backgroundColor: "#fdfaf6",
          scrollMarginTop: "var(--header-height, 80px)",
        }}
      >
        <div className="container section-pad-lg">
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "clamp(3rem, 8vw, 8rem)",
              alignItems: "flex-start",
            }}
          >
            <AnimateOnScroll direction="left">
              <div>
                <span
                  className="t-overline"
                  style={{ display: "block", marginBottom: "1.2rem" }}
                >
                  {copy.formOverline}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: "#0a0a0a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {copy.formTitle}
                </h2>
                <div
                  style={{
                    width: "56px",
                    height: "2px",
                    background: "var(--c-blue)",
                    marginBottom: "2rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    lineHeight: "1.8",
                    color: "#444",
                    marginBottom: "2.5rem",
                    maxWidth: "480px",
                  }}
                >
                  {copy.formText}
                </p>
                <ContactForm copy={dictionary.contactForm} locale={locale} />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right" delay={0.15}>
              <div>
                <span
                  className="t-overline"
                  style={{ display: "block", marginBottom: "1.2rem" }}
                >
                  {copy.infoOverline}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.7rem",
                    fontWeight: 400,
                    color: "#0a0a0a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {copy.infoTitle}
                </h3>
                <div
                  style={{
                    width: "56px",
                    height: "2px",
                    background: "var(--c-blue)",
                    marginBottom: "2.5rem",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                  }}
                >
                  {[
                    {
                      label: copy.locationLabel,
                      value: copy.locationValue,
                      href: undefined,
                      sub: copy.locationSub,
                    },
                    {
                      label: copy.emailLabel,
                      value: copy.emailValue,
                      href: "mailto:info@mindofheart.com",
                      sub: undefined,
                    },
                    {
                      label: copy.phoneLabel,
                      value: copy.phoneValue,
                      href: "tel:+420608514450",
                      sub: undefined,
                    },
                  ].map((detail, index) => (
                    <div
                      key={detail.label}
                      style={{
                        display: "flex",
                        gap: "1.2rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "rgba(29,86,176,0.08)",
                          border: "1px solid rgba(29,86,176,0.15)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{ color: "var(--c-blue)", fontSize: "14px" }}
                        >
                          {index === 0 ? "◎" : index === 1 ? "✉" : "☎"}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "#666666",
                            display: "block",
                            marginBottom: "3px",
                          }}
                        >
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "15px",
                              color: "var(--c-blue)",
                              textDecoration: "none",
                            }}
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "15px",
                              color: "#333",
                            }}
                          >
                            {detail.value}
                          </span>
                        )}
                        {detail.sub && (
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "12px",
                              color: "#666666",
                              display: "block",
                              marginTop: "2px",
                            }}
                          >
                            {detail.sub}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "3rem",
                    padding: "1.8rem",
                    background: "#111",
                    borderRadius: "2px",
                    borderLeft: "3px solid var(--c-blue)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontStyle: "italic",
                      lineHeight: "1.7",
                      color: "rgba(255,255,255,0.88)",
                      margin: 0,
                    }}
                  >
                    &quot;{copy.note}&quot;
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "10px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.66)",
                      display: "block",
                      marginTop: "1rem",
                    }}
                  >
                    — {copy.noteAuthor}
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Footer dictionary={{ nav: dictionary.nav, footer: dictionary.footer }} />
      <BackToTop />

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
