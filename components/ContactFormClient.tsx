"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js/max";
import Icon from "./icons/Icon";
import Button from "./ui/Button";
import ContactFormField from "./ContactFormField";
import type { SiteDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";

type FormData = {
  name: string;
  contact: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LOCALE_TO_COUNTRY: Record<Locale, string> = {
  en: "US",
  cs: "CZ",
  ru: "RU",
};

function isEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

function validateContact(value: string, defaultCountry: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (isEmail(trimmed)) return true;
  return isValidPhoneNumber(trimmed, defaultCountry as never);
}

function formatPhoneInput(value: string): string {
  if (value.includes("@")) return value;
  const trimmed = value.trim();
  if (!trimmed) return value;

  const hadPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 0) return hadPlus ? "+" : value;

  const withPlus = hadPlus ? trimmed : `+${digits}`;
  // Если юзер сам ввёл + и код страны — форматируем через libphonenumber
  if (hadPlus) {
    const formatter = new AsYouType();
    return formatter.input(withPlus);
  }
  // Просто + и группировка по 3
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 3) {
    parts.push(digits.slice(i, i + 3));
  }
  return "+" + parts.join(" ");
}

type ContactFormClientProps = {
  copy: SiteDictionary["contactForm"];
  locale: Locale;
};

export default function ContactFormClient({
  copy,
  locale,
}: ContactFormClientProps) {
  const defaultCountry = LOCALE_TO_COUNTRY[locale] ?? "US";
  const contactErrorId = "contact-error";
  const statusId = "contact-form-status";
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "rateLimit"
  >("idle");
  const [focused, setFocused] = useState<keyof FormData | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, boolean>> = {};
    const { contact } = formData;
    if (!validateContact(contact, defaultCountry)) e.contact = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (
    e: Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0]
  ) => {
    e.preventDefault();
    if (honeypot || !validate()) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          defaultCountry,
          locale,
          website: honeypot,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setStatus("rateLimit");
          setTimeout(() => setStatus("idle"), 15000);
        } else {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 6000);
        }
        return;
      }

      setStatus("success");
      setFormData({ name: "", contact: "", subject: "", message: "" });
      setErrors({});
      setHoneypot("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const updateField = (id: keyof FormData, value: string) => {
    const finalValue =
      id === "contact" && /^[\d+\s\-()]*$/.test(value) && !value.includes("@")
        ? formatPhoneInput(value)
        : value;
    setFormData((p) => ({ ...p, [id]: finalValue }));
    if (errors[id]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[id];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
      <div hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: "absolute" }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 2rem",
        }}
        className="form-row"
      >
        <ContactFormField
          id="name"
          label={copy.name}
          autoComplete="name"
          value={formData.name}
          isFocused={focused === "name"}
          error={!!errors.name}
          onChange={(v) => updateField("name", v)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
        <ContactFormField
          id="contact"
          label={copy.contact}
          type="text"
          inputMode={
            /^[\d+\s\-()]/.test(formData.contact.trim()) ? "tel" : "email"
          }
          value={formData.contact}
          isFocused={focused === "contact"}
          error={!!errors.contact}
          errorMessage={errors.contact ? copy.validationError : undefined}
          describedBy={errors.contact ? contactErrorId : undefined}
          required
          onChange={(v) => updateField("contact", v)}
          onFocus={() => setFocused("contact")}
          onBlur={() => setFocused(null)}
        />
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <ContactFormField
          id="subject"
          label={copy.subject}
          value={formData.subject}
          isFocused={focused === "subject"}
          onChange={(v) => updateField("subject", v)}
          onFocus={() => setFocused("subject")}
          onBlur={() => setFocused(null)}
        />
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <ContactFormField
          id="message"
          label={copy.message}
          multiline
          rows={5}
          value={formData.message}
          isFocused={focused === "message"}
          error={!!errors.message}
          onChange={(v) => updateField("message", v)}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />
      </div>
      <div
        id={statusId}
        aria-live="polite"
        aria-atomic="true"
        style={{ marginTop: "1.25rem" }}
      >
        {status === "error" ? (
          <p
            role="alert"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#c44",
            }}
          >
            {copy.error}
          </p>
        ) : null}
        {status === "rateLimit" ? (
          <p
            role="alert"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#c44",
            }}
          >
            {copy.rateLimitError}
          </p>
        ) : null}
      </div>
      <div style={{ marginTop: "2.5rem" }}>
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                padding: "1.2rem 1.6rem",
                background: "rgba(29,86,176,0.06)",
                border: "1px solid rgba(29,86,176,0.2)",
                borderLeft: "3px solid var(--c-blue)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: "1.65",
                color: "var(--c-blue-mid)",
              }}
              role="status"
            >
              {copy.success}
            </motion.div>
          ) : (
            <motion.div
              key="submit"
              whileHover={
                status !== "sending" && status !== "rateLimit"
                  ? { scale: 1.01, translateY: -1 }
                  : {}
              }
              whileTap={
                status !== "sending" && status !== "rateLimit"
                  ? { scale: 0.98 }
                  : {}
              }
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === "sending"}
                disabled={status === "rateLimit"}
                iconRight={status === "sending" ? undefined : <Icon name="arrow-right" white />}
              >
                {status === "sending" ? copy.sending : copy.send}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
