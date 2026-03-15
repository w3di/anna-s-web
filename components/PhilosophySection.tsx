import PhilosophySectionClient from "./PhilosophySectionClient";
import type { SiteDictionary } from "@/lib/dictionaries";

type PhilosophySectionProps = {
  copy: SiteDictionary["philosophy"];
};

export default function PhilosophySection({ copy }: PhilosophySectionProps) {
  return <PhilosophySectionClient copy={copy} />;
}
