import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/lib/dictionaries";

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return withoutTrailingSlash || "/";
}

function splitHref(href: string) {
  const [pathWithSearch, hash = ""] = href.split("#");
  const [pathname = "/", search = ""] = pathWithSearch.split("?");

  return {
    pathname: normalizePathname(pathname),
    search: search ? `?${search}` : "",
    hash: hash ? `#${hash}` : "",
  };
}

export function getPathnameLocale(pathname: string): Locale | null {
  const normalizedPathname = normalizePathname(pathname);
  const [firstSegment = ""] = normalizedPathname.split("/").filter(Boolean);

  return isLocale(firstSegment) ? firstSegment : null;
}

export function stripLocaleFromPathname(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  if (isLocale(segments[0])) {
    const remainingPath = segments.slice(1).join("/");
    return remainingPath ? `/${remainingPath}` : "/";
  }

  return normalizedPathname;
}

export function getLocalizedPath(locale: Locale, pathname: string) {
  const basePath = stripLocaleFromPathname(pathname);

  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function getLocalizedHref(locale: Locale, href: string) {
  if (!href.startsWith("/")) {
    return href;
  }

  const { pathname, search, hash } = splitHref(href);
  return `${getLocalizedPath(locale, pathname)}${search}${hash}`;
}

export function getLocalizedPaths(pathname: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedPath(locale, pathname)])
  ) as Record<Locale, string>;
}

export function getPreferredLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
