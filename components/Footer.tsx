import FooterCTALink from "./FooterCTALink";
import FooterMiddle from "./FooterMiddle";
import type { SiteDictionary } from "@/lib/dictionaries";

type FooterProps = {
  dictionary: Pick<SiteDictionary, "nav" | "footer">;
};

export default function Footer({ dictionary }: FooterProps) {
  return (
    <footer
      className="defer-section"
      style={{
        backgroundColor: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(29,86,176,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="container"
          style={{
            padding: "4rem clamp(1.25rem, 4vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--c-blue)",
                marginBottom: "0.5rem",
              }}
            >
              {dictionary.footer.ctaOverline}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 400,
                color: "white",
                margin: 0,
              }}
            >
              {dictionary.footer.ctaTitle}
            </h3>
          </div>
          <FooterCTALink label={dictionary.footer.ctaButton} />
        </div>
      </div>

      <FooterMiddle dictionary={dictionary} />

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="container"
          style={{
            padding: "1.5rem clamp(1.25rem, 4vw, 3rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {dictionary.footer.rights}
          </span>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.58)",
            }}
          >
            {dictionary.footer.location}
          </span>
        </div>
      </div>

      <style>{`
        .footer-cta-link:hover {
          background-color: var(--c-blue-mid) !important;
          transform: translateY(-1px) !important;
        }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
