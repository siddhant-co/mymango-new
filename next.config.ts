/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nxadmin.consociate.co.in',
        pathname: '/**', // matches all paths on that host
      },
    ],
  },
};

module.exports = nextConfig;
