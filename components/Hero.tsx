import HeroClient from "./HeroClient";
import type { SiteDictionary } from "@/lib/dictionaries";

type HeroProps = {
  copy: SiteDictionary["hero"];
};

export default function Hero({ copy }: HeroProps) {
  return <HeroClient copy={copy} />;
}
