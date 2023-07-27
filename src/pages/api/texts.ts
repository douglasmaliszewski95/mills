import type { NextApiRequest, NextApiResponse } from "next";
import SearchCMS from "@/dtos/SearchCMS";

type ResultSearchCMS = {
  count: number;
  items: SearchCMS[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultSearchCMS>
) {
  const credentials = btoa(`cms-site@mills.com.br:Wrongdoer@Spray0@Finishing`);
  const auth = { Authorization: `Basic ${credentials}` };
  let channelToken = "";

  const data: ResultSearchCMS = await fetch(
    `https://contentinstance-fernandothome.cec.ocp.oraclecloud.com/content/management/api/v1.1/channels`,
    { headers: auth }
  )
    .then((channelResponse) => channelResponse.json())
    .then(async (channelData) => {
      const channel = channelData.items.find(
        (x: any) => x.createdBy === "cms-site@mills.com.br"
      );
      return await fetch(
        `https://contentinstance-fernandothome.cec.ocp.oraclecloud.com/content/management/api/v1.1/channels/${channel.id}`,
        { headers: auth }
      )
        .then((channelDataResponse) => channelDataResponse.json())
        .then(async (channelTokenData) => {
          channelToken = channelTokenData.channelTokens[0].token;
          return await fetch(
            `https://contentinstance-fernandothome.cec.ocp.oraclecloud.com/content/published/api/v1.1/items?q=type+eq+"custom_text"&channelToken=${channelToken}&fields=all`
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

  res.status(200).json(data);
}
