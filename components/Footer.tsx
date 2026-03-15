"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "./icons/Icon";
import type { SiteDictionary } from "@/lib/dictionaries";

type FooterProps = {
  dictionary: Pick<SiteDictionary, "nav" | "footer">;
};

export default function Footer({ dictionary }: FooterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const navLinks = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/sessions", label: dictionary.nav.sessions },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(29,86,176,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top CTA band */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="container"
          style={{
            padding: "4rem clamp(1.25rem, 4vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--c-blue)",
                marginBottom: "0.5rem",
              }}
            >
              {dictionary.footer.ctaOverline}
            </p>
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 400,
                color: "white",
                margin: 0,
              }}
            >
              {dictionary.footer.ctaTitle}
            </h3>
          </div>
          <Link
            href="/contact#form"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              backgroundColor: "var(--c-blue)",
              color: "white",
              fontFamily: "Raleway, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "background-color 0.22s ease, transform 0.18s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "var(--c-blue-mid)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "var(--c-blue)";
              el.style.transform = "none";
            }}
          >
            {dictionary.footer.ctaButton}
            <Icon name="arrow-right" white />
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div
        ref={ref}
        className="container"
        style={{ padding: "5rem clamp(1.25rem, 4vw, 3rem) 3rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "clamp(2rem, 6vw, 5rem)",
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              style={{ display: "inline-block", marginBottom: "1.8rem" }}
            >
              <Image
                src="/mind_of_heart_white_cropped.webp"
                alt="Mind of Heart"
                width={150}
                height={48}
                style={{
                  height: "40px",
                  width: "auto",
                  objectFit: "contain",
                  opacity: 0.85,
                }}
              />
            </Link>
            <p
              style={{
                fontFamily: "Open Sans, sans-serif",
                fontSize: "14px",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.44)",
                maxWidth: "280px",
                marginBottom: "2rem",
              }}
            >
              {dictionary.footer.brandDescription}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <a
                href="mailto:info@mindofheart.com"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "14px",
                  color: "var(--c-blue)",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                info@mindofheart.com
              </a>
              <a
                href="tel:+420608514450"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                }}
              >
                +420 608 514 450
              </a>
              <span
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {dictionary.footer.location}
              </span>
            </div>
          </motion.div>

          {/* Pages col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "1.5rem",
              }}
            >
              {dictionary.footer.pagesTitle}
            </h4>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--c-blue)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.6)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Sessions col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "1.5rem",
              }}
            >
              {dictionary.footer.sessionsTitle}
            </h4>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {[
                [dictionary.footer.sessionLinks[0], "/sessions#private"],
                [dictionary.footer.sessionLinks[1], "/sessions#business"],
                [dictionary.footer.sessionLinks[2], "/sessions#coaching"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--c-blue)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.6)")
                  }
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="container"
          style={{
            padding: "1.5rem clamp(1.25rem, 4vw, 3rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "10px",
              letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            {dictionary.footer.rights}
          </span>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            {dictionary.footer.location}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
