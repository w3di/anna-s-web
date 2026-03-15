import ProcessSectionClient from "./ProcessSectionClient";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

type ProcessSectionProps = {
  locale: Locale;
  copy: SiteDictionary["process"];
};

export default function ProcessSection({ locale, copy }: ProcessSectionProps) {
  return <ProcessSectionClient locale={locale} copy={copy} />;
}
