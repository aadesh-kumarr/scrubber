/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
    experimental: {
      taint: true,
    },
  };
  
  export default nextConfig;
  