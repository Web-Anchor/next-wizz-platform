/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'img.clerk.com',
      'invoice-storage.b-cdn.net',
      'avatars.githubusercontent.com',
      'loremflickr.com',
      'invoicio-cdn.b-cdn.net',
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', 'chrome-aws-lambda'],
  },
};

export default nextConfig;
