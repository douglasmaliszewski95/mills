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
  const credentials = btoa(
    `${process.env.MILLS_USER}:${process.env.MILLS_SECRET}`
  );
  const auth = { Authorization: `Basic ${credentials}` };
  const channelToken = process.env.ORACLE_CMS_CHANNEL_TOKEN;

  const data: ResultSearchCMS = await fetch(
    `${process.env.ORACLE_CMS}/content/published/api/v1.1/items?q=type+eq+"custom_maps"+AND+fields.content_page+co+"${description}"&channelToken=${channelToken}&fields=all&limit=250`,
    { headers: auth }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error("Erro ao conectar: " + err.message);
    });

  res.status(200).json(data);
}
