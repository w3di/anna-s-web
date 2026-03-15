"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import type { SiteDictionary } from "@/lib/dictionaries";

type ProcessCopy = SiteDictionary["process"];

function Step({
  step,
  index,
  total,
}: {
  step: ProcessCopy["steps"][number];
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      style={{ position: "relative" }}
    >
      {/* Connecting line */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          style={{
            position: "absolute",
            left: "1.35rem",
            top: "3.5rem",
            width: "1px",
            height: "calc(100% + 1rem)",
            background:
              "linear-gradient(to bottom, rgba(29,86,176,0.4), rgba(29,86,176,0.05))",
            transformOrigin: "top",
          }}
        />
      )}

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* Number circle */}
        <div
          style={{
            width: "2.7rem",
            height: "2.7rem",
            borderRadius: "50%",
            border: "2px solid rgba(29,86,176,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 1,
            background: "#fdfaf6",
          }}
        >
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "1px",
              color: "var(--c-blue)",
            }}
          >
            {step.num}
          </span>
        </div>

        <div style={{ paddingBottom: index < total - 1 ? "2.5rem" : 0 }}>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.3rem",
              fontWeight: 400,
              color: "#0a0a0a",
              marginBottom: "0.6rem",
              lineHeight: 1.2,
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "14px",
              lineHeight: "1.8",
              color: "#666",
              margin: 0,
              maxWidth: "380px",
            }}
          >
            {step.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type ProcessSectionProps = {
  copy: ProcessCopy;
};

export default function ProcessSection({ copy }: ProcessSectionProps) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section style={{ backgroundColor: "#fdfaf6" }}>
      <div className="container section-pad-lg">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "start",
          }}
          className="process-grid"
        >
          {/* Left: heading + image */}
          <div>
            <div ref={headingRef}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={headingInView ? { opacity: 1 } : {}}
                className="t-overline"
                style={{ display: "block", marginBottom: "1.2rem" }}
              >
                {copy.overline}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.7 }}
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#0a0a0a",
                  marginBottom: "1.5rem",
                }}
              >
                {copy.title}
                <br />
                <em style={{ color: "var(--c-blue)" }}>{copy.accent}</em>
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={headingInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                  width: "56px",
                  height: "2px",
                  background: "var(--c-blue)",
                  marginBottom: "2rem",
                  transformOrigin: "left",
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={headingInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "15px",
                  lineHeight: "1.85",
                  color: "#555",
                  marginBottom: "2.5rem",
                  maxWidth: "360px",
                }}
              >
                {copy.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={headingInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Button
                  as="link"
                  href="/contact#form"
                  variant="primary"
                  size="md"
                  iconRight={<Icon name="arrow-right" white />}
                >
                  {copy.cta}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right: steps */}
          <div>
            {copy.steps.map((s, i) => (
              <Step key={i} step={s} index={i} total={copy.steps.length} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
