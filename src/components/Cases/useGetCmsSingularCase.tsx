import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { getBlogPosts } from "@/services/hooks/getBlogPosts";
import { ImageCMS } from "@/types";

interface GetCmsSingularCaseProps {
  id: string;
}

export const useGetCmsSingularCase = async ({
  id,
}: GetCmsSingularCaseProps) => {
  const content: any = await getImage("cases_shared");
  const text: any = await getText("cases_shared");
  const contentFiltered = content[id];
  const textFiltered = text[`what_they_needed_text_${id}`];
  const withMillsText = text[` with_mills_text_${id}`];
  const hire_platforms_text = text[`hire_platforms_text_${id}`];
  const mills_versus_text = text[`mills_versus_text_${id}`];
  const mills_versus = content[`mills_versus_${id}`];
  const testimonies_text = text[`testimonies_text_${id}`];

  const firstSection = {
    title: contentFiltered.length
      ? contentFiltered[0]?.fields.content_title
      : "",
    text: contentFiltered.length ? contentFiltered[0]?.fields.content_text : "",
    img: contentFiltered.length
      ? contentFiltered[0]?.fields.native.links[0].href
      : "",
    mobileImg: contentFiltered.length
      ? contentFiltered[0]?.mobileObj?.fields.native.links[0].href
      : "",
  };

  const bannersResult = {
    src: content?.main_banner[0].fields.native.links[0].href,
    srcMobile: content?.main_banner[0].mobileObj.fields.native.links[0].href,
    title: contentFiltered.length
      ? contentFiltered[0]?.fields.content_title
      : "",
    id: content?.main_banner[0].id,
  };

  const whatTheyNeeded = {
    title: textFiltered[0]?.fields.title,
    text: textFiltered[0]?.fields.text_field[0],
    subtitle: textFiltered[0]?.fields.subtitle[0],
    img: content?.what_they_needed[0]?.fields.native.links[0].href,
    mobileImg:
      content?.what_they_needed[0]?.mobileObj?.fields.native.links[0].href,
  };

  const dividerSection = {
    text: withMillsText ? withMillsText[0]?.fields.text_field[0] : "",
  };

  const hirePlatformsText = {
    title: hire_platforms_text[0]?.fields.title,
    subtitleList: hire_platforms_text[0]?.fields.subtitle,
    img: content?.hire_platforms[0]?.fields.native.links[0].href,
    mobileImg:
      content?.hire_platforms[0]?.mobileObj?.fields.native.links[0].href,
  };

  const millsVersusText = {
    title: mills_versus_text ? mills_versus_text[0]?.fields.title : "",
    subtitleHeader: mills_versus_text
      ? mills_versus_text[0]?.fields.subtitle
      : "",
    textField: mills_versus_text
      ? mills_versus_text[0]?.fields.text_field[0]
      : "",
    millsVersusList: mills_versus?.map((item: any) => {
      return {
        logo: item.fields.native.links[0].href,
        text: item.fields.content_text,
        content_title: item.fields.content_title,
      };
    }),
  };

  const testimoniesText = {
    subtitle: testimonies_text[0]?.fields.subtitle,
    text: testimonies_text[0]?.fields.text_field,
    title: testimonies_text[0]?.fields.title,
  };
  console.log({ millsVersusText });
  console.log({ content });
  return {
    bannersResult,
    firstSection,
    whatTheyNeeded,
    dividerSection,
    hirePlatformsText,
    millsVersusText,
    testimoniesText,
  };
};
