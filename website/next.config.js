/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: { 
    unoptimized: true,
    domains: ['res.cloudinary.com']
  },
  trailingSlash: true,
};

module.exports = nextConfig;