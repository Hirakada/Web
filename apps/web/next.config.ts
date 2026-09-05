import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    qualities: [25, 50, 70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "haackkpsvjlpttequfou.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "down-bs-id.img.susercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;