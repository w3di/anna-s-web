import ContactFormClient from "./ContactFormClient";
import type { SiteDictionary } from "@/lib/dictionaries";

type ContactFormProps = {
  copy: SiteDictionary["contactForm"];
};

export default function ContactForm({ copy }: ContactFormProps) {
  return <ContactFormClient copy={copy} />;
}
