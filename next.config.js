/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/healy-gymnastics',
  assetPrefix: '/healy-gymnastics/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
