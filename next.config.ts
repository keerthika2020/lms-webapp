import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/vvw5alwqmf/*",
      },
    ],
    domains: ["utfs.io"],
  },
};

export default nextConfig;
