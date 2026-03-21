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
};

export default nextConfig;
