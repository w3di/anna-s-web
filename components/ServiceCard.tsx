"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "./icons/Icon";
import LocalizedLink from "./localized-link";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

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

type ServiceCardProps = {
  locale: Locale;
  service: ServicesCopy["items"][number];
  index: number;
};

export default function ServiceCard({ locale, service, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionId = NUM_TO_SECTION[service.num] ?? "private";
  const href = `/sessions#${sectionId}`;
  const titleId = `service-card-title-${sectionId}-${index}`;
  const subtitleId = `service-card-subtitle-${sectionId}-${index}`;
  const descriptionId = `service-card-description-${sectionId}-${index}`;
  const isActive = hovered || focused;

  return (
    <li style={{ listStyle: "none" }}>
      <LocalizedLink
        href={href}
        locale={locale}
        className="service-card-link"
        aria-labelledby={`${titleId} ${subtitleId}`}
        aria-describedby={descriptionId}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: isActive ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <Image
              src={getServiceImage(service.num)}
              alt={`${service.title} ${service.subtitle}`.trim()}
              fill
              sizes="(max-width: 860px) 92vw, (max-width: 1280px) 48vw, 420px"
              quality={75}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter:
                  service.num === "01"
                    ? "saturate(0.75) sepia(0.22) hue-rotate(-12deg) contrast(0.94) brightness(1.05)"
                    : undefined,
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isActive
                ? "linear-gradient(to top, rgba(6,14,30,0.95) 0%, rgba(6,14,30,0.75) 50%, rgba(6,14,30,0.3) 100%)"
                : "linear-gradient(to top, rgba(6,14,30,0.88) 0%, rgba(6,14,30,0.45) 50%, rgba(6,14,30,0.05) 100%)",
              transition: "background 0.4s ease",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.35)",
              zIndex: 2,
            }}
          >
            {service.num}
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "1rem",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-ui)",
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
              id={titleId}
              style={{
                fontFamily: "var(--font-display)",
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
              id={subtitleId}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "1.2rem",
              }}
            >
              {service.subtitle}
            </p>

            <motion.span
              animate={{ width: isActive ? "56px" : "36px" }}
              transition={{ duration: 0.3 }}
              style={{
                display: "block",
                height: "2px",
                background: "var(--c-blue)",
                marginBottom: "1.2rem",
              }}
            />

            <div
              style={{
                overflow: "hidden",
                maxHeight: isActive ? "200px" : "0px",
                opacity: isActive ? 1 : 0,
                transition: "max-height 0.45s ease, opacity 0.35s ease",
              }}
            >
              <p
                id={descriptionId}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  color: "rgba(255,255,255,0.72)",
                  marginBottom: "1.5rem",
                }}
              >
                {service.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isActive ? "12px" : "8px",
                transition: "gap 0.25s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: isActive ? "var(--c-blue)" : "rgba(255,255,255,0.55)",
                  transition: "color 0.25s ease",
                }}
              >
                {service.cta}
              </span>
              <Icon name="arrow-right" white />
            </div>
          </div>
        </motion.article>
      </LocalizedLink>
    </li>
  );
}
