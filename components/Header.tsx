import HeaderClient from "./HeaderClient";
import type { Locale, SiteDictionary } from "@/lib/dictionaries";

interface HeaderProps {
  transparent?: boolean;
  locale: Locale;
  dictionary: Pick<
    SiteDictionary,
    "localeLabel" | "languages" | "languagesShort" | "nav"
  >;
}

export default function Header(props: HeaderProps) {
  return <HeaderClient {...props} />;
}
