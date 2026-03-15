"use client";

import { useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./icons/Icon";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const onScroll = useCallback((l: { scroll: number }) => {
    setVisible(l.scroll > 400);
  }, []);
  const lenis = useLenis(onScroll);

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.2 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 50,
            width: "44px",
            height: "44px",
            backgroundColor: "var(--c-blue)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(29,86,176,0.4)",
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "var(--c-blue-mid)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon name="arrow-up" white />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
