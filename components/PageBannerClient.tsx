"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageBannerClientProps {
  title: string;
  backgroundImage: string;
  subtitle?: string;
  eyebrow?: string;
  imageFilter?: string;
  imagePosition?: string;
}

export default function PageBannerClient({
  title,
  backgroundImage,
  subtitle,
  eyebrow,
  imageFilter,
  imagePosition = "center 38%",
}: PageBannerClientProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-16, 34]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "clamp(420px, 58vh, 660px)",
        minHeight: "460px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "var(--header-height)",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          y: bgY,
        }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="(max-width: 1920px) 100vw, 1920px"
          priority
          fetchPriority="high"
          quality={65}
          style={{
            objectFit: "cover",
            objectPosition: imagePosition,
            filter: imageFilter,
          }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(6,10,22,0.55) 0%, rgba(6,10,22,0.65) 60%, rgba(6,10,22,0.8) 100%)",
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 2rem",
          y: contentY,
          maxWidth: "920px",
        }}
      >
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: eyebrow ? 0.1 : 0,
            duration: 0.85,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.5px",
            margin: 0,
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.72)",
              marginTop: "1rem",
            }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          style={{
            width: "56px",
            height: "2px",
            backgroundColor: "var(--c-blue)",
            margin: "1.5rem auto 0",
            transformOrigin: "center",
          }}
        />
      </motion.div>
    </section>
  );
}
