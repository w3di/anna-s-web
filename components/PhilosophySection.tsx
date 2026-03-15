"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { SiteDictionary } from "@/lib/dictionaries";

type PhilosophyCopy = SiteDictionary["philosophy"];

function Pillar({
  pillar,
  index,
}: {
  pillar: PhilosophyCopy["pillars"][number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.7 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        cursor: "default",
        paddingLeft: hovered ? "1rem" : "0",
        transition: "padding-left 0.25s ease",
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.5rem",
            color: hovered ? "var(--c-blue)" : "rgba(255,255,255,0.2)",
            transition: "color 0.3s ease",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          {pillar.symbol}
        </span>
        <div>
          <div
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: hovered ? "var(--c-blue)" : "rgba(255,255,255,0.35)",
              transition: "color 0.3s ease",
              marginBottom: "0.6rem",
            }}
          >
            {pillar.label}
          </div>
          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "14px",
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              maxWidth: "380px",
            }}
          >
            {pillar.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type PhilosophySectionProps = {
  copy: PhilosophyCopy;
};

export default function PhilosophySection({ copy }: PhilosophySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10%",
          backgroundImage: "url(/philosophy-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.18,
          y,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,10,10,0.96) 30%, rgba(10,10,10,0.55) 100%)",
        }}
      />

      <div
        className="container section-pad-lg"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "start",
          }}
          className="philosophy-grid"
        >
          {/* Quote */}
          <div ref={textRef}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="t-overline"
              style={{ display: "block", marginBottom: "2rem" }}
            >
              {copy.overline}
            </motion.span>

            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}
            >
              &ldquo;{copy.quote}&rdquo;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: "2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "var(--c-blue)",
                }}
              />
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {copy.author}
              </span>
            </motion.div>
          </div>

          {/* Pillars */}
          <div>
            {copy.pillars.map((p, i) => (
              <Pillar key={i} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .philosophy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
