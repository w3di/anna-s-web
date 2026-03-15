"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteDictionary } from "@/lib/dictionaries";

type ProcessCopy = SiteDictionary["process"];

type StepProps = {
  step: ProcessCopy["steps"][number];
  index: number;
  total: number;
};

export default function ProcessStep({ step, index, total }: StepProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.li
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
              fontFamily: "var(--font-ui)",
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
              fontFamily: "var(--font-display)",
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
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: "1.8",
              color: "#444",
              margin: 0,
              maxWidth: "380px",
            }}
          >
            {step.body}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
