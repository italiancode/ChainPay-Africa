/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cryptologos.cc'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
        pathname: '/logos/**',
      },
    ],
  },
};

module.exports = nextConfig;

// 