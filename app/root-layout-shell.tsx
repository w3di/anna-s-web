import type { ReactNode } from "react";
import { Playfair_Display, Raleway, Open_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-raleway",
});

const openSans = Open_Sans({
  subsets: ["latin"],
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
      </body>
    </html>
  );
}
