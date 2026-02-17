/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
  },

  // Compression and minification
  compress: true,
  swcMinify: true,

  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=60',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/shop',
        permanent: true,
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_NAME: 'JSEdumart Bookstore',
    NEXT_PUBLIC_SITE_URL: 'https://jsdumart.com',
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@radix-ui', 'lucide-react'],
  },
};

export default nextConfig;
