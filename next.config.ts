import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://xmqnymcirohjcymjfedn.storage.supabase.co", "https://xmqnymcirohjcymjfedn.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xmqnymcirohjcymjfedn.storage.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "xmqnymcirohjcymjfedn.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
