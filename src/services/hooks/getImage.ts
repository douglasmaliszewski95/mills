import SearchCMS from "@/dtos/SearchCMS";
import { GET_IMAGE } from "./graphql/queries/getImage";
import client from "./graphql/apollo-client";

interface ResultSearchCMS {
  count: number
  items: SearchCMS[]
}

interface CMSReturn {
  [key: string]: SearchCMS[]
}

const environment = "https://novo-site-qa.mills.com.br";

export const getImage = async (text: String) => {
  try {
    const { data } = await fetch(`${environment}/api/graphql`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_IMAGE,
        variables: {
          description: text
        }
      })
    }).then(res => res.json()).catch(err => console.error("erro: " + err))

    // const { data } = await client.query({
    //   query: GET_IMAGE,
    //   variables: {
    //     description: text,
    //   },
    // });
    const result: ResultSearchCMS = data.images;
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
  } catch (error) {
    console.error("Erro: " + error)
  }

};
