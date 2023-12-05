

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

// module.exports = nextConfig;
// export default withPlaiceholder(nextConfig);

