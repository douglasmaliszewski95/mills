import type { NextApiRequest, NextApiResponse } from 'next'
import SearchCMS from '@/dtos/SearchCMS';

type ResultSearchCMS = {
  count: number
  items: SearchCMS[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultSearchCMS>
) {
  const credentials = btoa(`${process.env.USER}:${process.env.SECRET}`)
  const auth = { "Authorization": `Basic ${credentials}` }
  let channelToken = ''
  
  const data: ResultSearchCMS = await fetch(`${process.env.ORACLE_CMS}/content/management/api/v1.1/channels`, { headers: auth })
    .then(channelResponse => channelResponse.json())
    .then(async (channelData) => {
      const channel = channelData.items.find((x: any) => x.createdBy === "cms-site@mills.com.br")
      return await fetch(`${process.env.ORACLE_CMS}/content/management/api/v1.1/channels/${channel.id}`, { headers: auth })
        .then(channelDataResponse => channelDataResponse.json())
        .then(async (channelTokenData) => {
          channelToken = channelTokenData.channelTokens[0].token
          return await fetch(`${process.env.ORACLE_CMS}/content/published/api/v1.1/items?q=type+eq+"custom_text"&channelToken=${channelToken}&fields=all`)
            .then(channelTokenResponse => channelTokenResponse.json())
            .catch(err => { console.error('Erro ao conectar' + err.message) })
        })
        .catch(err => { console.error('Erro ao conectar' + err.message) })
    })
    .catch(err => { console.error('Erro ao conectar' + err.message) })

  res.status(200).json(data)
}