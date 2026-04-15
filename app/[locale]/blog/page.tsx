import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import LocalizedLink from "@/components/localized-link";
import { getRouteDictionary } from "@/lib/locale";
import { getBlogDictionary, formatBlogDate } from "@/lib/blog";
import {
  buildLocalizedBreadcrumbSchema,
  buildPageMetadata,
  buildSpeakableSchema,
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
  const { locale } = await getRouteDictionary((await params).locale);
  const blog = getBlogDictionary(locale);

  return buildPageMetadata({
    title: blog.indexTitle,
    description: blog.indexDescription,
    pathname: "/blog",
    locale,
  });
}

export default async function BlogIndexPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getRouteDictionary(
    (await params).locale
  );
  const blog = getBlogDictionary(locale);
  const blogUrl = toLocalizedAbsoluteUrl(locale, "/blog");

  const itemListElements = blog.articles.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: toLocalizedAbsoluteUrl(locale, `/blog/${article.slug}`),
    name: article.title,
    image: toAbsoluteUrl(article.image),
  }));

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${blogUrl}#webpage`,
        url: blogUrl,
        name: blog.indexTitle,
        description: blog.indexDescription,
        isPartOf: { "@id": websiteId },
        inLanguage: locale,
        about: {
          "@type": "Thing",
          name: "Psychology, Systemic Constellations & Therapy",
        },
        mainEntity: { "@id": `${blogUrl}#itemlist` },
        speakable: buildSpeakableSchema(["h1", "[data-speakable]"]),
        author: { "@id": personId },
        numberOfItems: blog.articles.length,
      },
      {
        "@type": "ItemList",
        "@id": `${blogUrl}#itemlist`,
        name: blog.indexTitle,
        numberOfItems: blog.articles.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: itemListElements,
      },
      {
        ...buildLocalizedBreadcrumbSchema(locale, [
          { name: dictionary.nav.home, path: "/" },
          { name: blog.indexHeading, path: "/blog" },
        ]),
      },
    ],
  };

  const [featured, ...rest] = blog.articles;

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
      />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />

        <section
          style={{
            backgroundColor: "var(--c-ivory)",
            paddingTop: "calc(var(--header-height) + clamp(3rem, 7vw, 5.5rem))",
            paddingBottom: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          <div className="container" style={{ maxWidth: "1060px" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "var(--c-ink)",
                letterSpacing: "-0.5px",
              }}
            >
              {blog.indexHeading}
            </h1>
            <p
              data-speakable
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.6vw, 16px)",
                lineHeight: 1.7,
                color: "var(--c-gray-50)",
                marginTop: "1rem",
                maxWidth: "600px",
              }}
            >
              {blog.indexSubtitle}
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: "var(--c-ivory)" }}>
          <div
            className="container"
            style={{
              maxWidth: "1060px",
              paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
              paddingBottom: "clamp(2.5rem, 4vw, 3.5rem)",
            }}
          >
            <AnimateOnScroll direction="up">
              <LocalizedLink
                href={`/blog/${featured.slug}`}
                locale={locale}
                className="blog-feat"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "clamp(2rem, 4vw, 3.5rem)",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "3/2",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 860px) 92vw, 56vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.6s var(--ease-out)",
                    }}
                    className="blog-feat-img"
                  />
                </div>
                <div>
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
                    {featured.category} &middot;{" "}
                    <time dateTime={featured.date}>{formatBlogDate(featured.date, locale)}</time>{" "}
                    &middot; {featured.readTime} {blog.readTimeLabel}
                  </span>
                  <h2
                    className="blog-feat-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "var(--c-ink)",
                      margin: "0.8rem 0 1rem",
                      transition: "color 0.3s",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14.5px",
                      lineHeight: 1.75,
                      color: "var(--c-gray-50)",
                    }}
                  >
                    {featured.description}
                  </p>
                  <span
                    className="blog-feat-arrow"
                    style={{
                      display: "inline-block",
                      marginTop: "1.2rem",
                      fontFamily: "var(--font-ui)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: "var(--c-gray-50)",
                      transition: "color 0.3s, letter-spacing 0.3s",
                    }}
                  >
                    {blog.readMore} &rarr;
                  </span>
                </div>
              </LocalizedLink>
            </AnimateOnScroll>
          </div>
        </section>

        <div style={{ backgroundColor: "var(--c-ivory)" }}>
          <div className="container" style={{ maxWidth: "1060px" }}>
            <div style={{ height: "1px", background: "var(--c-gray-10)" }} />
          </div>
        </div>

        <section style={{ backgroundColor: "var(--c-ivory)" }}>
          <div
            className="container"
            style={{
              maxWidth: "1060px",
              paddingTop: "clamp(2rem, 4vw, 3rem)",
              paddingBottom: "clamp(4rem, 7vw, 6rem)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                gap: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              {rest.map((article, index) => (
                <AnimateOnScroll
                  key={article.slug}
                  direction="up"
                  delay={index * 0.06}
                >
                  <LocalizedLink
                    href={`/blog/${article.slug}`}
                    locale={locale}
                    className="blog-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      color: "inherit",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16/10",
                        borderRadius: "4px",
                        overflow: "hidden",
                        marginBottom: "1rem",
                      }}
                    >
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1060px) 45vw, 340px"
                        loading="lazy"
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.6s var(--ease-out)",
                        }}
                        className="blog-card-img"
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "var(--c-gray-30)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {article.category} &middot;{" "}
                      <time dateTime={article.date}>{formatBlogDate(article.date, locale)}</time>{" "}
                      &middot; {article.readTime} {blog.readTimeLabel}
                    </span>
                    <h2
                      className="blog-card-title"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                        fontWeight: 400,
                        lineHeight: 1.3,
                        color: "var(--c-ink)",
                        marginBottom: "0.4rem",
                        transition: "color 0.3s",
                      }}
                    >
                      {article.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13.5px",
                        lineHeight: 1.7,
                        color: "var(--c-gray-50)",
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.description}
                    </p>
                  </LocalizedLink>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          .blog-feat:hover .blog-feat-img { transform: scale(1.03); }
          .blog-feat:hover .blog-feat-title { color: var(--c-gray-70); }
          .blog-feat:hover .blog-feat-arrow {
            color: var(--c-ink);
            letter-spacing: 3.5px;
          }
          .blog-card:hover .blog-card-img { transform: scale(1.03); }
          .blog-card:hover .blog-card-title { color: var(--c-gray-70); }
          @media (max-width: 860px) {
            .blog-feat { grid-template-columns: 1fr !important; }
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
