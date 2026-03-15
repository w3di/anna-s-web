"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

interface HeaderProps {
  transparent?: boolean;
  locale: Locale;
  dictionary: Pick<
    SiteDictionary,
    "localeLabel" | "languages" | "languagesShort" | "nav"
  >;
}

export default function Header({
  transparent = false,
  locale,
  dictionary,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/sessions", label: dictionary.nav.sessions },
    { href: "/contact", label: dictionary.nav.contact },
  ];

  const lenis = useLenis();
  useLenis(
    (l) => {
      const y = l.scroll;
      setScrolled(y > 60);
      setScrollProgress(l.progress * 100);
    },
    [lenis]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMenuOpen(false);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  const solid = scrolled || menuOpen || !transparent;
  const isLight = transparent && !scrolled && !menuOpen;

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
          backgroundColor: solid ? "rgba(253,250,246,0.95)" : "transparent",
          backdropFilter: solid ? "blur(16px) saturate(1.8)" : "none",
          WebkitBackdropFilter: solid ? "blur(16px) saturate(1.8)" : "none",
          borderBottom: solid
            ? "1px solid rgba(232,228,222,0.85)"
            : "1px solid transparent",
          transition:
            "background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
          boxShadow: scrolled ? "0 2px 26px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
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
                !isLight
                  ? "/mind_of_heart_black_cropped.webp"
                  : "/mind_of_heart_white_cropped.webp"
              }
              alt="Mind of Heart"
              width={160}
              height={52}
              style={{
                height: "44px",
                width: "auto",
                objectFit: "contain",
                transition: "opacity 0.3s",
              }}
              priority
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
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: isLight
                      ? active
                        ? "#ffffff"
                        : "rgba(255,255,255,0.84)"
                      : active
                      ? "var(--c-blue)"
                      : "var(--c-gray-70)",
                    padding: "6px 14px",
                    borderRadius: "2px",
                    position: "relative",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.color = isLight
                        ? "#ffffff"
                        : "var(--c-blue)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.color = isLight
                        ? "rgba(255,255,255,0.84)"
                        : "var(--c-gray-70)";
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        left: "14px",
                        right: "14px",
                        height: "2px",
                        background: isLight ? "#ffffff" : "var(--c-blue)",
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
                fontFamily: "Raleway, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isLight ? "#ffffff" : "var(--c-blue)",
                border: `2px solid ${
                  isLight ? "rgba(255,255,255,0.58)" : "var(--c-blue)"
                }`,
                padding: "9px 22px",
                borderRadius: "2px",
                transition: "all 0.22s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "var(--c-blue)";
                el.style.borderColor = "var(--c-blue)";
                el.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.borderColor = isLight
                  ? "rgba(255,255,255,0.58)"
                  : "var(--c-blue)";
                el.style.color = isLight ? "#ffffff" : "var(--c-blue)";
              }}
            >
              {dictionary.nav.book}
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "none",
              flexDirection: "column",
              gap: "5px",
              zIndex: 110,
            }}
            className="mobile-burger"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  borderRadius: "1px",
                  backgroundColor:
                    isLight && !menuOpen ? "#ffffff" : "var(--c-ink)",
                  transition: "all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transformOrigin: "center",
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-7px) rotate(-45deg)"
                      : "scaleX(0) rotate(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Reading progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${scrollProgress}%`,
            background: "linear-gradient(to right, var(--c-blue), #4f82d2)",
            transition: "width 0.1s ease",
            borderRadius: "0 1px 1px 0",
          }}
        />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 44px) 39px)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 44px) 39px)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 44px) 39px)",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              backgroundColor: "#fdfaf6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.09 }}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(2rem, 7vw, 3rem)",
                    fontWeight: 400,
                    fontStyle: pathname === link.href ? "italic" : "normal",
                    textDecoration: "none",
                    color:
                      pathname === link.href ? "var(--c-blue)" : "var(--c-ink)",
                    display: "block",
                    padding: "0.6rem 0",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{
                marginTop: "2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <LanguageSwitcher
                locale={locale}
                labels={dictionary.languages}
                shortLabels={dictionary.languagesShort}
                ariaLabel={dictionary.localeLabel}
              />
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#888",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                info@mindofheart.com
              </span>
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#bbb",
                }}
              >
                +420 608 514 450
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1080px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
