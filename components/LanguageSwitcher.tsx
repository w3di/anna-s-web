"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { locales, type Locale, type SiteDictionary } from "@/lib/dictionaries";
import LocalizedLink from "./localized-link";

type Props = {
  locale: Locale;
  labels: SiteDictionary["languages"];
  shortLabels: SiteDictionary["languagesShort"];
  ariaLabel: string;
  compact?: boolean;
  inverted?: boolean;
  hrefOverrides?: Partial<Record<Locale, string>>;
};

export default function LanguageSwitcher({
  locale,
  labels,
  shortLabels,
  ariaLabel,
  compact = false,
  inverted = false,
  hrefOverrides,
}: Props) {
  const pathname = usePathname();
  const layoutId = useId();
  const currentHref = pathname || "/";

  function persistLocale(nextLocale: Locale) {
    const body = JSON.stringify({ locale: nextLocale });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const payload = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/locale", payload);
      return;
    }

    void fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  }

  return (
    <motion.nav
      aria-label={ariaLabel}
      initial={false}
      className="language-switcher"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? "0.25rem" : "0.35rem",
        padding: compact ? "4px" : "5px",
        borderRadius: "999px",
        border: `1px solid ${
          inverted ? "rgba(255,255,255,0.18)" : "rgba(17,24,39,0.08)"
        }`,
        background: inverted ? "rgba(255,255,255,0.06)" : "rgba(17,24,39,0.04)",
        backdropFilter: "blur(8px)",
        position: "relative",
      }}
    >
      {locales.map((code) => {
        const active = locale === code;
        const itemStyle = {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "999px",
          padding: compact ? "7px 9px" : "8px 11px",
          fontFamily: "var(--font-ui)",
          fontSize: compact ? "9px" : "10px",
          fontWeight: 700,
          letterSpacing: compact ? "1.5px" : "2px",
          textTransform: "uppercase" as const,
          position: "relative" as const,
          zIndex: active ? 1 : 0,
          backgroundColor: "transparent",
          color: active
            ? inverted
              ? "var(--c-ink)"
              : "#ffffff"
            : inverted
            ? "rgba(255,255,255,0.72)"
            : "var(--c-gray-70)",
          minWidth: compact ? "36px" : "42px",
          textDecoration: "none",
        };
        const itemContent = (
          <>
            {active && (
              <motion.span
                layoutId={`lang-toggle-${layoutId}`}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "999px",
                  backgroundColor: inverted ? "#ffffff" : "var(--c-blue)",
                  boxShadow: inverted
                    ? "0 6px 18px rgba(255,255,255,0.12)"
                    : "0 10px 22px rgba(29,86,176,0.22)",
                  zIndex: -1,
                }}
              />
            )}
            {shortLabels[code]}
          </>
        );

        if (active) {
          return (
            <span
              key={code}
              aria-current="page"
              title={labels[code]}
              className="language-switcher__current"
              style={itemStyle}
            >
              {itemContent}
            </span>
          );
        }

        const targetHref = hrefOverrides?.[code] ?? currentHref;

        return (
          <LocalizedLink
            key={code}
            href={targetHref}
            locale={code}
            title={labels[code]}
            className="language-switcher__link"
            onClick={() => persistLocale(code)}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = inverted
                ? "rgba(255,255,255,0.9)"
                : "var(--c-ink)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = inverted
                ? "rgba(255,255,255,0.72)"
                : "var(--c-gray-70)";
            }}
            style={{
              ...itemStyle,
              cursor: "pointer",
            }}
          >
            {itemContent}
          </LocalizedLink>
        );
      })}
    </motion.nav>
  );
}
