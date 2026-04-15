import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "GoogleOther",
          "ClaudeBot",
          "Claude-Web",
          "Applebot-Extended",
          "PerplexityBot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
          "Amazonbot",
          "Meta-ExternalAgent",
          "FacebookBot",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
