import { NextApiResponse } from "next";
import { ExtendedRewrite, rewrites } from "@/config/rewrites";
import { getCredentialsOCC } from "@/services/hooks/getCredentialsOCC";
import { AttributesProduct } from "@/dtos/SearchProducts";
import { useGetCMSCases } from "@/components/Cases/useGetCmsCases";
import { getFiliais } from "@/services/hooks/getFiliais";

type SitemapOptions = {
  routes: ExtendedRewrite[];
  priority?: number;
  changeFrequency?: string;
  lastModification?: string;
};

function generateSiteMap({
  routes,
  priority = 0.8,
  changeFrequency = "monthly",
  lastModification = new Date().toISOString(),
}: SitemapOptions) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>${`${process.env.NEXT_PUBLIC_API_GRAPHQL}`}</loc>
          <lastmod>${lastModification}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${0.9}</priority>
      </url>
     ${routes
       .map(({ source }) => {
         return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_API_GRAPHQL}${source}`}</loc>
           <lastmod>${lastModification}</lastmod>
           <changefreq>${changeFrequency}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

async function buildProductRoutes(routes: ExtendedRewrite[]) {
  try {
    if (routes.length === 0) return [];

    const token = await getCredentialsOCC();

    if (token && token.access_token) {
      const promises = routes.map(async ({ source, productSearchCode }) => {
        let productIds = "";
        let result = [];

        const response = await fetch(
          `${process.env.OCC_URL_STORE}/ccstore/v1/search?N=${productSearchCode}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        ).then((res) => res.json());

        if (response.resultsList && response.resultsList?.records.length > 0) {
          response.resultsList.records.map((product: AttributesProduct) => {
            productIds += `${product.attributes["product.repositoryId"]},`;
          });

          const search = await fetch(
            `${process.env.OCC_URL_STORE}/ccstore/v1/products?productIds=${productIds}`,
            {
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            }
          ).then((res) => res.json());

          if (search.items.length > 0) {
            result.push(search.items);
          }
        }

        const normalizedProducts = result.length > 0 ? result.flat() : [];

        const finalRoutes = normalizedProducts.map(({ route }) => {
          if (route) {
            return {
              source: source.replace("/:id*", route),
            };
          } else {
            return {
              source: null,
            };
          }
        });

        return finalRoutes.filter(
          ({ source }) => source !== null
        ) as ExtendedRewrite[];
      });

      const productRoutes = await Promise.all(promises);

      return productRoutes.length > 0 ? productRoutes.flat() : [];
    }

    return [];
  } catch {
    return [];
  }
}

async function buildSingularCaseRoutes(routes: ExtendedRewrite[]) {
  if (routes.length === 0) return [];

  try {
    const { listCases } = (await useGetCMSCases()) as {
      listCases: { href: string }[];
    };
    const singularCaseBaseRoute = routes[0].source;

    return listCases.map(({ href }) => ({
      source: singularCaseBaseRoute.replace(":id", href),
    })) as ExtendedRewrite[];
  } catch {
    return [];
  }
}

async function buildBranchRoutes(routes: ExtendedRewrite[]) {
  if (routes.length === 0) return [];

  try {
    const content = (await getFiliais("mapa_de_atuacao")) as unknown as {
      [key: string]: [{ fields: { href: string } }];
    };
    const mapBaseRoute = routes[0].source;
    const mapRoutes = new Array();

    for (const key in content) {
      if (content.hasOwnProperty(key)) {
        const locations = content[key];
        for (const location of locations) {
          mapRoutes.push(location.fields.href);
        }
      }
    }

    return mapRoutes.map((href) => ({
      source: mapBaseRoute.replace("/mapa-de-atuacao", href),
    })) as ExtendedRewrite[];
  } catch {
    return [];
  }
}

export default function SiteMap() {}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const normalRoutes = rewrites.filter(
    ({ source, productSearchCode }) =>
      !source.includes(":id") && !productSearchCode
  );

  const singularCaseRoutes = rewrites.filter(({ source }) =>
    source.includes("/cases/:id")
  );

  const branchRoutes = rewrites.filter(({ source }) =>
    source.includes("/mapa-de-atuacao")
  );

  const productRoutes = rewrites.filter(
    ({ productSearchCode }) => productSearchCode
  );

  const singularCases = await buildSingularCaseRoutes(singularCaseRoutes);

  const branches = await buildBranchRoutes(branchRoutes);

  const products = await buildProductRoutes(productRoutes);

  const sitemap = generateSiteMap({
    routes: normalRoutes.concat(singularCases, branches, products),
  });

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
