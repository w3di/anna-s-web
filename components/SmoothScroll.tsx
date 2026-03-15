"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import SmoothScrollReset from "./SmoothScrollReset";

const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
  syncTouch: true,
  autoRaf: true,
  anchors: { offset: 78 },
};

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={lenisOptions}>
      <SmoothScrollReset />
      {children}
    </ReactLenis>
  );
}
