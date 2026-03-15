"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import type { SiteDictionary } from "@/lib/dictionaries";

function StatCounter({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      style={{ textAlign: "center" }}
    >
      <span
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--c-blue)",
          display: "block",
          lineHeight: 1,
          marginBottom: "0.4rem",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "Raleway, sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "#888",
          display: "block",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

type AboutSectionProps = {
  copy: SiteDictionary["homeAbout"];
};

export default function AboutSection({ copy }: AboutSectionProps) {
  return (
    <section
      style={{
        backgroundColor: "#fdfaf6",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative bg text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: "-2rem",
          transform: "translateY(-50%)",
          fontFamily: "Playfair Display, serif",
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
          {/* ── Photo column ────────────────────────────────── */}
          <AnimateOnScroll direction="left">
            <div style={{ position: "relative" }}>
              {/* Blue accent block behind */}
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

              {/* Main photo */}
              <div
                className="img-zoom"
                style={{ borderRadius: "2px", position: "relative", zIndex: 1 }}
              >
                <Image
                  src="/about-anna.webp"
                  alt="Anna Kolmykova — Systemic Constellation Facilitator"
                  width={478}
                  height={717}
                  sizes="(max-width: 860px) 90vw, 600px"
                  style={{ width: "100%", height: "auto", borderRadius: "2px" }}
                />
              </div>

              {/* Floating tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  position: "absolute",
                  bottom: "2.5rem",
                  right: "-1.5rem",
                  background: "#0a0a0a",
                  color: "white",
                  padding: "1.2rem 1.6rem",
                  borderRadius: "2px",
                  zIndex: 10,
                  minWidth: "160px",
                }}
                className="hide-mobile"
              >
                <span
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.4rem",
                    fontStyle: "italic",
                    display: "block",
                    marginBottom: "2px",
                  }}
                >
                  {copy.locationTitle}
                </span>
                <span
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "9px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {copy.locationText}
                </span>
              </motion.div>
            </div>
          </AnimateOnScroll>

          {/* ── Text column ─────────────────────────────────── */}
          <AnimateOnScroll direction="right" delay={0.15}>
            <div>
              <span
                className="t-overline"
                style={{ display: "block", marginBottom: "1.2rem" }}
              >
                {copy.overline}
              </span>

              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
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
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "15px",
                  lineHeight: "1.9",
                  color: "#555",
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

              {/* Stats row */}
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

              {/* CTAs */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Button
                  as="link"
                  href="/about"
                  variant="primary"
                  size="md"
                  iconRight={<Icon name="arrow-right" white />}
                >
                  {copy.primaryCta}
                </Button>
                <Button
                  as="link"
                  href="/contact#form"
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
