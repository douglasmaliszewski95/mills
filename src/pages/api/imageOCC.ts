import { getCredentialsOCC } from "@/services/hooks/getCredentialsOCC";
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { src } = req.query;

  const url = `https://p19894161c1prd-store.occa.ocs.oraclecloud.com${src}`;
  const token = await getCredentialsOCC();
  const response = await fetch(url, {
    headers: {
      "Content-type": "image/jpeg",
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  if (response.ok) {
    const imageArrayBuffer = await response.arrayBuffer();
    const imageStream = new Readable();
    imageStream.push(Buffer.from(imageArrayBuffer));
    imageStream.push(null);

    res.setHeader("Content-Type", "image/jpeg");

    imageStream.pipe(res);
  } else {
    res.status(404).end();
  }
}
