import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// AI / generative-search bots that we explicitly allow so the site can appear
// in Google AI Overviews, ChatGPT Search, Perplexity answers, Claude citations,
// Apple Intelligence, Meta AI, etc. Each of these bots either powers a
// user-facing answer engine that cites sources or is the training/indexing
// crawler for one.
const AI_BOTS_ALLOWED = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "GoogleOther",
  "ClaudeBot",
  "Claude-Web",
  "Anthropic-AI",
  "Applebot-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Meta-ExternalAgent",
  "FacebookBot",
  "CCBot",
  "cohere-ai",
  "Amazonbot",
  "DuckAssistBot",
  "YouBot",
  "Kagibot",
  "MistralAI-User",
];

// Bots we still block: aggressive scrapers without citation value or with a
// history of ignoring rate limits.
const BLOCKED_BOTS = ["Bytespider"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_BOTS_ALLOWED,
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: BLOCKED_BOTS,
        disallow: ["/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
