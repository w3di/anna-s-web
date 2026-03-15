"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

type HeroClientProps = {
  locale: Locale;
  copy: SiteDictionary["hero"];
};

export default function HeroClient({ locale, copy }: HeroClientProps) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <header
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "720px",
        overflow: "hidden",
        display: "flex",
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
          quality={90}
          src="/hero-landscape.webp"
          alt="Anna Kolmykova — Systemic Constellation Facilitator"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1440px"
          style={{ objectFit: "cover", objectPosition: "center 38%" }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(6,14,30,0.86) 0%, rgba(6,14,30,0.46) 52%, rgba(6,14,30,0.14) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(6,14,30,0.8) 0%, rgba(6,14,30,0.25) 42%, transparent 68%)",
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          y: textY,
          opacity,
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "calc(var(--header-height) + clamp(1.5rem, 6vh, 4rem))",
          paddingBottom: "clamp(4rem, 8vh, 6.5rem)",
        }}
        className="container"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: "780px" }}
        >
          <motion.div
            variants={item}
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                width: "36px",
                height: "1px",
                background: "rgba(29,86,176,0.85)",
              }}
            />
            <span
              className="t-overline-light"
              style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "4px" }}
            >
              {copy.overline}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.7rem, 6.3vw, 5.85rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              color: "white",
              letterSpacing: "-1px",
              marginBottom: "2rem",
            }}
          >
            <span style={{ display: "block", marginBottom: "0.2rem" }}>
              {copy.firstName}
            </span>
            <span
              style={{
                display: "block",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {copy.lastName}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.65vw, 1.08rem)",
              fontWeight: 300,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.72)",
              maxWidth: "500px",
              marginBottom: "2.25rem",
              letterSpacing: "0.2px",
            }}
          >
            {copy.tagline}
          </motion.p>

          <motion.div
            variants={item}
            style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}
          >
            <Button
              as="link"
              href="/sessions"
              locale={locale}
              variant="primary"
              size="lg"
              iconRight={<Icon name="arrow-right" white />}
            >
              {copy.primaryCta}
            </Button>
            <Button
              as="link"
              href="/about"
              locale={locale}
              variant="white"
              size="lg"
            >
              {copy.secondaryCta}
            </Button>
          </motion.div>

          <motion.blockquote
            variants={item}
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              maxWidth: "560px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.65,
                color: "rgba(255,253,248,0.9)",
                margin: "0 0 0.75rem",
                letterSpacing: "0.2px",
              }}
            >
              &ldquo;{copy.quote}&rdquo;
            </p>
            <cite
              style={{
                display: "block",
                fontStyle: "normal",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                color: "rgba(255,253,248,0.75)",
                letterSpacing: "0.5px",
              }}
            >
              {copy.quoteAuthor}
            </cite>
          </motion.blockquote>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 0.8 },
          y: {
            delay: 2.5,
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        onClick={() => {
          const headerH =
            Number.parseInt(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--header-height"
              )
            ) || 78;
          const target = window.innerHeight - headerH;
          lenis?.scrollTo(target, { duration: 1.2 });
        }}
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          background: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        whileHover={{
          borderColor: "rgba(255,255,255,0.6)",
          color: "rgba(255,255,255,0.9)",
        }}
        aria-label={copy.scrollAria}
      >
        <Icon name="arrow-down" white />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "clamp(1.25rem, 4vw, 3rem)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          alignItems: "flex-end",
        }}
        className="hide-mobile"
      >
        {[copy.location, copy.founded].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color:
                i === 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.25)",
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </header>
  );
}
