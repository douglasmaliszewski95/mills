/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/industrial",
        destination: "/industrialMaintenance",
      },
      {
        source: "/pesadas",
        destination: "/heavyMachine",
      },
      {
        source: "/buscar-equipamento",
        destination: "/search",
      },
      {
        source: "/categorias",
        destination: "/category",
      },
    ];
  },
};

module.exports = nextConfig;
