import "./globals.css";
import type { Metadata } from "next";
import RootLayoutShell from "./root-layout-shell";
import NotFoundPage from "@/components/not-found-page";
import { getSiteDictionary } from "@/lib/site-locale";
import { siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `Not Found | ${siteName}`,
  description: "The page you are looking for does not exist.",
};

export default async function GlobalNotFound() {
  const { locale, dictionary } = await getSiteDictionary();

  return (
    <RootLayoutShell lang={locale}>
      <NotFoundPage locale={locale} dictionary={dictionary} />
    </RootLayoutShell>
  );
}
