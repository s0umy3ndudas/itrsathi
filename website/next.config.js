/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  eslint: {
    // ✅ allow build even if lint errors exist
    ignoreDuringBuilds: true,
  },

  typescript: {
    // ✅ allow build even if type errors exist
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },

  trailingSlash: true,
};

module.exports = nextConfig;