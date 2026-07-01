/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "imgbb.com" },
      { protocol: "https", hostname: "www.redrosebd.com" },
      { protocol: "https", hostname: "redrosebd.tech" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*\\.(?:js|css|woff2|woff|ttf|png|jpg|jpeg|webp|svg|ico))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
