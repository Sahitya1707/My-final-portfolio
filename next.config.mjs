/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a fully static site into ./out. No server, no database, nothing to pay for.
  output: "export",
  // /work/roadstar/ -> /work/roadstar/index.html, which every static host serves correctly.
  trailingSlash: true,
  // The Next image optimizer needs a server. Images are pre-optimised with `npm run images` instead.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
