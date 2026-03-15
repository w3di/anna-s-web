"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const BANNER_BY_PATH: Record<string, string> = {
  "/": "/hero-landscape.webp",
  "/about": "/about-banner.webp",
  "/contact": "/contact-banner.webp",
  "/sessions": "/sessions-banner.webp",
};

const ALL_BANNERS = [
  "/hero-landscape.webp",
  "/about-banner.webp",
  "/contact-banner.webp",
  "/sessions-banner.webp",
];

export default function BannerPreloadConsumer() {
  const pathname = usePathname();
  const currentBanner = BANNER_BY_PATH[pathname] ?? null;
  const bannersToConsume = currentBanner
    ? ALL_BANNERS.filter((src) => src !== currentBanner)
    : ALL_BANNERS;

  return (
    <div
      aria-hidden
      className="fixed -z-[1] size-px overflow-hidden opacity-0 relative"
    >
      {bannersToConsume.map((src) => (
        <div key={src} className="absolute inset-0">
          <Image src={src} alt="" fill sizes="1px" fetchPriority="low" />
        </div>
      ))}
    </div>
  );
}
