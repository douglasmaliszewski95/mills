import type { NextApiRequest, NextApiResponse } from "next";
import { AttributesProduct, SearchProducts } from "@/dtos/SearchProducts";
import { getCredentialsOCC } from "@/services/hooks/getCredentialsOCC";
import { Products } from "@/dtos/Products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchProducts>
) {
  if (req.method === "GET") {
    const { productName } = req.query;
    let productIds: string = "";
    let result: Products[] = [];
    const token = await getCredentialsOCC();
    if (token.access_token) {
      const response = await fetch(
        `${process.env.OCC_URL_STORE}/ccstore/v1/search${productName}&pageSize=150`,
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
          res.status(200).json({
            erro: "",
            products: result,
            filters: response.navigation.navigation,
            refinementCrumbs: response.breadcrumbs.refinementCrumbs,
          });
        } else
          res
            .status(200)
            .json({ erro: "Erro na busca dos produtos", products: result });
      } else
        res.status(200).json({
          erro: "Não foi localizado nenhum produto com este nome",
          products: result,
        });
    } else
      res.status(token.status).json({
        erro: "Erro ao gerar token de autenticação",
        products: result,
      });
  } else {
    const { category, searchTerm } = req.body;
    let productIds: string = "";
    let result: Products[] = [];
    const token = await getCredentialsOCC();
    if (token.access_token) {
      const response = await fetch(
        `${process.env.OCC_URL_STORE}/ccstore/v1/search?N=${category}&Ntt=${searchTerm}&pageSize=150`,
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
          res.status(200).json({
            erro: "",
            products: result,
            filters: response.navigation.navigation,
            refinementCrumbs: response.breadcrumbs.refinementCrumbs,
          });
        } else
          res
            .status(200)
            .json({ erro: "Erro na busca dos produtos", products: result });
      } else
        res.status(200).json({
          erro: "Não foi localizado nenhum produto com este nome",
          products: result,
        });
    } else
      res.status(token.status).json({
        erro: "Erro ao gerar token de autenticação",
        products: result,
      });
  }
}
