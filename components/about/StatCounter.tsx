"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function StatCounter({
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
          fontFamily: "var(--font-display)",
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
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "#5f5f5f",
          display: "block",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
