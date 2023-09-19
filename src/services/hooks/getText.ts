import SearchCMS from "@/dtos/SearchCMS";

interface ResultSearchCMS {
  count: number;
  items: SearchCMS[];
}

interface CMSReturn {
  [key: string]: SearchCMS[];
}

export const getText = async (text: String) => {
  const result: ResultSearchCMS = await fetch(
    `${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/texts?description=${text}`
  )
    .then((res) => res.json())
    .catch((err) => console.error("Erro fetch textos: " + err));
  let contentAreaList: string[] = [];
  let objReturn: CMSReturn = {};

  if (result?.items?.length > 0) {
    result?.items.map((item: SearchCMS) => {
      const search = contentAreaList.includes(item.fields.content_area);
      if (!search) {
        contentAreaList.push(item.fields.content_area);
      }
    });

    contentAreaList.forEach((content: string) => {
      const search = result.items.filter(
        (item: SearchCMS) => item.fields.content_area === content
      );
      let objFilter: SearchCMS[] = [];
      if (search.length > 0) {
        search.map((obj: SearchCMS) => {
          if (!obj.fields.mobile) {
            const getMobileObj = search.find(
              (y) => y.name.includes(obj.name.slice(2)) && y.fields.mobile
            );
            objFilter.push(Object.assign({ mobileObj: getMobileObj }, obj));
          }
        });

        objReturn[`${content}`] = objFilter;
      }
    });
  }

  return objReturn;
};
