"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmoothScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis && pathname) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [lenis, pathname]);

  return null;
}
