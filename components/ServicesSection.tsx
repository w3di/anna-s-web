"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import type { SiteDictionary } from "@/lib/dictionaries";

type ServicesCopy = SiteDictionary["homeServices"];

const NUM_TO_SECTION: Record<string, string> = {
  "01": "private",
  "02": "business",
  "03": "coaching",
};

function getServiceImage(num: string) {
  switch (num) {
    case "01":
      return "/session-private.webp";
    case "02":
      return "/session-business.webp";
    default:
      return "/session-default.webp";
  }
}

function ServiceCard({
  service,
  index,
}: {
  service: ServicesCopy["items"][number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionId = NUM_TO_SECTION[service.num] ?? "private";
  const href = `/sessions#${sectionId}`;

  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: index * 0.12,
          duration: 0.75,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "2px",
          cursor: "pointer",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Background photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${getServiceImage(service.num)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            filter:
              service.num === "01"
                ? "saturate(0.75) sepia(0.22) hue-rotate(-12deg) contrast(0.94) brightness(1.05)"
                : undefined,
          }}
        />

        {/* Gradient overlay — dark at bottom, semi on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(6,14,30,0.95) 0%, rgba(6,14,30,0.75) 50%, rgba(6,14,30,0.3) 100%)"
              : "linear-gradient(to top, rgba(6,14,30,0.88) 0%, rgba(6,14,30,0.45) 50%, rgba(6,14,30,0.05) 100%)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Number badge */}
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            fontFamily: "Raleway, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.35)",
            zIndex: 2,
          }}
        >
          {service.num}
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          {/* Tags — visible on hover */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginBottom: "1rem",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {service.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "3px 10px",
                  borderRadius: "1px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.15,
              marginBottom: "0.2rem",
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1rem",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "1.2rem",
            }}
          >
            {service.subtitle}
          </p>

          {/* Blue line */}
          <motion.span
            animate={{ width: hovered ? "56px" : "36px" }}
            transition={{ duration: 0.3 }}
            style={{
              display: "block",
              height: "2px",
              background: "var(--c-blue)",
              marginBottom: "1.2rem",
            }}
          />

          {/* Description — revealed on hover */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: hovered ? "200px" : "0px",
              opacity: hovered ? 1 : 0,
              transition: "max-height 0.45s ease, opacity 0.35s ease",
            }}
          >
            <p
              style={{
                fontFamily: "Open Sans, sans-serif",
                fontSize: "14px",
                lineHeight: "1.8",
                color: "rgba(255,255,255,0.72)",
                marginBottom: "1.5rem",
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: hovered ? "12px" : "8px",
              transition: "gap 0.25s ease",
            }}
          >
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: hovered ? "var(--c-blue)" : "rgba(255,255,255,0.55)",
                transition: "color 0.25s ease",
              }}
            >
              {service.cta}
            </span>
            <Icon name="arrow-right" white />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

type ServicesSectionProps = {
  copy: ServicesCopy;
};

export default function ServicesSection({ copy }: ServicesSectionProps) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section style={{ backgroundColor: "#0d0d0d", position: "relative" }}>
      <div className="container section-pad-lg">
        {/* Section header */}
        <div
          ref={headingRef}
          style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="t-overline"
                style={{ display: "block", marginBottom: "1rem" }}
              >
                {copy.overline}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.75 }}
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: 1.1,
                  maxWidth: "480px",
                }}
              >
                {copy.title}
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="hide-mobile"
            >
              <Button
                as="link"
                href="/sessions"
                variant="outline"
                size="md"
                iconRight={<Icon name="arrow-right" white />}
              >
                {copy.cta}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              width: "56px",
              height: "2px",
              background: "var(--c-blue)",
              marginTop: "1.5rem",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5px",
          }}
          className="services-grid"
        >
          {copy.items.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div
          style={{ marginTop: "2.5rem", textAlign: "center" }}
          className="show-mobile-only"
        >
          <Button
            as="link"
            href="/sessions"
            variant="outline"
            size="md"
            iconRight={<Icon name="arrow-right" white />}
          >
            {copy.cta}
          </Button>
        </div>
      </div>

      <style>{`
        @media (max-width: 719px) {
          .services-grid { grid-template-columns: 1fr !important; gap: 2px !important; }
        }
        @media (min-width: 720px) and (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
