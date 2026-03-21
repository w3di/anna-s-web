"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LocalizedLink from "@/components/localized-link";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";
import { stripLocaleFromPathname } from "@/lib/locale-routing";

interface HeaderClientProps {
  transparent?: boolean;
  locale: Locale;
  dictionary: Pick<
    SiteDictionary,
    "localeLabel" | "languages" | "languagesShort" | "nav"
  >;
  langHrefOverrides?: Partial<Record<Locale, string>>;
}

export default function HeaderClient({
  transparent = false,
  locale,
  dictionary,
  langHrefOverrides,
}: HeaderClientProps) {
  const pathname = usePathname();
  const normalizedPathname = stripLocaleFromPathname(pathname);
  const mobileMenuId = useId();
  const mobileMenuTitleId = `${mobileMenuId}-title`;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuWasOpenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis((l: { scroll: number; limit: number }) => {
    const limit = l.limit - window.innerHeight;
    const progress = limit > 0 ? l.scroll / limit : 0;
    setScrollProgress(progress);
    setScrolled(l.scroll > 60);
  });

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      queueMicrotask(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      });
    } else {
      document.body.style.overflow = "";
      lenis?.start();
      if (menuWasOpenRef.current) {
        menuButtonRef.current?.focus();
      }
    }
    menuWasOpenRef.current = menuOpen;
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  function getFocusableMenuItems() {
    if (!mobileMenuRef.current) {
      return [];
    }

    return Array.from(
      mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function handleMobileMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableItems = getFocusableMenuItems();

    if (focusableItems.length === 0) {
      event.preventDefault();
      return;
    }

    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    }

    if (!event.shiftKey && activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  }

  const isLight = transparent && !scrolled && !menuOpen;
  const navLinks = [
    { href: "/", label: dictionary.nav.home },
    { href: "/about", label: dictionary.nav.about },
    { href: "/sessions", label: dictionary.nav.sessions },
    { href: "/blog", label: dictionary.nav.blog },
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
          <LocalizedLink
            href="/"
            locale={locale}
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
          </LocalizedLink>

          <nav
            aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = normalizedPathname === link.href;
              return (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  locale={locale}
                  className="header-nav-link"
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
                </LocalizedLink>
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
                hrefOverrides={langHrefOverrides}
              />
            </div>

            <LocalizedLink
              href="/contact#form"
              locale={locale}
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
            </LocalizedLink>
          </nav>

          <motion.button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMenuOpen((o) => !o)}
            className="mobile-nav mobile-nav-trigger"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
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
            id={mobileMenuId}
            ref={mobileMenuRef}
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 3.5rem)" }}
            animate={{
              clipPath: "circle(150% at calc(100% - 2rem) 3.5rem)",
            }}
            exit={{
              clipPath: "circle(0% at calc(100% - 2rem) 3.5rem)",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={mobileMenuTitleId}
            tabIndex={-1}
            onKeyDown={handleMobileMenuKeyDown}
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
            <h2 id={mobileMenuTitleId} className="sr-only">
              Site navigation
            </h2>
            <nav
              aria-label="Mobile navigation"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {navLinks.map((link) => {
                const active = normalizedPathname === link.href;
                return (
                  <LocalizedLink
                    key={link.href}
                    href={link.href}
                    locale={locale}
                    className="mobile-menu-link"
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
                  </LocalizedLink>
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
                hrefOverrides={langHrefOverrides}
              />
              <LocalizedLink
                href="/contact#form"
                locale={locale}
                className="mobile-menu-book-link"
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
              </LocalizedLink>
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
