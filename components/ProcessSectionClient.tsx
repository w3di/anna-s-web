"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import ProcessStep from "./ProcessStep";
import type { SiteDictionary } from "@/lib/dictionaries";

type ProcessCopy = SiteDictionary["process"];

type ProcessSectionClientProps = {
  copy: ProcessCopy;
};

export default function ProcessSectionClient({ copy }: ProcessSectionClientProps) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      className="defer-section"
      style={{ backgroundColor: "#fdfaf6" }}
    >
      <div className="container section-pad-lg">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "start",
          }}
          className="process-grid"
        >
          <div>
            <div ref={headingRef}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={headingInView ? { opacity: 1 } : {}}
                className="t-overline"
                style={{ display: "block", marginBottom: "1.2rem" }}
              >
                {copy.overline}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.7 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#0a0a0a",
                  marginBottom: "1.5rem",
                }}
              >
                {copy.title}
                <br />
                <em style={{ color: "var(--c-blue)" }}>{copy.accent}</em>
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={headingInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                  width: "56px",
                  height: "2px",
                  background: "var(--c-blue)",
                  marginBottom: "2rem",
                  transformOrigin: "left",
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={headingInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: "1.85",
                  color: "#444",
                  marginBottom: "2.5rem",
                  maxWidth: "360px",
                }}
              >
                {copy.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={headingInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Button
                  as="link"
                  href="/contact#form"
                  variant="primary"
                  size="md"
                  iconRight={<Icon name="arrow-right" white />}
                >
                  {copy.cta}
                </Button>
              </motion.div>
            </div>
          </div>

          <div>
            {copy.steps.map((s, i) => (
              <ProcessStep key={i} step={s} index={i} total={copy.steps.length} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
