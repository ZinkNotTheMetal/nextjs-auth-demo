import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol (http or https)
        hostname: 'cdn.discordapp.com', // The remote domain you want to allow
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;
