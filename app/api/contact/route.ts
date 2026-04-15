import { NextResponse } from "next/server";
import { isValidPhoneNumber } from "libphonenumber-js/max";

type ContactPayload = {
  name?: string;
  contact?: string;
  email?: string;
  subject?: string;
  message?: string;
  defaultCountry?: string;
  locale?: string;
  website?: string;
};

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  cs: "Čeština",
  ru: "Русский",
};

const TELEGRAM_API_BASE = "https://api.telegram.org";

// Rate limit: max 3 requests per 24 hours per IP
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  // Cleanup old entries
  if (rateLimitMap.size > 10000) {
    for (const [key, ts] of rateLimitMap) {
      if (ts.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

const noIndexHeaders = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

function validateContact(
  value: string,
  defaultCountry: string = "CZ"
): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (isEmail(trimmed)) return true;
  return isValidPhoneNumber(trimmed, defaultCountry as never);
}

function validatePayload(payload: ContactPayload) {
  const name = payload.name?.trim() ?? "";
  const contact = (payload.contact ?? payload.email)?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const defaultCountry = payload.defaultCountry ?? "CZ";
  if (!validateContact(contact, defaultCountry)) return null;
  const contactType = isEmail(contact) ? "email" : "phone";
  const locale = payload.locale?.trim() ?? "";
  return { name, contact, contactType, subject, message, locale };
}

function getChatIds(): string[] {
  const raw = process.env.TELEGRAM_CHAT_IDS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429, headers: noIndexHeaders }
      );
    }

    const payload = (await request.json()) as ContactPayload;
    if (payload.website?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400, headers: noIndexHeaders }
      );
    }

    const valid = validatePayload(payload);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or phone" },
        { status: 400, headers: noIndexHeaders }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Missing TELEGRAM_BOT_TOKEN" },
        { status: 500, headers: noIndexHeaders }
      );
    }

    const chatIds = getChatIds();
    if (chatIds.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Missing TELEGRAM_CHAT_IDS" },
        { status: 500, headers: noIndexHeaders }
      );
    }

    const contactLabel = valid.contactType === "email" ? "Email" : "Телефон";
    const localeLabel = valid.locale
      ? LOCALE_LABELS[valid.locale] ?? valid.locale.toUpperCase()
      : "-";
    const text = [
      "Новая заявка с формы контактов",
      "",
      `Имя: ${valid.name}`,
      `${contactLabel}: ${valid.contact}`,
      `Язык сайта: ${localeLabel}`,
      `Тема: ${valid.subject || "-"}`,
      "",
      "Сообщение:",
      valid.message,
    ].join("\n");

    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        const res = await fetch(
          `${TELEGRAM_API_BASE}/bot${token}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              disable_web_page_preview: true,
            }),
          }
        );
        const body = await res.text();
        if (!res.ok) {
          console.error("[contact] Telegram send failed", {
            chatId,
            status: res.status,
            body: body.slice(0, 500),
          });
        }
        return { ok: res.ok, chatId, body };
      })
    );

    const failed = results.filter((r) => !r.ok);
    if (failed.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to send to Telegram",
          failedChatIds: failed.map((r) => r.chatId),
          details: failed.map((r) => ({ chatId: r.chatId, body: r.body })),
        },
        { status: 500, headers: noIndexHeaders }
      );
    }

    return NextResponse.json({ ok: true }, { headers: noIndexHeaders });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: noIndexHeaders }
    );
  }
}
