"use client";

import type { Locale } from "@/lib/dictionaries";
import LocalizedLink from "./localized-link";
import Icon from "./icons/Icon";

type Props = {
  locale: Locale;
  label: string;
};

export default function FooterCTALink({ locale, label }: Props) {
  return (
    <LocalizedLink
      href="/contact#form"
      locale={locale}
      className="footer-cta-link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 32px",
        backgroundColor: "var(--c-blue)",
        color: "white",
        fontFamily: "var(--font-ui)",
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
      {label}
      <Icon name="arrow-right" white />
    </LocalizedLink>
  );
}
