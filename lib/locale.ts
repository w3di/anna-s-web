import "server-only";

import { notFound } from "next/navigation";
import {
  getDictionary,
  isLocale,
  type Locale,
  type SiteDictionary,
} from "@/lib/dictionaries";

type RouteDictionaryResult = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export async function getRouteDictionary(
  localeParam: string
): Promise<RouteDictionaryResult> {
  if (!isLocale(localeParam)) {
    notFound();
  }

  return {
    locale: localeParam,
    dictionary: getDictionary(localeParam),
  };
}
