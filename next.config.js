/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', 
      'lh3.googleusercontent.com', 'i.pravatar.cc', 'cdn-icons-png.flaticon.com', 
      's3.amazonaws.com', 'hants-awesome-links.s3.amazonaws.com']
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  }
};

module.exports = nextConfig;
