import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'new-shubh-bhoj-catering-events.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'www.teatoria.in',
      },
      {
        protocol: 'https',
        hostname: 'teatoria.in',
      },
    ],
  },
};

export default nextConfig;
