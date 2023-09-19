/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_API: process.env.NEXT_PUBLIC_API_GRAPHQL_DEV,
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
    return [
      {
        source: "/industrial",
        destination: "/industrialMaintenance",
      },
      {
        source: "/maquinas-pesadas",
        destination: "/heavyMachine",
      },
      {
        source: "/maquinas-pesadas/busca",
        destination: "/heavyMachine/search",
      },
      {
        source: "/maquinas-pesadas/escavadeira",
        destination: "/heavyMachine/excavator",
      },
      {
        source: "/maquinas-pesadas/retroescavadeira",
        destination: "/heavyMachine/backhoe",
      },
      {
        source: "/maquinas-pesadas/motoniveladora",
        destination: "/heavyMachine/motorGrader",
      },
      {
        source: "/maquinas-pesadas/minicarregadeira",
        destination: "/heavyMachine/smallLoader",
      },
      {
        source: "/plataformas-elevatorias",
        destination: "/liftingPlatform",
      },
      {
        source: "/plataformas-elevatorias/busca",
        destination: "/liftingPlatform/search",
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
        source: "/plataformas-elevatorias/montagem-de-estrutura-para-eventos",
        destination: "/liftingPlatform/assemblyStructure",
      },
      {
        source: "/plataformas-elevatorias/outros",
        destination: "/liftingPlatform/others",
      },
      {
        source: "/plataformas-elevatorias/instalacao-e-manutencao-industrial",
        destination: "/liftingPlatform/industrialInstallationAndMaintenance",
      },
      {
        source: "/plataformas-elevatorias/construcao-e-edificacao",
        destination: "/liftingPlatform/constructionAndEdification",
      },
      {
        source: "/plataformas-elevatorias/pintura-e-limpeza-em-altura",
        destination: "/liftingPlatform/paintingAndCleaning",
      },
      {
        source: "/plataformas-elevatorias/instalacao-e-manutencao-predial",
        destination: "/liftingPlatform/installationAndMaintenance",
      },
      {
        source: "/plataformas-elevatorias/pintura-e-limpeza-em-altura",
        destination: "/liftingPlatform/paintingAndCleaning",
      },
      {
        source: "/plataformas-elevatorias/inventario-e-organizacao-do-estoque",
        destination: "/liftingPlatform/inventoryAndStockOrganization",
      },
      {
        source: "/produto",
        destination: "/product",
      },
      {
        source: "/geradores",
        destination: "/generators",
      },
      {
        source: "/geradores/industrias",
        destination: "/generators/industries",
      },
      {
        source: "/geradores/servicos-e-infraestrutura",
        destination: "/generators/servicesAndInfrastructure",
      },
      {
        source: "/geradores/construcao",
        destination: "/generators/construction",
      },
      {
        source: "/formas-e-escoramentos",
        destination: "/moldsAndShoring",
      },
      {
        source: "/compressores/industrias",
        destination: "/generators/industries",
      },
      {
        source: "/compressores/servicos-e-infraestrutura",
        destination: "/generators/servicesAndInfrastructure",
      },
      {
        source: "/compressores/construcao",
        destination: "/generators/construction",
      },
      {
        source: "/compressores",
        destination: "/compressors",
      },
      {
        source: "/formas-e-escoramentos",
        destination: "/formworkAndShoring",
      },
      {
        source: "/carrinho/passo-01",
        destination: "/cart/step-01",
      },
      {
        source: "/carrinho/passo-02",
        destination: "/cart/step-02",
      },
      {
        source: "/carrinho/passo-03",
        destination: "/cart/step-03",
      },
      {
        source: "/carrinho/orcamento-finalizado",
        destination: "/cart/finalizedBudget",
      },
      {
        source: "/formas-e-escoramentos/infraestrutura",
        destination: "/moldsAndShoring/infrastructure",
      },
      {
        source: "/formas-e-escoramentos/grandes-edificacoes",
        destination: "/moldsAndShoring/bigBuildings",
      },
      {
        source: "/formas-e-escoramentos/energia",
        destination: "/moldsAndShoring/energy",
      },
      {
        source: "/downloads",
        destination: "/institutionalPages/downloads",
      },
      {
        source: "/sobre-a-mills",
        destination: "/institutionalPages/aboutMills",
      },
      {
        source: "/mapa-de-atuacao",
        destination: "/mapa-de-atuacao",
      },
      {
        source: "/jornada-de-sustentabilidade",
        destination: "/institutionalPages/sustainabilityJourney",
      },
      {
        source: "/trabalhe-conosco",
        destination: "/institutionalPages/workWithUs",
      },
      {
        source: "/mills-na-midia",
        destination: "/institutionalPages/millsMidia",
      },
      {
        source: "/programa-de-integridade",
        destination: "/institutionalPages/integrityProgram",
      },
      {
        source: "/cases",
        destination: "/institutionalPages/cases",
      },
      {
        source: "/formas-e-escoramentos/industria",
        destination: "/moldsAndShoring/industries",
      },
      {
        source: "/formas-e-escoramentos/saneamento",
        destination: "/moldsAndShoring/sanitation",
      },
      {
        source: "/formas-e-escoramentos/transportes-e-mobilidade",
        destination: "/moldsAndShoring/transport",
      },
      {
        source: "/aluguel-de-plataformas-elevatorias",
        destination: "/platformRental",
      },
      {
        source: "/vendas-equipamentos",
        destination: "/equipmentSelling",
      },
      {
        source: "/frete",
        destination: "/shipping",
      },
      {
        source: "/manutencao-e-assistencia-tecnica",
        destination: "/maintenance",
      },
      {
        source: "/treinamento",
        destination: "/training",
      },
      {
        source: "/pecas",
        destination: "/parts",
      },
      {
        source: "/pecas/carrinho/passo-01",
        destination: "/parts/cart/step-01",
      },
      {
        source: "/pecas/carrinho/passo-02",
        destination: "/parts/cart/step-02",
      },
      {
        source: "/pecas/busca",
        destination: "/parts/search",
      },
      {
        source: "/pecas/carrinho/orcamento-finalizado",
        destination: "/parts/cart/finalizedBudget",
      },
      {
        source: "/vendas-seminovos-novos/carrinho/passo-01",
        destination: "/equipmentSelling/cart/step-01",
      },
      {
        source: "/vendas-seminovos-novos/carrinho/passo-02",
        destination: "/equipmentSelling/cart/step-02",
      },
      {
        source: "/vendas-seminovos-novos/busca",
        destination: "/equipmentSelling/search",
      },
      {
        source: "/vendas-seminovos-novos/carrinho/orcamento-finalizado",
        destination: "/equipmentSelling/cart/finalizedBudget",
      },
      {
        source: "/formas-e-escoramentos/carrinho/passo-01",
        destination: "/moldsAndShoring/cart/step-01",
      },
      {
        source: "/formas-e-escoramentos/carrinho/passo-02",
        destination: "/moldsAndShoring/cart/step-02",
      },
      {
        source: "/formas-e-escoramentos/busca",
        destination: "/moldsAndShoring/search",
      },
      {
        source: "/formas-e-escoramentos/carrinho/orcamento-finalizado",
        destination: "/moldsAndShoring/cart/finalizedBudget",
      },
      {
        source: "/duvidas-frequentes",
        destination: "/faq",
      },
      {
        source: "/politica-de-privacidade",
        destination: "/privacyPolicy",
      },
      {
        source: "/fale-conosco",
        destination: "/contact",
      },
      {
        source: "/cases",
        destination: "/cases",
      },
      {
        source: "/cases/:id",
        destination: "/cases/singularCase/:id",
        source: "/maquinas-pesadas/agronegocio",
        destination: "/heavyMachine/agribusiness",
      },
      {
        source: "/maquinas-pesadas/construcao",
        destination: "/heavyMachine/construction",
      },
      {
        source: "/maquinas-pesadas/florestal",
        destination: "/heavyMachine/forestry",
      },
      {
        source: "/maquinas-pesadas/mineracao",
        destination: "/heavyMachine/mining",
      },
      {
        source: "/maquinas-pesadas/portuario",
        destination: "/heavyMachine/port",
      },
      {
        source: "/maquinas-pesadas/outros",
        destination: "/heavyMachine/others",
      },
      {
        source: "/maquinas-pesadas/pa-carregadeira",
        destination: "/heavyMachine/shovelLoader",
      },
      {
        source: "/maquinas-pesadas/rolo-compactador",
        destination: "/heavyMachine/roadRoller",
      },
      {
        source: "/maquinas-pesadas/locacao",
        destination: "/heavyMachine/rent",
      },
      {
        source: "/maquinas-pesadas/manutencao",
        destination: "/heavyMachine/maintenance",
      },
      {
        source: "/maquinas-pesadas/acessorios-implementos",
        destination: "/heavyMachine/accessoriesAndImplements",
      },
      {
        source: "/maquinas-pesadas/telemetria-para-pesados",
        destination: "/heavyMachine/telemetry",
      },
      {
        source: "/maquinas-pesadas/frete",
        destination: "/heavyMachine/freight",
      },
      {
        source: "/maquinas-pesadas/venda-pecas",
        destination: "/heavyMachine/partsSale",
      },
      {
        source: "/maquinas-pesadas/cases",
        destination: "/heavyMachine/cases",
      },
      {
        source: "/maquinas-pesadas/trator-de-esteiras",
        destination: "/heavyMachine/bulldozer",
      },
      {
        source: "/mapa-de-atuacao",
        destination: "/mapa-de-atuacao",
      },
    ];
  },
};

module.exports = nextConfig;
