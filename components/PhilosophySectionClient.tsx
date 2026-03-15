"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import PhilosophyPillar from "./PhilosophyPillar";
import type { SiteDictionary } from "@/lib/dictionaries";

type PhilosophyCopy = SiteDictionary["philosophy"];

type PhilosophySectionClientProps = {
  copy: PhilosophyCopy;
};

export default function PhilosophySectionClient({
  copy,
}: PhilosophySectionClientProps) {
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
      className="defer-section"
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
            "linear-gradient(to right, rgba(10,10,10,0.96) 20%, rgba(10,10,10,0.55) 40%)",
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
              style={{
                display: "block",
                marginBottom: "2rem",
                color: "#8eb7ff",
              }}
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
                fontFamily: "var(--font-display)",
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
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {copy.author}
              </span>
            </motion.div>
          </div>

          {/* Pillars */}
          <div>
            {copy.pillars.map((p, i) => (
              <PhilosophyPillar key={i} pillar={p} index={i} />
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
