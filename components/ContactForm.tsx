import ContactFormClient from "./ContactFormClient";
import type { SiteDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";

type ContactFormProps = {
  copy: SiteDictionary["contactForm"];
  locale: Locale;
};

export default function ContactForm({ copy, locale }: ContactFormProps) {
  return <ContactFormClient copy={copy} locale={locale} />;
}
