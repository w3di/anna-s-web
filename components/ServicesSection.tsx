import ServicesSectionClient from "./ServicesSectionClient";
import type { SiteDictionary } from "@/lib/dictionaries";

type ServicesSectionProps = {
  copy: SiteDictionary["homeServices"];
};

export default function ServicesSection({ copy }: ServicesSectionProps) {
  return <ServicesSectionClient copy={copy} />;
}
