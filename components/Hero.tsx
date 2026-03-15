import HeroClient from "./HeroClient";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

type HeroProps = {
  locale: Locale;
  copy: SiteDictionary["hero"];
};

export default function Hero({ locale, copy }: HeroProps) {
  return <HeroClient locale={locale} copy={copy} />;
}
