import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/lib/dictionaries";
import { getLocalizedPath } from "@/lib/locale-routing";

const publicRoutes = new Set(["/", "/about", "/sessions", "/contact"]);

const legacyRouteMap = {
  "/about-us": "/about",
  "/contact-page": "/contact",
  "/contact-us": "/contact",
  "/our-services": "/sessions",
} as const;

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  return isLocale(cookieLocale) ? cookieLocale : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const pathnameLocale = pathnameSegments[0];

  if (isLocale(pathnameLocale)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-next-locale", pathnameLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const canonicalPathname =
    legacyRouteMap[pathname as keyof typeof legacyRouteMap] ?? pathname;

  if (publicRoutes.has(canonicalPathname)) {
    const preferredLocale = getPreferredLocale(request);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = getLocalizedPath(preferredLocale, canonicalPathname);

    const response = NextResponse.redirect(redirectUrl, 308);
    response.cookies.set(localeCookieName, preferredLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)",
  ],
};
