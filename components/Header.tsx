import HeaderClient from "./HeaderClient";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

interface HeaderProps {
  transparent?: boolean;
  locale: Locale;
  dictionary: Pick<
    SiteDictionary,
    "localeLabel" | "languages" | "languagesShort" | "nav"
  >;
  langHrefOverrides?: Partial<Record<Locale, string>>;
}

export default function Header(props: HeaderProps) {
  return <HeaderClient {...props} />;
}
