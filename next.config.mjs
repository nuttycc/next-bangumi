import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

// module.exports = nextConfig;
export default withPlaiceholder(nextConfig);
