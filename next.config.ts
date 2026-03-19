import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Change "symphony" to match your GitHub repo name
  basePath: isProd ? "/symphony" : "",
  assetPrefix: isProd ? "/symphony/" : "",
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
