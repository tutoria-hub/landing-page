const nextConfig = {
  // Note: Turbopack has compatibility issues with Tailwind CSS v4
  // Use webpack (default) for development until Turbopack support improves
};

// Optional: Enable Cloudflare dev integration for local bindings (R2, D1, KV, etc.)
// Uncomment the lines below when you need to test Cloudflare bindings locally:
// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// initOpenNextCloudflareForDev(nextConfig);

export default nextConfig;
