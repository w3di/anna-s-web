"use client";

export type FieldProps = {
  id: string;
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

export default function ContactFormField({
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
          aria-invalid={error || undefined}
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
          aria-invalid={error || undefined}
          style={inputStyle}
        />
      )}
    </div>
  );
}
