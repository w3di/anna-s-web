import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

type NotFoundPageProps = {
  locale: Locale;
  dictionary: Pick<
    SiteDictionary,
    "localeLabel" | "languages" | "languagesShort" | "nav" | "footer" | "notFoundPage"
  >;
};

export default function NotFoundPage({
  locale,
  dictionary,
}: NotFoundPageProps) {
  const copy = dictionary.notFoundPage;

  return (
    <main id="main-content">
      <Header
        locale={locale}
        dictionary={{
          localeLabel: dictionary.localeLabel,
          languages: dictionary.languages,
          languagesShort: dictionary.languagesShort,
          nav: dictionary.nav,
        }}
      />

      <section
        style={{
          backgroundColor: "var(--c-ivory)",
          minHeight: "calc(100vh - var(--header-height))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "var(--header-height)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(29,86,176,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container"
          style={{
            textAlign: "center",
            padding: "4rem clamp(1.25rem, 4vw, 3rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <AnimateOnScroll direction="up" duration={0.8}>
            <span
              className="t-overline"
              style={{ display: "block", marginBottom: "1.5rem" }}
            >
              {copy.overline}
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={0.1} duration={0.9}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(7rem, 18vw, 14rem)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-2px",
                color: "var(--c-blue)",
                margin: 0,
                opacity: 0.12,
              }}
            >
              {copy.title}
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={0.2} duration={0.8}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "var(--c-ink)",
                margin: "-1.5rem 0 0",
              }}
            >
              {copy.subtitle}
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll direction="fade" delay={0.35} duration={0.6}>
            <div
              style={{
                width: "56px",
                height: "2px",
                background: "var(--c-blue)",
                margin: "1.5rem auto",
              }}
            />
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={0.4} duration={0.7}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "var(--c-gray-50)",
                maxWidth: "440px",
                margin: "0 auto 2.5rem",
              }}
            >
              {copy.description}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={0.5} duration={0.7}>
            <Button
              as="link"
              href="/"
              locale={locale}
              variant="primary"
              size="lg"
              iconRight={<Icon name="arrow-right" white />}
            >
              {copy.cta}
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer
        locale={locale}
        dictionary={{ nav: dictionary.nav, footer: dictionary.footer }}
      />
    </main>
  );
}
