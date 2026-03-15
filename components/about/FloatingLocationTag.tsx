"use client";

import { motion } from "framer-motion";

export default function FloatingLocationTag({
  locationTitle,
  locationText,
}: {
  locationTitle: string;
  locationText: string;
}) {
  return (
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
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontStyle: "italic",
          display: "block",
          marginBottom: "2px",
        }}
      >
        {locationTitle}
      </span>
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "9px",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.74)",
        }}
      >
        {locationText}
      </span>
    </motion.div>
  );
}
