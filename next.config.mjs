/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  typescript: {
    // During development, type errors won't stop the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
