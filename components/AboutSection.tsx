import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import StatCounter from "./about/StatCounter";
import FloatingLocationTag from "./about/FloatingLocationTag";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

type AboutSectionProps = {
  locale: Locale;
  copy: SiteDictionary["homeAbout"];
};

export default function AboutSection({ locale, copy }: AboutSectionProps) {
  const headingId = "home-about-heading";

  return (
    <section
      id="home-about"
      aria-labelledby={headingId}
      className="defer-section"
      style={{
        backgroundColor: "#fdfaf6",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: "-2rem",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 16vw, 18rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "rgba(29,86,176,0.03)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Anna
      </div>

      <div
        className="container section-pad-lg"
        style={{ position: "relative" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 6fr",
            gap: "clamp(2.5rem, 6vw, 7rem)",
            alignItems: "center",
          }}
          className="about-grid"
        >
          <AnimateOnScroll direction="left">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "-1.5rem",
                  right: "1.5rem",
                  bottom: "-1.5rem",
                  background:
                    "linear-gradient(135deg, rgba(29,86,176,0.12) 0%, rgba(29,86,176,0.04) 100%)",
                  borderRadius: "2px",
                }}
              />

              <div
                className="img-zoom"
                style={{ borderRadius: "2px", position: "relative", zIndex: 1 }}
              >
                <Image
                  src="/about-anna.webp"
                  alt="Anna Kolmykova — Systemic Constellation Facilitator"
                  width={478}
                  height={717}
                  quality={90}
                  sizes="(max-width: 860px) 92vw, min(42vw, 640px)"
                  loading="lazy"
                  fetchPriority="low"
                  style={{ width: "100%", height: "auto", borderRadius: "2px" }}
                />
              </div>

              <FloatingLocationTag
                locationTitle={copy.locationTitle}
                locationText={copy.locationText}
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={0.15}>
            <div>
              <span
                className="t-overline"
                style={{ display: "block", marginBottom: "1.2rem" }}
              >
                {copy.overline}
              </span>

              <h2
                id={headingId}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#0a0a0a",
                  marginBottom: "2rem",
                }}
              >
                <span style={{ display: "block", marginBottom: "0.2rem" }}>
                  {copy.title}
                </span>
                <em style={{ color: "var(--c-blue)", fontStyle: "italic" }}>
                  {copy.accent}
                </em>
              </h2>

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: "1.9",
                  color: "#444",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem",
                  marginBottom: "2.5rem",
                }}
              >
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  padding: "1.8rem 0",
                  borderTop: "1px solid #e8e4de",
                  borderBottom: "1px solid #e8e4de",
                  marginBottom: "2.5rem",
                }}
              >
                {copy.stats.map((s, i) => (
                  <StatCounter key={i} {...s} delay={0.3 + i * 0.1} />
                ))}
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Button
                  as="link"
                  href="/about"
                  locale={locale}
                  variant="primary"
                  size="md"
                  iconRight={<Icon name="arrow-right" white />}
                >
                  {copy.primaryCta}
                </Button>
                <Button
                  as="link"
                  href="/contact#form"
                  locale={locale}
                  variant="outline"
                  size="md"
                >
                  {copy.secondaryCta}
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
