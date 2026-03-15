"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./icons/Icon";
import ContactFormField from "./ContactFormField";
import type { SiteDictionary } from "@/lib/dictionaries";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormClientProps = {
  copy: SiteDictionary["contactForm"];
};

export default function ContactFormClient({ copy }: ContactFormClientProps) {
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
    if (honeypot || !validate()) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setHoneypot("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
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
        <ContactFormField
          id="name"
          label={copy.name}
          value={formData.name}
          isFocused={focused === "name"}
          error={!!errors.name}
          onChange={(v) => updateField("name", v)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
        <ContactFormField
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

      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          style={{
            marginTop: "1.25rem",
            fontFamily: "var(--font-body)",
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
            fontFamily: "var(--font-body)",
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
                fontFamily: "var(--font-body)",
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
                fontFamily: "var(--font-ui)",
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
