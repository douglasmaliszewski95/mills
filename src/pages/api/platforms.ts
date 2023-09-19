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
      `${process.env.OCC_URL}/collections/${collection}`,
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
      const filterItens = response.childProducts.slice(0, 5);
      for (let i = 0; i < filterItens.length; i++) {
        if (imagesList.length === 3) {
          break;
        } else {
          const obj = await fetch(
            `${process.env.OCC_URL}/products/${filterItens[i].repositoryId}`,
            {
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            }
          ).then((res) => res.json());
          if (!obj.primarySourceImageURL.includes("no-image"))
            imagesList.push(obj);
        }
      }
      res.status(200).json({ erro: "", products: imagesList });
    } else
      res.json({
        erro: "Não foi localizado nenhum produto para collection informada",
        products: imagesList,
      });
  } else
    res
      .status(token.status)
      .json({
        erro: "Erro ao gerar token de autenticação",
        products: imagesList,
      });
}
