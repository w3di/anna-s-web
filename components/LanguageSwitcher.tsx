"use client";

import { useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { locales, type Locale, type SiteDictionary } from "@/lib/dictionaries";

type Props = {
  locale: Locale;
  labels: SiteDictionary["languages"];
  shortLabels: SiteDictionary["languagesShort"];
  ariaLabel: string;
  compact?: boolean;
  inverted?: boolean;
};

export default function LanguageSwitcher({
  locale,
  labels,
  shortLabels,
  ariaLabel,
  compact = false,
  inverted = false,
}: Props) {
  const router = useRouter();
  const layoutId = useId();
  const [selected, setSelected] = useState<Locale>(locale);
  const [isPending, startTransition] = useTransition();

  async function setLocale(nextLocale: Locale) {
    if (nextLocale === selected) return;
    setSelected(nextLocale);
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <motion.div
      role="group"
      aria-label={ariaLabel}
      initial={false}
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
        const active = selected === code;
        return (
          <motion.button
            key={code}
            type="button"
            onClick={() => void setLocale(code)}
            aria-pressed={active}
            title={labels[code]}
            disabled={isPending && active}
            layout
            style={{
              appearance: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: "999px",
              padding: compact ? "7px 9px" : "8px 11px",
              fontFamily: "Raleway, sans-serif",
              fontSize: compact ? "9px" : "10px",
              fontWeight: 700,
              letterSpacing: compact ? "1.5px" : "2px",
              textTransform: "uppercase",
              position: "relative",
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
            }}
            transition={{
              color: { duration: 0.2 },
            }}
            whileHover={!active ? { scale: 1.05 } : undefined}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={(event) => {
              if (active) return;
              (event.currentTarget as HTMLElement).style.backgroundColor =
                inverted ? "rgba(255,255,255,0.1)" : "rgba(29,86,176,0.08)";
            }}
            onMouseLeave={(event) => {
              if (active) return;
              (event.currentTarget as HTMLElement).style.backgroundColor =
                "transparent";
            }}
          >
            {active && (
              <motion.span
                layoutId={`lang-toggle-${layoutId}`}
                transition={{
                  type: "spring",
                  stiffness: 400,
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
          </motion.button>
        );
      })}
    </motion.div>
  );
}
