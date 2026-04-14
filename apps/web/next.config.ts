import type { NextConfig } from 'next';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(appDir, '../..');

const nextConfig: NextConfig = {
  transpilePackages: ['@erasys/ui', '@erasys/pictures'],
  typedRoutes: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
    deviceSizes: [320, 384, 480, 640, 768, 1024],
    imageSizes: [96, 128, 160, 192, 256, 320],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hunqz.com',
        pathname: '/img/usr/original/0x0/**',
      },
    ],
  },
  turbopack: {
    root: workspaceRoot,
  },
  experimental: {
    inlineCss: true,
    optimizeCss: true,
  },
};

export default nextConfig;
