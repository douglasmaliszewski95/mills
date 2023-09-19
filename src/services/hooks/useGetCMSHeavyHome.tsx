import { useEffect, useState } from "react";
import { getImage } from "./getImage";
import { getText } from "./getText";

// Função que retorna as respostas dos hooks
async function fetchData() {
  const content = await getImage("home_pesados");
  const contentLeves = await getImage("home_leves");
  const text = await getText("home_pesados");
  const textLeves = await getText("home_leves");
  const historyContent = await getImage("shared");
  return { content, text, historyContent, contentLeves, textLeves };
}

// Hook personalizado
export function useGetCMSHeavyHome() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchDataOnServer() {
      const response: any = await fetchData();

      const bannersResult = response?.content?.banner_carousel?.map(
        (banner: any) => {
          return {
            src: banner.fields.native.links[0].href,
            srcMobile: banner.mobileObj.fields.native.links[0].href,
            title: banner.fields?.content_title,
            buttonTitle: "Ver modelos",
            id: banner.id,
          };
        }
      );
      const ourProducts = response?.content?.our_products
        ?.map((product: any) => {
          return {
            image: product.fields.native.links[0].href,
            id: product.id,
            mobileImage: product.mobileObj
              ? product.mobileObj.fields.native.links[0].href
              : product.fields.native.links[0].href,
            title: product.fields.content_title,
            href: product.fields.alt_attribute ?? "#",
          };
        })
        .sort((a: any, b: any) => a.order - b.order);

      const bannerRentalLiftingPlatforms = response?.content
        ?.banner_rental_lifting_platforms?.length
        ? {
            image:
              response?.content?.banner_rental_lifting_platforms[0]?.fields
                .native.links[0].href,
            mobileImage: response?.content?.banner_rental_lifting_platforms[0]
              .mobileObj
              ? response?.content?.banner_rental_lifting_platforms[0].mobileObj
                  .fields.native.links[0].href
              : response?.content?.banner_rental_lifting_platforms[0].fields
                  .native.links[0].href,
            title:
              response?.content?.banner_rental_lifting_platforms[0].fields
                .content_title,
            description:
              response?.content?.banner_rental_lifting_platforms[0].fields
                .content_text,
            href:
              response?.content?.banner_rental_lifting_platforms[0].fields
                .alt_attribute ?? "#",
          }
        : {};
      response?.content?.banner_rental_lifting_platforms;

      const ourServices = response?.content?.our_services?.map(
        (services: any) => {
          return {
            url: services.fields.native.links[0].href,
            id: services.id,
            title: services.fields.content_title,
            article: services.fields.content_text,
            href: services.fields.alt_attribute ?? "#",
          };
        }
      );

      const successHistory = response?.historyContent?.success_history?.map(
        (history: any) => {
          return {
            id: history.id,
            image: history.fields.native.links[0].href,
            name: history.fields.content_title,
            occupation: history.fields.content_subtitle,
            article: history.fields.content_text,
            alt: history.fields.alt_attribute,
          };
        }
      );

      const successHistoryTexts = {
        title: response?.textLeves?.historias_de_sucesso?.[0].fields.title,
        text: response?.textLeves?.historias_de_sucesso?.[0].fields
          .text_field[0],
        buttonText:
          response?.textLeves?.historias_de_sucesso?.[0].fields.buttonText[0],
        hrefButton:
          response?.textLeves?.historias_de_sucesso?.[0].fields.hrefButton[0],
      };

      const millsMagazine = {
        title: response?.textLeves?.revista_mills?.[0].fields.title || "",
        text:
          response?.textLeves?.revista_mills?.[0].fields.text_field[0] || "",
      };

      const groupedArray: any = [];

      response?.historyContent.icon_segments_heavy?.forEach((item: any) => {
        const contentOrder = item.fields.content_order;

        // Procura se já existe um grupo com esse content_order
        const groupIndex = groupedArray.findIndex(
          (group: any) => group[0].fields.content_order === contentOrder
        );

        if (groupIndex !== -1) {
          // Adiciona o objeto ao grupo existente
          groupedArray[groupIndex].push(item);
        } else {
          // Cria um novo grupo e adiciona o objeto
          groupedArray.push([item]);
        }
      });

      const bannerNumbers = response?.contentLeves?.banner_numbers?.map(
        (banner: any) => {
          return {
            image: banner.fields.native.links[0].href,
            mobileImage: banner.mobileObj.fields.native.links[0].href,
          };
        }
      );

      let filterTextNumbers: any = [];
      for (
        let i = 0;
        i < response?.textLeves?.text_numbers?.[0].fields?.subtitle.length;
        i++
      ) {
        filterTextNumbers.push({
          title: response?.textLeves.text_numbers[0].fields?.subtitle[i],
          text: response?.textLeves.text_numbers[0].fields?.text_field[i],
        });
      }

      const textNumbers = filterTextNumbers;

      const groupedByContentOrder: any = {};

      response?.historyContent.icon_segments_heavy?.forEach((segment: any) => {
        const contentOrder = segment.fields.content_order;

        if (!groupedByContentOrder[contentOrder]) {
          groupedByContentOrder[contentOrder] = [];
        }

        groupedByContentOrder[contentOrder].push(segment);
      });
      const uniqueDescriptions: any = {};
      response?.historyContent.icon_segments_heavy?.forEach((obj: any) => {
        const description = obj.description;
        if (!uniqueDescriptions[description]) {
          uniqueDescriptions[description] = [];
        }
        uniqueDescriptions[description].push(obj);
      });

      const newArray = Object.values(uniqueDescriptions);
      const newSegments = newArray.map((segmentGroup: any) => {
        let image = "";
        let hoverImage = "";
        for (const segment of segmentGroup) {
          if (segment.name.includes("verde")) {
            image = segment.fields.native.links[0].href;
            break;
          }
        }

        for (const segment of segmentGroup) {
          if (segment.name.includes("branco")) {
            hoverImage = segment.fields.native.links[0].href;
            break;
          }
        }

        return {
          id: segmentGroup[0]?.id,
          alt: segmentGroup[0]?.fields.alt_attribute,
          image: image,
          hoverImage: hoverImage,
          title: segmentGroup[0]?.fields.content_title,
          content_order: segmentGroup[0]?.fields.content_order,
          href: segmentGroup[0]?.fields.alt_attribute ?? "#",
          visible: false,
        };
      });
      const titleGroups: any = {};
      newSegments.forEach((obj) => {
        const title = obj.title;
        if (!titleGroups[title]) {
          titleGroups[title] = [];
        }
        titleGroups[title].push(obj);
      });
      const unitSegments = Object.values(titleGroups);
      const segments: any = unitSegments.map((segment: any) => {
        return {
          alt: segment[0]?.alt !== "" ? segment[0]?.alt : segment[1]?.alt,
          content_order:
            segment[0]?.content_order !== ""
              ? segment[0]?.content_order
              : segment[1]?.content_order,
          hoverImage:
            segment[0]?.hoverImage !== ""
              ? segment[0]?.hoverImage
              : segment[1]?.hoverImage,
          href:
            segment[0]?.content_order !== ""
              ? segment[0]?.href
              : segment[1]?.href,
          id: segment[0]?.id !== "" ? segment[0]?.id : segment[1]?.id,
          image:
            segment[0]?.image !== "" ? segment[0]?.image : segment[1]?.image,
          title:
            segment[0]?.title !== "" ? segment[0]?.title : segment[1]?.title,
          visible: false,
        };
      });
      segments.sort((a: any, b: any) => a.content_order - b.content_order);

      setData({
        bannersResult,
        ourProducts,
        bannerRentalLiftingPlatforms,
        ourServices,
        successHistory,
        successHistoryTexts,
        millsMagazine,
        segments,
        bannerNumbers,
        textNumbers,
        groupedArray,
      });
    }

    fetchDataOnServer();
  }, []);

  return data;
}
