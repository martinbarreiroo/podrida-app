import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media3.giphy.com',
      },
    ],
  },
});

export default nextConfig;
