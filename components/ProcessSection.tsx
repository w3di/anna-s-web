import ProcessSectionClient from "./ProcessSectionClient";
import type { SiteDictionary } from "@/lib/dictionaries";

type ProcessSectionProps = {
  copy: SiteDictionary["process"];
};

export default function ProcessSection({ copy }: ProcessSectionProps) {
  return <ProcessSectionClient copy={copy} />;
}
