import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const TELEGRAM_API_BASE = "https://api.telegram.org";
const CHAT_IDS = ["138163446", "1699760305"];
const noIndexHeaders = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

function validatePayload(payload: ContactPayload) {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return null;
  return { name, email, subject, message };
}

function getChatIds(): string[] {
  return CHAT_IDS;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const valid = validatePayload(payload);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
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

    const text = [
      "Новая заявка с формы контактов",
      "",
      `Имя: ${valid.name}`,
      `Email: ${valid.email}`,
      `Тема: ${valid.subject || "-"}`,
      "",
      "Сообщение:",
      valid.message,
    ].join("\n");

    const chatIds = getChatIds();
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
