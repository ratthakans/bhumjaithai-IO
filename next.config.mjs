/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.bhumjaithai.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig
