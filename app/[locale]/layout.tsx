import type { ReactNode } from "react";
import "../globals.css";
import { locales } from "@/lib/dictionaries";
import { getRouteDictionary } from "@/lib/locale";
import { buildSiteSchema } from "@/lib/seo";
import RootLayoutShell from "../root-layout-shell";
import { rootMetadata, rootViewport } from "../root-metadata";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata = rootMetadata;
export const viewport = rootViewport;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale, dictionary } = await getRouteDictionary((await params).locale);
  const siteSchema = buildSiteSchema({
    locale,
    description: dictionary.metadata.homeDescription,
  });

  return (
    <RootLayoutShell lang={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      {children}
    </RootLayoutShell>
  );
}
