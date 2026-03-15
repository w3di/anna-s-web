"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteDictionary } from "@/lib/dictionaries";

type PhilosophyCopy = SiteDictionary["philosophy"];

type PillarProps = {
  pillar: PhilosophyCopy["pillars"][number];
  index: number;
};

export default function PhilosophyPillar({ pillar, index }: PillarProps) {
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
            fontFamily: "var(--font-display)",
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
              fontFamily: "var(--font-ui)",
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
              fontFamily: "var(--font-body)",
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
