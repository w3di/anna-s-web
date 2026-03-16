/* eslint-disable no-var */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsTrackerProps = {
  measurementId: string;
};

export default function GoogleAnalyticsTracker({
  measurementId,
}: GoogleAnalyticsTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) {
      return;
    }

    const search = searchParams?.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    window.gtag("config", measurementId, {
      page_path: pagePath,
    });
  }, [measurementId, pathname, searchParams]);

  return null;
}
