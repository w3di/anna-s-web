import { NextResponse } from "next/server";

const TELEGRAM_API_BASE = "https://api.telegram.org";
const TARGET_USERNAMES = ["anna_klmv", "closer2death"];
const noIndexHeaders = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Only in development" },
      { status: 403, headers: noIndexHeaders }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) {
    return NextResponse.json(
      { error: "Missing TELEGRAM_BOT_TOKEN" },
      { status: 500, headers: noIndexHeaders }
    );
  }

  const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/getUpdates`, {
    cache: "no-store",
  });
  const json = (await res.json()) as {
    ok?: boolean;
    result?: Array<{
      message?: {
        chat?: { id?: number; username?: string };
        from?: { username?: string };
      };
    }>;
  };

  if (!json.ok || !Array.isArray(json.result)) {
    return NextResponse.json(
      { error: "Failed to fetch updates", raw: json },
      { status: 500, headers: noIndexHeaders }
    );
  }

  const targets = new Set(TARGET_USERNAMES);
  const found = new Map<string, string>();

  for (let i = json.result.length - 1; i >= 0; i -= 1) {
    const item = json.result[i];
    const candidate = (
      item.message?.chat?.username ?? item.message?.from?.username
    )?.toLowerCase();
    const chatId = item.message?.chat?.id;
    if (typeof chatId === "number" && candidate && targets.has(candidate)) {
      if (!found.has(candidate)) found.set(candidate, String(chatId));
    }
  }

  const chatIds = [...new Set(found.values())];
  const envLine = `TELEGRAM_CHAT_IDS=${chatIds.join(",")}`;

  return NextResponse.json(
    {
      chatIds,
      byUsername: Object.fromEntries(found),
      addToEnv: envLine,
      hint: "Добавь TELEGRAM_CHAT_IDS в .env.local и перезапусти сервер.",
    },
    { headers: noIndexHeaders }
  );
}
