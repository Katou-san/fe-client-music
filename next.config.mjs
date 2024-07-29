/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        // protocol: undefined,
        hostname: "**",
        // pathname: "assets/**",
      },
    ],
  },
};

export default nextConfig;
