import ServicesSectionClient from "./ServicesSectionClient";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

type ServicesSectionProps = {
  locale: Locale;
  copy: SiteDictionary["homeServices"];
};

export default function ServicesSection({ locale, copy }: ServicesSectionProps) {
  return <ServicesSectionClient locale={locale} copy={copy} />;
}
