import { NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/lib/dictionaries";

const noIndexHeaders = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

export async function POST(request: Request) {
  let locale: Locale = defaultLocale;

  try {
    const body = (await request.json()) as { locale?: string };
    if (isLocale(body.locale)) {
      locale = body.locale;
    }
  } catch {
    locale = defaultLocale;
  }

  const response = NextResponse.json(
    { ok: true, locale },
    { headers: noIndexHeaders }
  );
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
