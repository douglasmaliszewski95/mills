import type { NextApiRequest, NextApiResponse } from "next";
import { ProductOCC } from "@/dtos/Products";
import { getCredentialsOCC } from "@/services/hooks/getCredentialsOCC";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductOCC>
) {
  const token = await getCredentialsOCC();
  if (token.access_token) {
    const { product } = req.query;

    const response: ProductOCC = await fetch(
      `${process.env.OCC_URL}/products/${product}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    ).then((product) => {
      if (product.status === 200) return product.json();
      else {
        const result = {
          erro: "Não foi possível localizar o produto com o ID informado.",
        };
        return result;
      }
    });
    res.status(200).json(response);
  }
}
