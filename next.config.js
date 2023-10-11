/** @type {import('next').NextConfig} */
const { buildRewrites } = require("./src/config/rewrites");

const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_API: process.env.NEXT_PUBLIC_API_GRAPHQL,
    OCC_URL_STORE: process.env.OCC_URL_STORE,
    OCC_BEARER_TOKEN: process.env.OCC_BEARER_TOKEN,
    MILLS_USER: process.env.MILLS_USER,
    MILLS_SECRET: process.env.MILLS_SECRET,
  },
  images: {
    domains: ["64.media.tumblr.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "contentinstance-fernandothome.cec.ocp.oraclecloud.com",
      },
    ],
  },
  async rewrites() {
    return buildRewrites();
  },
};

module.exports = nextConfig;
