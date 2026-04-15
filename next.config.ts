import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: path.join(process.cwd()),
  experimental: {
    globalNotFound: true,
  },
  images: {
    deviceSizes: [
      640, 750, 828, 1080, 1152, 1200, 1280, 1440, 1600, 1920, 2048,
    ],
    qualities: [65, 75, 90],
    remotePatterns: [],
  },
  async redirects() {
    return [
      // 301 redirect old /cz/ locale URLs to /cs/
      {
        source: "/cz",
        destination: "/cs",
        permanent: true,
      },
      {
        source: "/cz/:path*",
        destination: "/cs/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
