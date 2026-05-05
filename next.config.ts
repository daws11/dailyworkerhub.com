import type { NextConfig } from "next";
import nextra from "nextra";
import createNextIntlPlugin from "next-intl/plugin";

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: true,
  staticImage: true,
});

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://tqnlrqutnhxqbzfcmvpc.supabase.co",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs/fitur/escrow-system/:path*",
        destination: "/docs/id/fitur/sistem-dana-jaminan/:path*",
        permanent: true,
      },
      {
        source: "/docs/fitur/dispute-resolution/:path*",
        destination: "/docs/id/fitur/penyelesaian-perselisihan/:path*",
        permanent: true,
      },
      {
        source: "/docs/fitur/protection-pool/:path*",
        destination: "/docs/id/fitur/dana-perlindungan/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(withNextra(nextConfig));
