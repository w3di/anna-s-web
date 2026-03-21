import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import LocalizedLink from "@/components/localized-link";
import { locales } from "@/lib/dictionaries";
import { getRouteDictionary } from "@/lib/locale";
import {
  getBlogDictionary,
  getBlogArticle,
  getAllBlogSlugs,
  getBlogAlternateSlugs,
} from "@/lib/blog";
import {
  buildLocalizedBreadcrumbSchema,
  buildPageMetadata,
  contactEmail,
  personId,
  toAbsoluteUrl,
  toLocalizedAbsoluteUrl,
  websiteId,
} from "@/lib/seo";
import { notFound } from "next/navigation";

type BlogPostProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const { locale } = await getRouteDictionary(rawLocale);
  const article = getBlogArticle(locale, slug);

  if (!article) return {};

  const metadata = buildPageMetadata({
    title: article.title,
    description: article.description,
    pathname: `/blog/${slug}`,
    locale,
    type: "article",
  });

  const alternateSlugs = getBlogAlternateSlugs(locale, slug);
  if (alternateSlugs) {
    const languages = Object.fromEntries(
      (["en", "cz", "ru"] as const).map((l) => [
        l,
        toLocalizedAbsoluteUrl(l, `/blog/${alternateSlugs[l]}`),
      ])
    );
    metadata.alternates = {
      ...metadata.alternates,
      languages: {
        ...languages,
        "x-default": toLocalizedAbsoluteUrl("en", `/blog/${alternateSlugs.en}`),
      },
    };
  }

  return metadata;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { locale: rawLocale, slug } = await params;
  const { locale, dictionary } = await getRouteDictionary(rawLocale);
  const blog = getBlogDictionary(locale);
  const article = getBlogArticle(locale, slug);

  if (!article) notFound();

  const alternateSlugs = getBlogAlternateSlugs(locale, slug);
  const langHrefOverrides = alternateSlugs
    ? Object.fromEntries(
        (["en", "cz", "ru"] as const).map((l) => [
          l,
          `/blog/${alternateSlugs[l]}`,
        ])
      )
    : undefined;

  const articleUrl = toLocalizedAbsoluteUrl(locale, `/blog/${slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: article.title,
        description: article.description,
        image: toAbsoluteUrl(article.image),
        datePublished: article.date,
        dateModified: article.date,
        author: { "@id": personId },
        publisher: {
          "@type": "Organization",
          name: "Mind of Heart",
          email: contactEmail,
        },
        isPartOf: { "@id": websiteId },
        inLanguage: locale,
        mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
      },
      {
        "@type": "WebPage",
        "@id": `${articleUrl}#webpage`,
        url: articleUrl,
        name: article.title,
        description: article.description,
        isPartOf: { "@id": websiteId },
        inLanguage: locale,
      },
      ...(article.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${articleUrl}#faq`,
              mainEntity: article.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
      {
        ...buildLocalizedBreadcrumbSchema(locale, [
          { name: dictionary.nav.home, path: "/" },
          { name: blog.indexHeading, path: "/blog" },
          { name: article.title, path: `/blog/${slug}` },
        ]),
      },
    ],
  };

  return (
    <>
      <Header
        locale={locale}
        dictionary={{
          localeLabel: dictionary.localeLabel,
          languages: dictionary.languages,
          languagesShort: dictionary.languagesShort,
          nav: dictionary.nav,
        }}
        langHrefOverrides={langHrefOverrides}
      />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <article style={{ backgroundColor: "var(--c-ivory)" }}>
          {/* ── Breadcrumb + meta ── */}
          <div
            style={{
              paddingTop: "calc(var(--header-height) + clamp(2rem, 4vw, 3.5rem))",
            }}
          >
            <div className="container" style={{ maxWidth: "720px" }}>
              <LocalizedLink
                href="/blog"
                locale={locale}
                className="art-back"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--c-gray-30)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                &larr; {blog.backToBlog}
              </LocalizedLink>
            </div>
          </div>

          {/* ── Title ── */}
          <div
            className="container"
            style={{
              maxWidth: "720px",
              paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
              paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--c-gray-30)",
              }}
            >
              {article.date} &middot; {article.readTime} {blog.readTimeLabel}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--c-ink)",
                marginTop: "0.8rem",
                letterSpacing: "-0.3px",
              }}
            >
              {article.title}
            </h1>
          </div>

          {/* ── Image ── */}
          <div
            className="container"
            style={{
              maxWidth: "920px",
              paddingBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "2.2/1",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(max-width: 920px) 92vw, 920px"
                quality={80}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* ── Lead ── */}
          <div
            className="container"
            style={{ maxWidth: "720px", paddingBottom: "2rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                lineHeight: 1.8,
                color: "var(--c-gray-70)",
                margin: 0,
              }}
            >
              {article.description}
            </p>
            <div
              style={{
                width: "48px",
                height: "1px",
                background: "var(--c-gray-10)",
                marginTop: "2.5rem",
              }}
            />
          </div>

          {/* ── Body ── */}
          <div
            className="container"
            style={{
              maxWidth: "720px",
              paddingBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {article.sections.map((section, i) => (
              <AnimateOnScroll key={i} direction="up">
                <section
                  style={{ marginBottom: "clamp(2.5rem, 4vw, 3.5rem)" }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
                      fontWeight: 400,
                      lineHeight: 1.25,
                      color: "var(--c-ink)",
                      marginBottom: "1.2rem",
                    }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "15.5px",
                        lineHeight: 1.85,
                        color: "var(--c-gray-50)",
                        marginBottom:
                          j < section.paragraphs.length - 1
                            ? "1.1rem"
                            : 0,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </section>
              </AnimateOnScroll>
            ))}
          </div>

          {/* ── FAQ ── */}
          {article.faq.length > 0 && (
            <div
              className="container"
              style={{
                maxWidth: "720px",
                paddingBottom: "clamp(3rem, 5vw, 4.5rem)",
              }}
            >
              <div
                style={{
                  height: "1px",
                  background: "var(--c-gray-10)",
                  marginBottom: "clamp(2.5rem, 4vw, 3.5rem)",
                }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                  fontWeight: 400,
                  color: "var(--c-ink)",
                  marginBottom: "1.5rem",
                }}
              >
                {blog.faqHeading}
              </h2>

              {article.faq.map((item, i) => (
                <details
                  key={i}
                  className="art-faq"
                  style={{ borderBottom: "1px solid var(--c-gray-10)" }}
                >
                  <summary
                    className="art-faq-q"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1.5rem",
                      padding: "1.15rem 0",
                      cursor: "pointer",
                      listStyle: "none",
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      fontWeight: 600,
                      lineHeight: 1.45,
                      color: "var(--c-gray-70)",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.question}
                    <span
                      className="art-faq-icon"
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        fontSize: "18px",
                        fontWeight: 300,
                        color: "var(--c-gray-30)",
                        transition: "transform 0.3s, color 0.3s",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div style={{ paddingBottom: "1.15rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14.5px",
                        lineHeight: 1.8,
                        color: "var(--c-gray-50)",
                        margin: 0,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          )}
        </article>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "var(--c-warm)" }}>
          <div
            className="container section-pad"
            style={{ maxWidth: "720px", textAlign: "center" }}
          >
            <AnimateOnScroll direction="up">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 400,
                  color: "var(--c-ink)",
                  marginBottom: "0.6rem",
                }}
              >
                {blog.ctaTitle}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14.5px",
                  color: "var(--c-gray-50)",
                  maxWidth: "400px",
                  margin: "0 auto 2rem",
                  lineHeight: 1.7,
                }}
              >
                {blog.ctaText}
              </p>
              <Button
                as="link"
                href="/contact#form"
                locale={locale}
                variant="primary"
                size="lg"
                iconRight={<Icon name="arrow-right" white />}
              >
                {blog.ctaButton}
              </Button>
            </AnimateOnScroll>
          </div>
        </section>

        <style>{`
          .art-back:hover { color: var(--c-gray-70) !important; }
          .art-faq-q::-webkit-details-marker { display: none; }
          .art-faq-q::marker { display: none; content: ""; }
          details[open] .art-faq-icon {
            transform: rotate(45deg);
            color: var(--c-gray-70);
          }
          .art-faq-q:hover { color: var(--c-ink); }
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
