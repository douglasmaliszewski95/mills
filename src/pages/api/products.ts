import type { NextApiRequest, NextApiResponse } from "next";
import { ProductOCC, Products, ProductsList } from "@/dtos/Products";
import { getCredentialsOCC } from "@/services/hooks/getCredentialsOCC";

type Collection = {
  childProducts: ProductsList[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Products>
) {
  let imagesList: ProductOCC[] = [];
  const token = await getCredentialsOCC();
  if (token.access_token) {
    const { collection } = req.query;
    const response: Collection = await fetch(
      `https://p19894161c1prd-admin.occa.ocs.oraclecloud.com/ccadmin/v1/collections/${collection}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    ).then((collections) => {
      if (collections.status === 200) return collections.json();
      else {
        const result: Collection = { childProducts: [] };
        return result;
      }
    });

    if (response.childProducts.length > 0) {
      for (let i = 0; i < response.childProducts.length; i++) {
        const obj = await fetch(
          `https://p19894161c1prd-admin.occa.ocs.oraclecloud.com/ccadmin/v1/products/${response.childProducts[i].repositoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        ).then((res) => res.json());
        imagesList.push(obj);
      }
      res.status(200).json({ erro: "", products: imagesList });
    } else
      res.json({
        erro: "Não foi localizado nenhum produto para collection informada",
        products: imagesList,
      });
  } else
    res.status(token.status).json({
      erro: "Erro ao gerar token de autenticação",
      products: imagesList,
    });
}
