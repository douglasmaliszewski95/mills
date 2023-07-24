import SearchCMS from "@/dtos/SearchCMS";
import { GET_TEXT } from "./graphql/queries/getText";
import client from "./graphql/apollo-client";

interface ResultSearchCMS {
  count: number
  items: SearchCMS[]
}

interface CMSReturn {
  [key: string]: SearchCMS[]
}

export const getText = async () => {
  const { data } = await client.query({
    query: GET_TEXT
  });
  const result: ResultSearchCMS = data.texts;
  let contentAreaList: string[] = []
  let objReturn: CMSReturn = {}

  if (result.items.length > 0) {
    result.items.map((item: SearchCMS) => {
      const search = contentAreaList.includes(item.fields.content_area)
      if (!search) {
        contentAreaList.push(item.fields.content_area)
      }
    })

    contentAreaList.forEach((content: string) => {
      const search = result.items.filter((item: SearchCMS) => item.fields.content_area === content)
      if (search.length > 0) {
        objReturn[`${content}`] = search
      }
    })
  }

  return objReturn;
};
