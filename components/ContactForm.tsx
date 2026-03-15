"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./icons/Icon";
import type { SiteDictionary } from "@/lib/dictionaries";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldProps = {
  id: keyof FormData;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  isFocused: boolean;
  error?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id,
  label,
  type = "text",
  multiline = false,
  rows = 5,
  value,
  isFocused,
  error = false,
  required = false,
  onChange,
  onFocus,
  onBlur,
}: FieldProps) {
  const hasValue = value.length > 0;
  const inputStyle = {
    width: "100%" as const,
    background: "transparent" as const,
    border: "none" as const,
    borderBottom: `2px solid ${
      error ? "#c44" : isFocused ? "var(--c-blue)" : "#d7d1ca"
    }`,
    padding: "12px 0" as const,
    fontFamily: "Open Sans, sans-serif" as const,
    fontSize: "15px" as const,
    color: "#0a0a0a" as const,
    outline: "none" as const,
    transition: "border-color 0.25s ease" as const,
    display: "block" as const,
  };

  return (
    <div style={{ position: "relative", paddingTop: "1.4rem" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 0,
          top: isFocused || hasValue ? "0" : "1.9rem",
          fontFamily: "Raleway, sans-serif",
          fontSize: isFocused || hasValue ? "9px" : "13px",
          fontWeight: 700,
          letterSpacing: isFocused || hasValue ? "2px" : "0",
          textTransform: isFocused || hasValue ? "uppercase" : "none",
          color: isFocused ? "var(--c-blue)" : "#888",
          pointerEvents: "none",
          transition: "all 0.22s ease",
          lineHeight: 1,
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          style={{ ...inputStyle, resize: "none" as const, lineHeight: "1.7" }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          style={inputStyle}
        />
      )}
    </div>
  );
}

type ContactFormProps = {
  copy: SiteDictionary["contactForm"];
};

export default function ContactForm({ copy }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [focused, setFocused] = useState<keyof FormData | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, boolean>> = {};
    const { email } = formData;
    if (!EMAIL_REGEX.test(email.trim())) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      console.warn("[ContactForm] Honeypot triggered, submit ignored");
      return;
    }
    if (!validate()) {
      console.warn("[ContactForm] Client validation failed", {
        email: formData.email,
      });
      return;
    }

    const requestId = crypto.randomUUID();
    console.info(`[ContactForm][${requestId}] Sending form`, {
      email: formData.email,
      hasName: Boolean(formData.name.trim()),
      hasSubject: Boolean(formData.subject.trim()),
      messageLength: formData.message.trim().length,
    });

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let responseJson: unknown = null;
      try {
        responseJson = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseJson = responseText;
      }

      console.info(`[ContactForm][${requestId}] API response`, {
        status: response.status,
        ok: response.ok,
        body: responseJson,
      });

      if (!response.ok) {
        throw new Error(
          `[ContactForm][${requestId}] Failed to submit contact form`
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setHoneypot("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      console.error(`[ContactForm][${requestId}] Submit failed`, error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const updateField = (id: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [id]: value }));
    if (errors[id]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[id];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
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
        <Field
          id="name"
          label={copy.name}
          value={formData.name}
          isFocused={focused === "name"}
          error={!!errors.name}
          onChange={(v) => updateField("name", v)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
        <Field
          id="email"
          label={copy.email}
          type="email"
          value={formData.email}
          isFocused={focused === "email"}
          error={!!errors.email}
          required
          onChange={(v) => updateField("email", v)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Field
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
        <Field
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

      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          style={{
            marginTop: "1.25rem",
            fontFamily: "Open Sans, sans-serif",
            fontSize: "13px",
            color: "#c44",
          }}
        >
          {copy.validationError}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          style={{
            marginTop: "1.25rem",
            fontFamily: "Open Sans, sans-serif",
            fontSize: "13px",
            color: "#c44",
          }}
        >
          {copy.error}
        </p>
      )}
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
                fontFamily: "Open Sans, sans-serif",
                fontSize: "14px",
                lineHeight: "1.65",
                color: "var(--c-blue-mid)",
              }}
            >
              {copy.success}
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              type="submit"
              disabled={status === "sending"}
              whileHover={
                status !== "sending" ? { scale: 1.01, translateY: -1 } : {}
              }
              whileTap={status !== "sending" ? { scale: 0.98 } : {}}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px 36px",
                backgroundColor:
                  status === "sending" ? "#9f9f9f" : "var(--c-blue)",
                color: "white",
                fontFamily: "Raleway, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "2px",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition:
                  "background-color 0.22s ease, box-shadow 0.22s ease",
                boxShadow:
                  status !== "sending"
                    ? "0 4px 20px rgba(29,86,176,0.28)"
                    : "none",
              }}
            >
              {status === "sending" ? (
                <>
                  <span
                    style={{
                      width: "13px",
                      height: "13px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 0.65s linear infinite",
                      display: "block",
                    }}
                  />
                  {copy.sending}
                </>
              ) : (
                <>
                  {copy.send}
                  <Icon name="arrow-right" white />
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
