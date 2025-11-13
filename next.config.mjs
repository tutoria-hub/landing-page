const nextConfig = {
  // Note: Turbopack has compatibility issues with Tailwind CSS v4
  // Use webpack (default) for development until Turbopack support improves
  reactStrictMode: false, // Temporarily disabled to test animation issue
};

// Enable Cloudflare dev integration for D1 database bindings (dev only)
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
