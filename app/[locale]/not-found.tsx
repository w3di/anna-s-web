import type { Metadata } from "next";
import NotFoundPage from "@/components/not-found-page";
import { getNotFoundDictionary } from "@/lib/site-locale";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const { locale, dictionary } = await getNotFoundDictionary();

  return <NotFoundPage locale={locale} dictionary={dictionary} />;
}
