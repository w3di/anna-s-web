import AnimateOnScroll from "./AnimateOnScroll";
import type { SiteDictionary } from "@/lib/dictionaries";

type HomeFaqProps = {
  copy: SiteDictionary["homeFaq"];
};

export default function HomeFaq({ copy }: HomeFaqProps) {
  return (
    <section
      className="defer-section"
      aria-labelledby="home-faq-heading"
      style={{ backgroundColor: "#fdfaf6" }}
    >
      <div className="container section-pad-lg" style={{ maxWidth: "820px" }}>
        <AnimateOnScroll direction="up">
          <span
            className="t-overline"
            style={{
              display: "block",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {copy.overline}
          </span>
          <h2
            id="home-faq-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "#0a0a0a",
              textAlign: "center",
              marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            {copy.title}
          </h2>
        </AnimateOnScroll>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {copy.items.map((item, index) => (
            <AnimateOnScroll key={index} direction="up" delay={index * 0.06}>
              <details
                className="faq-item"
                style={{
                  borderBottom: "1px solid #e8e4de",
                }}
              >
                <summary
                  className="faq-summary"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.4rem 0",
                    cursor: "pointer",
                    listStyle: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    fontWeight: 600,
                    lineHeight: 1.45,
                    color: "#1a1a1a",
                  }}
                >
                  {item.question}
                  <span
                    className="faq-icon"
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: "1px solid #d8d4ce",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "#999",
                      transition: "transform 0.25s, border-color 0.25s",
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    paddingBottom: "1.4rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      lineHeight: "1.8",
                      color: "#555",
                      margin: 0,
                      maxWidth: "640px",
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </details>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-summary::marker { display: none; content: ""; }
        details[open] .faq-icon {
          transform: rotate(45deg);
          border-color: var(--c-blue);
          color: var(--c-blue);
        }
        .faq-summary:hover {
          color: var(--c-blue);
        }
        .faq-summary {
          transition: color 0.2s;
        }
      `}</style>
    </section>
  );
}
