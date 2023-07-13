import type { NextApiRequest, NextApiResponse } from "next";
import ImagesHome from "@/dtos/ImagesHome";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ImagesHome>>
) {
  const { description } = req.query;
  const credentials = btoa(`${process.env.USER}:${process.env.SECRET}`);
  const auth = { Authorization: `Basic ${credentials}` };
  let channelToken = "";
  let resultImages: ImagesHome[] = [];
  const data = await fetch(
    `${process.env.ORACLE_CMS}/content/management/api/v1.1/channels`,
    { headers: auth }
  )
    .then((channelResponse) => channelResponse.json())
    .then((channelData) => {
      const channel = channelData.items.find(
        (x: any) => x.createdBy === "cms-site@mills.com.br"
      );
      return fetch(
        `${process.env.ORACLE_CMS}/content/management/api/v1.1/channels/${channel.id}`,
        { headers: auth }
      )
        .then((channelDataResponse) => channelDataResponse.json())
        .then((channelTokenData) => {
          channelToken = channelTokenData.channelTokens[0].token;
          return fetch(
            `${process.env.ORACLE_CMS}/content/published/api/v1.1/items?q=description+co+"${description}"&channelToken=${channelToken}&fields=all`
          )
            .then((channelTokenResponse) => channelTokenResponse.json())
            .catch((err) => {
              console.error("Erro ao conectar" + err.message);
            });
        })
        .catch((err) => {
          console.error("Erro ao conectar" + err.message);
        });
    })
    .catch((err) => {
      console.error("Erro ao conectar" + err.message);
    });

  for (let i = 0; i < data?.items.length; i++) {
    const obj = await fetch(
      `${process.env.ORACLE_CMS}/content/published/api/v1.1/items/${data.items[i].id}?channelToken=${channelToken}`,
      { headers: auth }
    ).then((res) => res.json());
    resultImages.push(obj);
  }

  res.status(200).json(resultImages);
}
