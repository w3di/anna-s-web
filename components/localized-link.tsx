import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Locale } from "@/lib/dictionaries";
import { getLocalizedHref } from "@/lib/locale-routing";

type LocalizedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  locale: Locale;
  children: ReactNode;
};

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  return (
    <Link href={getLocalizedHref(locale, href)} {...props}>
      {children}
    </Link>
  );
}
