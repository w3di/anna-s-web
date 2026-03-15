"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "./ui/Button";
import Icon from "./icons/Icon";
import ServiceCard from "./ServiceCard";
import type { SiteDictionary } from "@/lib/dictionaries";

type ServicesCopy = SiteDictionary["homeServices"];

type ServicesSectionClientProps = {
  copy: ServicesCopy;
};

export default function ServicesSectionClient({ copy }: ServicesSectionClientProps) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      className="defer-section"
      style={{ backgroundColor: "#0d0d0d", position: "relative" }}
    >
      <div className="container section-pad-lg">
        <div
          ref={headingRef}
          style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="t-overline"
                style={{ display: "block", marginBottom: "1rem", color: "#8eb7ff" }}
              >
                {copy.overline}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={headingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.75 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: 1.1,
                  maxWidth: "480px",
                }}
              >
                {copy.title}
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="hide-mobile"
            >
              <Button
                as="link"
                href="/sessions"
                variant="white"
                size="md"
                iconRight={<Icon name="arrow-right" white />}
              >
                {copy.cta}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              width: "56px",
              height: "2px",
              background: "var(--c-blue)",
              marginTop: "1.5rem",
              transformOrigin: "left",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5px",
          }}
          className="services-grid"
        >
          {copy.items.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>

        <div
          style={{ marginTop: "2.5rem", textAlign: "center" }}
          className="show-mobile-only"
        >
          <Button
            as="link"
            href="/sessions"
            variant="white"
            size="md"
            iconRight={<Icon name="arrow-right" white />}
          >
            {copy.cta}
          </Button>
        </div>
      </div>

      <style>{`
        @media (max-width: 719px) {
          .services-grid { grid-template-columns: 1fr !important; gap: 2px !important; }
        }
        @media (min-width: 720px) and (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
