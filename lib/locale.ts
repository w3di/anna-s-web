import "server-only";

import { cookies } from "next/headers";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/lib/dictionaries";

export async function getSiteLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;
  return isLocale(locale) ? locale : defaultLocale;
}

export async function getSiteDictionary() {
  const locale = await getSiteLocale();
  return {
    locale,
    dictionary: getDictionary(locale),
  };
}
