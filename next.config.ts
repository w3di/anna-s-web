import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1152, 1200, 1280, 1440, 1600, 1920, 2048],
    qualities: [65, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mindofheart.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-page",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/our-services",
        destination: "/sessions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
