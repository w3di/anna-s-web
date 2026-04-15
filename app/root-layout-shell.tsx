/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import Script from "next/script";
import { Playfair_Display, Raleway, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/SmoothScroll";
import GoogleAnalyticsTracker from "@/components/google-analytics-tracker";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const raleway = Raleway({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-raleway",
});

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400"],
  variable: "--font-open-sans",
});

type RootLayoutShellProps = {
  children: ReactNode;
  lang: string;
};

export default function RootLayoutShell({
  children,
  lang,
}: RootLayoutShellProps) {
  return (
    <html
      lang={lang}
      className={`${playfair.variable} ${raleway.variable} ${openSans.variable}`}
    >
      <body id="site-top" className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>

        {/* ── Analytics & metrics — loaded last to prioritize content ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-99ERRMYEEC"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-99ERRMYEEC');",
          }}
        />
        <GoogleAnalyticsTracker measurementId="G-99ERRMYEEC" />
        <Script
          id="yandex-metrika"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              "(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107719468', 'ym');ym(107719468, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});",
          }}
        />
        <noscript>
          <img
            src="https://mc.yandex.ru/watch/107719468"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </noscript>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
