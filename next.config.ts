import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://backend-z492.onrender.com',
  },
  /* config options here */
  /* config options here */
};

export default nextConfig;
