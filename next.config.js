/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  typescript: {
    // This will allow the build to complete even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This will allow the build to complete even with eslint errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 