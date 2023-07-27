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
  const { description } = req.query;
  const credentials = btoa(`cms-site@mills.com.br:Wrongdoer@Spray0@Finishing`);
  console.log({ credentials });
  const auth = { Authorization: `Basic ${credentials}` };
  let channelToken = "";

  // const data: ResultSearchCMS = await fetch(`${process.env.ORACLE_CMS}/content/management/api/v1.1/channels`, { headers: auth })
  //   .then(channelResponse => channelResponse.json())
  //   .then(async (channelData) => {
  //     const channel = channelData.items.find((x: any) => x.createdBy === "cms-site@mills.com.br")
  //     return await fetch(`${process.env.ORACLE_CMS}/content/management/api/v1.1/channels/${channel.id}`, { headers: auth })
  //       .then(channelDataResponse => channelDataResponse.json())
  //       .then(async (channelTokenData) => {
  //         channelToken = channelTokenData.channelTokens[0].token
  //         return await fetch(`${process.env.ORACLE_CMS}/content/published/api/v1.1/items?q=type+eq+"custom_image"+AND+fields.content_page+co+"${description}"&channelToken=${channelToken}&fields=all`)
  //           .then(channelTokenResponse => channelTokenResponse.json())
  //           .catch(err => { console.error('Erro ao conectar' + err.message) })
  //       })
  //       .catch(err => { console.error('Erro ao conectar' + err.message) })
  //   })
  //   .catch(err => { console.error('Erro ao conectar' + err.message) })

  const data = await fetch(
    `https://contentinstance-fernandothome.cec.ocp.oraclecloud.com/content/management/api/v1.1/channels`,
    { headers: auth }
  ).then((channelResponse) => channelResponse.json());

  const channel = data.items.find(
    (x: any) => x.createdBy === "cms-site@mills.com.br"
  );
  console.log({ data });
  const data2 = await fetch(
    `https://contentinstance-fernandothome.cec.ocp.oraclecloud.com/content/management/api/v1.1/channels/${channel.id}`,
    { headers: auth }
  ).then((channelDataResponse) => channelDataResponse.json());
  console.log({ data2 });
  channelToken = data2.channelTokens[0].token;
  console.log({ channelToken });
  const data3 = await fetch(
    `https://contentinstance-fernandothome.cec.ocp.oraclecloud.com/content/published/api/v1.1/items?q=type+eq+"custom_image"+AND+fields.content_page+co+"${description}"&channelToken=${channelToken}&fields=all`,
    { headers: auth }
  ).then((channelTokenResponse) => channelTokenResponse.json());
  console.group({ data3 });
  res.status(200).json(data3);
}
