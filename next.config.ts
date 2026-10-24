import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-api.milleniummarbles.com',
      },
    ],
  },
  // REQUIRED for PM2 production
  output: "standalone",
};

export default nextConfig;
