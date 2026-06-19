import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // Optionally ignore build errors to make deployment robust, but we aim for 0 errors anyway
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
