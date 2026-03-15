import "server-only";

import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localeCookieName,
  type Locale,
  type SiteDictionary,
} from "@/lib/dictionaries";

const localeHeaderName = "x-next-locale";

type SiteDictionaryResult = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export async function getSiteLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;
  return isLocale(locale) ? locale : defaultLocale;
}

export async function getLocaleForNotFound(): Promise<Locale> {
  const headerStore = await headers();
  const raw = headerStore.get(localeHeaderName);
  const localeFromPath = raw?.toLowerCase();
  if (isLocale(localeFromPath)) {
    return localeFromPath;
  }
  return getSiteLocale();
}

export async function getSiteDictionary(): Promise<SiteDictionaryResult> {
  const locale = await getSiteLocale();

  return {
    locale,
    dictionary: getDictionary(locale),
  };
}

export async function getNotFoundDictionary(): Promise<SiteDictionaryResult> {
  const locale = await getLocaleForNotFound();
  return {
    locale,
    dictionary: getDictionary(locale),
  };
}
