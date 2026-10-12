import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis", "three", "@react-three/fiber"],
};

export default nextConfig;
