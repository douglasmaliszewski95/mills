import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";

export const useGetCMSCases = async () => {
  const content: any = await getImage("cases");
  const text: any = await getText("cases");

  const bannersResult = {
    src: content?.main_banner[0].fields.native.links[0].href,
    srcMobile: content?.main_banner[0].mobileObj.fields.native.links[0].href,
    title: content?.main_banner[0].fields.content_title,
    id: content?.main_banner[0].id,
  };
  const supportCustomers = {
    title: content?.support_customers[0].fields.content_title,
    text: content?.support_customers[0].fields.content_text,
    img: content?.support_customers[0].fields.native.links[0].href,
    mobileImg:
      content?.support_customers[0].mobileObj.fields.native.links[0].href,
  };

  const groupingByTitle: any = {};
  content?.list_cases?.forEach((listCaseObj: any) => {
    const contentTitle = listCaseObj.fields.content_title;

    if (!groupingByTitle[contentTitle]) {
      groupingByTitle[contentTitle] = {
        img: null,
        text: null,
        logo: null,
        contentOrder: null,
        href: null,
      };
    }

    if (listCaseObj.mimeType === "image/svg+xml") {
      groupingByTitle[contentTitle].logo =
        listCaseObj.fields.native.links[0].href;
    } else if (!groupingByTitle[contentTitle].img) {
      groupingByTitle[contentTitle].img =
        listCaseObj.fields.native.links[0].href;
    }

    if (!groupingByTitle[contentTitle].text) {
      groupingByTitle[contentTitle].text = listCaseObj.fields.content_text;
      groupingByTitle[contentTitle].contentOrder =
        listCaseObj.fields.content_order;
      groupingByTitle[contentTitle].href = listCaseObj.fields.href_attribute;
    }
  });
  const listCases = Object.values(groupingByTitle);
  listCases.sort((a: any, b: any) => a.contentOrder - b.contentOrder);

  const customerReviews = {
    title: text?.customer_reviews[0].fields.title,
    listOfOpinions: text?.customer_reviews[0].fields.text_field?.map(
      (item: any, index: number) => {
        return {
          text: item,
          testimonial: text?.customer_reviews[0].fields.subtitle[index],
        };
      }
    ),
  };

  const changeInnovatePart = {
    src: content?.change_innovate_part[0].fields.native.links[0].href,
    srcMobile:
      content?.change_innovate_part[0].mobileObj.fields.native.links[0].href,
    text: content?.change_innovate_part[0].fields.content_text,
    id: content?.change_innovate_part[0].id,
    href: content?.change_innovate_part[0].fields.href_attribute,
  };

  return {
    bannersResult,
    supportCustomers,
    listCases,
    customerReviews,
    changeInnovatePart,
  };
};
