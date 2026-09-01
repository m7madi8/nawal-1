/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add real CDN / CMS domains here once product photography is sourced,
    // e.g. images.ctfassets.net, cdn.sanity.io, res.cloudinary.com
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
