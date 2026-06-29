import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      // Cloudinary — image storage for profile, projects, certificates
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // Use WebP format where supported for smaller file sizes
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Allow up to 10mb for PDF resume uploads
      bodySizeLimit: "10mb",
    },
  },
  // Compress responses
  compress: true,
  // Minimal powered-by header
  poweredByHeader: false,
};

export default nextConfig;

