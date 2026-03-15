"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

interface HeaderClientProps {
  transparent?: boolean;
  locale: Locale;
  dictionary: Pick<
    SiteDictionary,
    "localeLabel" | "languages" | "languagesShort" | "nav"
  >;
}

export default function HeaderClient({
  transparent = false,
  locale,
  dictionary,
}: HeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const onScroll = useCallback((l: { scroll: number; limit: number }) => {
    const progress = l.scroll / (l.limit - window.innerHeight || 1);
    setScrollProgress(progress);
    setScrolled(l.scroll > 60);
  }, []);
  const lenis = useLenis(onScroll);

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  const isLight = transparent && !scrolled;
  const navLinks = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/sessions", label: dictionary.nav.sessions },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          backgroundColor: isLight ? "transparent" : "rgba(253,250,246,0.96)",
          borderBottom: isLight
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(232,228,222,0.85)",
          boxShadow: isLight ? "none" : "0 2px 18px rgba(0,0,0,0.04)",
          backdropFilter: isLight ? "none" : "saturate(180%) blur(12px)",
          transition:
            "background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {/* Reading progress bar */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "var(--c-blue)",
            transformOrigin: "left",
          }}
          initial={false}
          animate={{ scaleX: scrollProgress }}
        />

        <div
          className="container"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              height: "65px",
              flexShrink: 0,
            }}
          >
            <Image
              src={
                isLight
                  ? "/mind_of_heart_white_cropped.webp"
                  : "/mind_of_heart_black_cropped.webp"
              }
              alt="Mind of Heart"
              width={160}
              height={52}
              quality={90}
              style={{
                height: "44px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: active
                      ? "var(--c-blue)"
                      : isLight
                      ? "rgba(255,255,255,0.85)"
                      : "var(--c-gray-70)",
                    padding: "6px 14px",
                    borderRadius: "2px",
                    position: "relative",
                    transition: "color 0.2s",
                  }}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.color = isLight
                        ? "#ffffff"
                        : "var(--c-ink)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.color = isLight
                        ? "rgba(255,255,255,0.85)"
                        : "var(--c-gray-70)";
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        left: "14px",
                        right: "14px",
                        height: "2px",
                        background: "var(--c-blue)",
                        borderRadius: "1px",
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="desktop-lang">
              <LanguageSwitcher
                locale={locale}
                labels={dictionary.languages}
                shortLabels={dictionary.languagesShort}
                ariaLabel={dictionary.localeLabel}
                compact
                inverted={isLight}
              />
            </div>

            <Link
              href="/contact#form"
              style={{
                marginLeft: "0.5rem",
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isLight ? "#ffffff" : "var(--c-blue)",
                border: `2px solid ${
                  isLight ? "rgba(255,255,255,0.6)" : "var(--c-blue)"
                }`,
                padding: "9px 22px",
                borderRadius: "2px",
                transition:
                  "background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease",
              }}
              className="header-book-link"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isLight
                  ? "rgba(255,255,255,0.2)"
                  : "var(--c-blue)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = isLight
                  ? "#ffffff"
                  : "var(--c-blue)";
              }}
            >
              {dictionary.nav.book}
            </Link>
          </nav>

          {/* Mobile burger */}
          <motion.button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="mobile-nav"
            style={{
              display: "none",
              width: "42px",
              height: "42px",
              borderRadius: "999px",
              border: `1px solid ${
                isLight ? "rgba(255,255,255,0.2)" : "rgba(17,17,17,0.12)"
              }`,
              background: isLight ? "rgba(255,255,255,0.08)" : "#ffffff",
              cursor: "pointer",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 6 : 0,
              }}
              style={{
                display: "block",
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                background: isLight ? "#ffffff" : "var(--c-ink)",
              }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{
                display: "block",
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                background: isLight ? "#ffffff" : "var(--c-ink)",
              }}
            />
            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -6 : 0,
              }}
              style={{
                display: "block",
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                background: isLight ? "#ffffff" : "var(--c-ink)",
              }}
            />
          </motion.button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 3.5rem)" }}
            animate={{
              clipPath: "circle(150% at calc(100% - 2rem) 3.5rem)",
            }}
            exit={{
              clipPath: "circle(0% at calc(100% - 2rem) 3.5rem)",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 98,
              background: "rgba(253,250,246,0.98)",
              paddingTop: "calc(var(--header-height) + 1.5rem)",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              overflow: "auto",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      lineHeight: 1.1,
                      textDecoration: "none",
                      color: active ? "var(--c-blue)" : "var(--c-ink)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "flex-start",
                marginTop: "1.5rem",
              }}
            >
              <LanguageSwitcher
                locale={locale}
                labels={dictionary.languages}
                shortLabels={dictionary.languagesShort}
                ariaLabel={dictionary.localeLabel}
              />
              <Link
                href="/contact#form"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "#ffffff",
                  backgroundColor: "var(--c-blue)",
                  padding: "12px 18px",
                  borderRadius: "2px",
                }}
              >
                {dictionary.nav.book}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .header-book-link:hover {
          background-color: var(--c-blue) !important;
          color: #ffffff !important;
        }
        @media (max-width: 1080px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
