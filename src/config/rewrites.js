// @ts-check

/**
 * @typedef {{
 *   type: 'header' | 'query' | 'cookie';
 *   key: string;
 *   value?: string;
 * }} RouteHas
 *
 * @typedef {{
 *   source: string;
 *   destination: string;
 *   basePath?: false;
 *   locale?: false;
 *   has?: RouteHas[];
 *   missing?: RouteHas[];
 * }} Rewrite
 *
 * @typedef {{
 *   source: string;
 *   destination: string;
 *   basePath?: false;
 *   locale?: false;
 *   has?: RouteHas[];
 *   missing?: RouteHas[];
 *   productSearchCode?: string;
 * }} ExtendedRewrite
 */

/**
 * @type {ExtendedRewrite[]}
 */
const rewrites = [
  {
    source: "/industrial",
    destination: "/industrialMaintenance",
  },
  {
    source: "/maquinas-pesadas",
    destination: "/heavyMachine",
  },
  {
    source: "/maquinas-pesadas/catalogo",
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
    source:
      "/plataformas-elevatorias/plataforma-elevatoria-pantografica-ou-tesoura",
    destination: "/liftingPlatform/pantographic",
  },
  {
    source: "/plataformas-elevatorias/articulada",
    destination: "/liftingPlatform/articulated",
  },
  {
    source: "/plataformas-elevatorias/plataforma-elevatoria-lanca-articulada",
    destination: "/liftingPlatform/articulated",
  },
  {
    source: "/plataformas-elevatorias/telescopica",
    destination: "/liftingPlatform/telescopic",
  },
  {
    source: "/plataformas-elevatorias/plataforma-elevatoria-lanca-telescopica",
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
    source: "/equipamentos/instalacao-e-manutencao-industrial",
    destination: "/liftingPlatform/industrialInstallationAndMaintenance",
  },
  {
    source: "/plataformas-elevatorias/construcao-e-edificacao",
    destination: "/liftingPlatform/constructionAndEdification",
  },
  {
    source: "/equipamentos/construcao-e-edificacao",
    destination: "/liftingPlatform/constructionAndEdification",
  },
  {
    source: "/plataformas-elevatorias/pintura-e-limpeza-em-altura",
    destination: "/liftingPlatform/paintingAndCleaning",
  },
  {
    source: "/equipamentos/pintura-em-altura",
    destination: "/liftingPlatform/paintingAndCleaning",
  },
  {
    source: "/equipamentos/limpeza-em-altura",
    destination: "/liftingPlatform/paintingAndCleaning",
  },
  {
    source: "/plataformas-elevatorias/instalacao-e-manutencao-predial",
    destination: "/liftingPlatform/installationAndMaintenance",
  },
  {
    source: "/equipamentos/acesso-a-predios-e-lajes",
    destination: "/liftingPlatform/installationAndMaintenance",
  },
  {
    source: "/equipamentos/instalacao-e-manutencao-predial",
    destination: "/liftingPlatform/installationAndMaintenance",
  },
  {
    source: "/plataformas-elevatorias/inventario-e-organizacao-do-estoque",
    destination: "/liftingPlatform/inventoryAndStockOrganization",
  },
  {
    source: "/equipamentos/inventario-e-organizacao-de-estoque",
    destination: "/liftingPlatform/inventoryAndStockOrganization",
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
    source: "/vendas-de-maquinas",
    destination: "/equipmentSelling",
  },
  {
    source: "/pecas-e-equipamentos/equipamentos-novos",
    destination: "/equipmentSelling",
  },
  {
    source: "/pecas-e-equipamentos/equipamentos-usados",
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
    source: "/pecas-e-equipamentos/assistencia-tecnica",
    destination: "/maintenance",
  },
  {
    source: "/treinamento",
    destination: "/training",
  },
  {
    source: "/treinamentos/treinamento-operacao-mills",
    destination: "/training",
  },
  {
    source: "/treinamentos/treinamento-operacao-ipaf",
    destination: "/training",
  },
  {
    source: "/treinamento",
    destination: "/training",
  },
  {
    source: "/treinamento/passo-1",
    destination: "/training/cart/step-01",
  },
  {
    source: "/treinamento/passo-2",
    destination: "/training/cart/step-02",
  },
  {
    source: "/treinamento/orcamento-finalizado",
    destination: "/training/cart/finalizedBudget",
  },

  {
    source: "/pecas",
    destination: "/parts",
  },
  {
    source: "/pecas-e-equipamentos/pecas",
    destination: "/parts",
  },
  {
    source: "/pecas/busca",
    destination: "/parts/search",
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
    source: "/pecas/carrinho/orcamento-finalizado",
    destination: "/parts/cart/finalizedBudget",
  },
  {
    source: "/vendas-de-maquinas/busca",
    destination: "/equipmentSelling/search",
  },
  {
    source: "/vendas-de-maquinas/carrinho/passo-01",
    destination: "/equipmentSelling/cart/step-01",
  },
  {
    source: "/vendas-de-maquinas/carrinho/passo-02",
    destination: "/equipmentSelling/cart/step-02",
  },
  {
    source: "/vendas-de-maquinas/carrinho/orcamento-finalizado",
    destination: "/equipmentSelling/cart/finalizedBudget",
  },
  {
    source: "/formas-e-escoramentos/busca",
    destination: "/moldsAndShoring/search",
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
    source: "/politica-de-privacidade-e-cookies",
    destination: "/privacyPolicy",
  },
  {
    source: "/termos-e-condicoes-de-uso",
    destination: "/institutionalPages/termsAndCondition",
  },
  {
    source: "/termos-de-uso",
    destination: "/institutionalPages/termsAndCondition",
  },
  {
    source: "/fale-conosco",
    destination: "/contact",
  },
  {
    source: "/falar-com-especialista",
    destination: "/contact",
  },
  {
    source: "/solicitar-orcamento",
    destination: "/contact",
  },
  {
    source: "/cases",
    destination: "/cases",
  },
  {
    source: "/cases/:id",
    destination: "/cases/singularCase/:id",
  },
  {
    source: "/maquinas-pesadas/cases",
    destination: "/cases",
  },
  {
    source: "/compressores/busca",
    destination: "/compressors/search",
  },
  {
    source: "/geradores/busca",
    destination: "/generators/search",
  },
  {
    source: "/maquinas-pesadas/carrinho/orcamento-finalizado",
    destination: "/heavyMachine/cart/finalizedBudget",
  },
  {
    source: "/maquinas-pesadas/carrinho/passo-01",
    destination: "/heavyMachine/cart/step-01",
  },
  {
    source: "/maquinas-pesadas/carrinho/passo-02",
    destination: "/heavyMachine/cart/step-02",
  },
  {
    source: "/maquinas-pesadas/carrinho/passo-03",
    destination: "/heavyMachine/cart/step-03",
  },
  {
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
    source: "/maquinas-pesadas/trator-de-esteiras",
    destination: "/heavyMachine/bulldozer",
  },
  {
    source: "/plataformas-elevatorias/:id*",
    destination: "/plataformas-elevatorias/[...id]",
    productSearchCode: process.env.NEXT_PUBLIC_HEAVY_MACHINES,
  },
  {
    source: "/geradores/:id*",
    destination: "/geradores/[...id]",
    productSearchCode: process.env.NEXT_PUBLIC_GENERATORS,
  },
  {
    source: "/compressores/:id*",
    destination: "/compressores/[...id]",
    productSearchCode: process.env.NEXT_PUBLIC_COMPRESSORS,
  },
  {
    source: "/formas-e-escoramentos/:id*",
    destination: "/formas-e-escoramentos/[...id]",
    productSearchCode: process.env.NEXT_PUBLIC_MOLDS_AND_SHORING,
  },
  {
    source: "/maquinas-pesadas/:id*",
    destination: "/maquinas-pesadas/[...id]",
    productSearchCode: process.env.NEXT_PUBLIC_HEAVY_MACHINES,
  },
];

/**
 * @returns {Promise<Rewrite[]>}
 */
async function buildRewrites() {
  return rewrites.map(
    ({ destination, source, basePath, has, locale, missing }) => ({
      source,
      destination,
      basePath,
      has,
      locale,
      missing,
    })
  );
}

module.exports = { rewrites, buildRewrites };
