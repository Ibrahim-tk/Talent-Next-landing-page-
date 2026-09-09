import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // The wordmark ships as an SVG. next/image refuses to optimize SVG unless
    // this is set, and the accompanying CSP + content disposition are the
    // documented mitigations for serving it through the optimizer.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // The archetype and interview stages currently pull editorial photography
    // from Unsplash. Keep this list in sync with src/content/*.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
