import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cookbook/ui", "@cookbook/supabase", "@cookbook/longbridge"],
};

export default nextConfig;
