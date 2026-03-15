"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteDictionary } from "@/lib/dictionaries";

type Props = {
  dictionary: Pick<SiteDictionary, "nav" | "footer">;
};

export default function FooterMiddle({ dictionary }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const navLinks = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/sessions", label: dictionary.nav.sessions },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  return (
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
              quality={90}
              style={{
                height: "40px",
                width: "auto",
                objectFit: "contain",
                opacity: 0.92,
              }}
            />
          </Link>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: "1.75",
              color: "rgba(255,255,255,0.78)",
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
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "#8eb7ff",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              info@mindofheart.com
            </a>
            <a
              href="tel:+420608514450"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.86)",
                textDecoration: "none",
              }}
            >
              +420 608 514 450
            </a>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.68)",
              }}
            >
              {dictionary.footer.location}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h4
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
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
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.84)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--c-blue)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.84)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h4
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
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
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.84)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--c-blue)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.84)")
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </div>
  );
}
