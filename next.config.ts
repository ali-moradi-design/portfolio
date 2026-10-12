import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["lenis", "three", "@react-three/fiber"],
};

export default nextConfig;
