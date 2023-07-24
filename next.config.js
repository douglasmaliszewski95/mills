/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_API: process.env.NEXT_PUBLIC_API_GRAPHQL_DEV,
    OCC_URL_STORE: process.env.OCC_URL_STORE,
    OCC_BEARER_TOKEN: process.env.OCC_BEARER_TOKEN,
  },
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
        source: "/plataformas-elevatorias",
        destination: "/liftingPlatform",
      },
      {
        source: "/plataformas-elevatorias/pantografica-ou-tesoura",
        destination: "/liftingPlatform/pantographic",
      },
      {
        source: "/plataformas-elevatorias/articulada",
        destination: "/liftingPlatform/articulated",
      },
      {
        source: "/plataformas-elevatorias/telescopica",
        destination: "/liftingPlatform/telescopic",
      },
      {
        source: "/plataformas-elevatorias/:id",
        destination: "/segments",
      },
      {
        source: "/produto",
        destination: "/product",
      },
    ];
  },
};

module.exports = nextConfig;
