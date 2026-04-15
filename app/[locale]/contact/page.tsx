import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import BackToTop from "@/components/BackToTop";
import ContactForm from "@/components/ContactForm";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getRouteDictionary } from "@/lib/locale";
import {
  availableLanguages,
  buildLocalizedBreadcrumbSchema,
  buildPageMetadata,
  contactEmail,
  contactPhone,
  personId,
  serviceAreas,
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
  const { locale, dictionary } = await getRouteDictionary(
    (
      await params
    ).locale
  );

  return buildPageMetadata({
    title: dictionary.metadata.contactTitle,
    description: dictionary.metadata.contactDescription,
    pathname: "/contact",
    locale,
  });
}

export default async function LocalizedContactPage({
  params,
}: LocalePageProps) {
  const { locale, dictionary } = await getRouteDictionary(
    (
      await params
    ).locale
  );
  const copy = dictionary.contactPage;
  const contactUrl = toLocalizedAbsoluteUrl(locale, "/contact");
  const formHeadingId = "contact-form-heading";
  const contactDetails = [
    {
      label: copy.locationLabel,
      value: copy.locationValue,
      href: undefined,
      sub: copy.locationSub,
    },
    {
      label: copy.emailLabel,
      value: copy.emailValue,
      href: `mailto:${contactEmail}`,
      sub: undefined,
    },
    {
      label: copy.phoneLabel,
      value: copy.phoneValue,
      href: `tel:${contactPhone}`,
      sub: undefined,
    },
  ] as const;

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${contactUrl}#webpage`,
        url: contactUrl,
        name: dictionary.metadata.contactTitle,
        description: dictionary.metadata.contactDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: locale,
        mainEntity: { "@id": `${contactUrl}#contact-point` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl("/contact-banner.webp"),
        },
      },
      {
        "@type": "ContactPoint",
        "@id": `${contactUrl}#contact-point`,
        email: contactEmail,
        telephone: contactPhone,
        contactType: "consultation booking",
        areaServed: [...serviceAreas],
        availableLanguage: [...availableLanguages],
      },
      {
        ...buildLocalizedBreadcrumbSchema(locale, [
          { name: dictionary.nav.home, path: "/" },
          { name: dictionary.nav.contact, path: "/contact" },
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactPageSchema),
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
          aria-labelledby={formHeadingId}
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
                  <h2
                    id={formHeadingId}
                    className="t-overline"
                    style={{ display: "block", marginBottom: "1.2rem" }}
                  >
                    {copy.formOverline}
                  </h2>
                  <p
                    aria-hidden="true"
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
                  </p>
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

                  <address style={{ fontStyle: "normal" }}>
                    <dl
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                        margin: 0,
                      }}
                    >
                      {contactDetails.map((detail, index) => (
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
                            <svg
                              aria-hidden="true"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="var(--c-blue)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {index === 0 ? (
                                <>
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </>
                              ) : index === 1 ? (
                                <>
                                  <rect x="2" y="4" width="20" height="16" rx="2" />
                                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </>
                              ) : (
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              )}
                            </svg>
                          </div>
                          <div>
                            <dt
                              style={{
                                fontFamily: "var(--font-ui)",
                                fontSize: "9px",
                                fontWeight: 700,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color: "#666666",
                                marginBottom: "3px",
                              }}
                            >
                              {detail.label}
                            </dt>
                            <dd style={{ margin: 0 }}>
                              {detail.href ? (
                                <a
                                  href={detail.href}
                                  className="contact-detail-link"
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
                            </dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </address>

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

                  <div
                    style={{
                      marginTop: "2.5rem",
                      borderRadius: "4px",
                      overflow: "hidden",
                      aspectRatio: "4/3",
                    }}
                  >
                    <iframe
                      title="Mind of Heart — Prague, Czech Republic"
                      src="https://maps.google.com/maps?q=50.0797,14.4402&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
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
