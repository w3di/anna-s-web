"use client";

export type FieldProps = {
  id: string;
  label: string;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  prefix?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  isFocused: boolean;
  error?: boolean;
  errorMessage?: string;
  describedBy?: string;
  required?: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export default function ContactFormField({
  id,
  label,
  type = "text",
  inputMode,
  autoComplete,
  prefix,
  multiline = false,
  rows = 5,
  value,
  isFocused,
  error = false,
  errorMessage,
  describedBy,
  required = false,
  onChange,
  onFocus,
  onBlur,
}: FieldProps) {
  const hasValue = value.length > 0;
  const showPrefix = Boolean(prefix);
  const inputStyle = {
    width: "100%" as const,
    background: "transparent" as const,
    border: "none" as const,
    borderBottom: `2px solid ${
      error ? "#c44" : isFocused ? "var(--c-blue)" : "#d7d1ca"
    }`,
    padding: "12px 0" as const,
    fontFamily: "var(--font-body)" as const,
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
          fontFamily: "var(--font-ui)",
          fontSize: isFocused || hasValue ? "9px" : "13px",
          fontWeight: 700,
          letterSpacing: isFocused || hasValue ? "2px" : "0",
          textTransform: isFocused || hasValue ? "uppercase" : "none",
          color: isFocused ? "var(--c-blue)" : "#626262",
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
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          autoComplete={autoComplete}
          name={id}
          style={{ ...inputStyle, resize: "none" as const, lineHeight: "1.7" }}
        />
      ) : (
        <div
          style={{
            display: showPrefix ? "flex" : "block",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          {showPrefix && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "#0a0a0a",
                flexShrink: 0,
                paddingRight: "2px",
              }}
            >
              {prefix}
            </span>
          )}
          <input
            id={id}
            type={type}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            aria-invalid={error || undefined}
            aria-describedby={describedBy}
            autoComplete={autoComplete}
            name={id}
            style={{ ...inputStyle, flex: showPrefix ? 1 : undefined }}
          />
        </div>
      )}
      {errorMessage && describedBy ? (
        <p
          id={describedBy}
          style={{
            marginTop: "0.6rem",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            lineHeight: 1.5,
            color: "#c44",
          }}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
