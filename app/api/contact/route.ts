import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const TELEGRAM_API_BASE = "https://api.telegram.org";
const DEFAULT_TELEGRAM_USERNAMES = ["Anna_Klmv", "closer2death"];
const noIndexHeaders = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
};

function isValidPayload(payload: ContactPayload) {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return false;

  return { name, email, subject, message };
}

function parseCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getTargetUsernames() {
  const usernamesRaw =
    process.env.TELEGRAM_USERNAMES ?? process.env.TELEGRAM_USERNAME;

  if (!usernamesRaw) {
    return DEFAULT_TELEGRAM_USERNAMES.map((username) =>
      username.replace(/^@/, "").toLowerCase()
    );
  }

  return parseCsv(usernamesRaw).map((username) =>
    username.replace(/^@/, "").toLowerCase()
  );
}

async function resolveChatIds(token: string) {
  const envChatIds = process.env.TELEGRAM_CHAT_IDS?.trim();
  if (envChatIds) {
    const chatIds = parseCsv(envChatIds);
    console.info("[contact/api] Using TELEGRAM_CHAT_IDS from env", {
      count: chatIds.length,
    });
    return chatIds;
  }

  const updatesResponse = await fetch(
    `${TELEGRAM_API_BASE}/bot${token}/getUpdates`,
    { cache: "no-store" }
  );

  if (!updatesResponse.ok) {
    throw new Error("Failed to read Telegram updates");
  }

  const updatesJson = (await updatesResponse.json()) as {
    ok?: boolean;
    result?: Array<{
      message?: {
        chat?: { id?: number; username?: string };
        from?: { username?: string };
      };
    }>;
  };

  if (!updatesJson.ok || !Array.isArray(updatesJson.result)) {
    throw new Error("Invalid Telegram updates response");
  }

  const targetUsernames = new Set(getTargetUsernames());
  const foundByUsername = new Map<string, string>();
  console.info("[contact/api] Resolving chat ids from getUpdates", {
    updatesCount: updatesJson.result.length,
    targets: Array.from(targetUsernames),
  });

  for (let i = updatesJson.result.length - 1; i >= 0; i -= 1) {
    const item = updatesJson.result[i];
    const chatUsername = item.message?.chat?.username?.toLowerCase();
    const fromUsername = item.message?.from?.username?.toLowerCase();
    const chatId = item.message?.chat?.id;
    const candidate = chatUsername ?? fromUsername;

    if (
      typeof chatId === "number" &&
      candidate &&
      targetUsernames.has(candidate)
    ) {
      if (!foundByUsername.has(candidate)) {
        foundByUsername.set(candidate, String(chatId));
      }
    }
  }

  const chatIds = Array.from(new Set(foundByUsername.values()));
  if (chatIds.length > 0) {
    console.info("[contact/api] Resolved chat ids", { count: chatIds.length });
    return chatIds;
  }

  throw new Error(
    "Telegram chats not found. Start bot chat and set TELEGRAM_CHAT_IDS."
  );
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    console.info(`[contact/api][${requestId}] Incoming form submission`);
    const payload = (await request.json()) as ContactPayload;
    const valid = isValidPayload(payload);

    if (!valid) {
      console.warn(`[contact/api][${requestId}] Validation failed`, {
        email: payload.email ?? null,
      });
      return NextResponse.json(
        { ok: false, error: "Invalid email", requestId },
        { status: 400, headers: noIndexHeaders }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    if (!token) {
      console.error(`[contact/api][${requestId}] Missing TELEGRAM_BOT_TOKEN`);
      throw new Error("Missing TELEGRAM_BOT_TOKEN");
    }

    const chatIds = await resolveChatIds(token);
    console.info(`[contact/api][${requestId}] Prepared message`, {
      chatIdsCount: chatIds.length,
      email: valid.email,
      hasName: Boolean(valid.name),
      hasSubject: Boolean(valid.subject),
      messageLength: valid.message.length,
    });
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

    const responses = await Promise.all(
      chatIds.map(async (chatId) => {
        const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            disable_web_page_preview: true,
          }),
        });

        if (!response.ok) {
          const errorBody = await response.text();
          return { ok: false, chatId, status: response.status, errorBody };
        }

        return { ok: true, chatId, status: response.status, errorBody: "" };
      })
    );

    const failed = responses.filter((response) => !response.ok);
    if (failed.length > 0) {
      console.error(`[contact/api][${requestId}] Telegram send failed`, failed);
      throw new Error("Failed to send Telegram message");
    }

    console.info(`[contact/api][${requestId}] Telegram send success`);
    return NextResponse.json(
      { ok: true, requestId },
      { headers: noIndexHeaders }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    console.error(`[contact/api][${requestId}] Request failed`, error);
    return NextResponse.json(
      { ok: false, error: message, requestId },
      { status: 500, headers: noIndexHeaders }
    );
  }
}
