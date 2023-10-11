import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { getBlogPosts } from "@/services/hooks/getBlogPosts";
import { ImageCMS } from "@/types";

export const getCMSHeavyHome = async () => {
  const [
    content,
    contentLeves,
    text,
    textLeves,
    historyContent,
    blogPosts,
  ]: any = await Promise.all([
    getImage("home_pesados"),
    getImage("home_leves"),
    getText("home_pesados"),
    getText("home_leves"),
    getImage("shared"),
    getBlogPosts(),
  ]);

  const banners = content?.banner_carousel?.sort(
    (a: ImageCMS, b: ImageCMS) =>
      (Number(a?.fields?.content_order) || 0) -
      (Number(b?.fields?.content_order) || 0)
  );

  const bannersResult = banners?.map((banner: any) => {
    return {
      src: banner.fields.native.links[0].href,
      srcMobile: banner.mobileObj.fields.native.links[0].href,
      title: banner.fields?.content_title,
      buttonTitle: banner.fields?.buttonText ?? "Ver modelos",
      href: banner.fields?.href_attribute ?? "",
      id: banner.id,
    };
  });

  const ourProducts = content?.our_products
    ?.sort((a: any, b: any) => a.fields.content_order - b.fields.content_order)
    .map((product: any) => {
      return {
        image: product.fields.native.links[0].href,
        id: product.id,
        mobileImage: product.mobileObj
          ? product.mobileObj.fields.native.links[0].href
          : product.fields.native.links[0].href,
        title: product.fields.content_title,
        href: product.fields.href_attribute ?? "#",
        order: product.fields.content_order,
      };
    });

  const bannerRentalLiftingPlatforms = content?.banner_rental_lifting_platforms
    ?.length
    ? {
        image:
          content?.banner_rental_lifting_platforms[0]?.fields.native.links[0]
            .href,
        mobileImage: content?.banner_rental_lifting_platforms[0].mobileObj
          ? content?.banner_rental_lifting_platforms[0].mobileObj.fields.native
              .links[0].href
          : content?.banner_rental_lifting_platforms[0].fields.native.links[0]
              .href,
        title: content?.banner_rental_lifting_platforms[0].fields.content_title,
        description:
          content?.banner_rental_lifting_platforms[0].fields.content_text,
        href:
          content?.banner_rental_lifting_platforms[0].fields.href_attribute ??
          "#",
      }
    : {};
  content?.banner_rental_lifting_platforms;

  const ourServices = content?.our_services
    ?.sort((a: any, b: any) => a.fields.content_order - b.fields.content_order)
    .map((services: any) => {
      return {
        url: services.fields.native.links[0].href,
        id: services.id,
        title: services.fields.content_title,
        article: services.fields.content_text,
        href: services.fields.href_attribute ?? "#",
      };
    });

  const successHistory = historyContent?.success_history?.map(
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
    title: textLeves?.historias_de_sucesso?.[0].fields.title,
    text: textLeves?.historias_de_sucesso?.[0].fields.text_field[0],
    buttonText: textLeves?.historias_de_sucesso?.[0].fields.buttonText[0],
    hrefButton: textLeves?.historias_de_sucesso?.[0].fields.hrefButton[0],
  };

  const millsMagazine = {
    title: textLeves?.revista_mills?.[0].fields.title || "",
    text: textLeves?.revista_mills?.[0].fields.text_field[0] || "",
    href: textLeves?.revista_mills?.[0].fields.hrefButton ?? "#",
    buttonTitle: textLeves?.revista_mills?.[0].fields.buttonText,
    posts: blogPosts,
  };

  const groupedArray: any = [];

  historyContent.icon_segments_heavy?.forEach((item: any) => {
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

  const bannerNumbers = contentLeves?.banner_numbers?.map((banner: any) => {
    return {
      image: banner?.fields?.native?.links[0].href,
      mobileImage: banner?.mobileObj?.fields?.native.links[0].href,
    };
  });

  let filterTextNumbers: any = [];
  for (
    let i = 0;
    i < textLeves?.text_numbers?.[0].fields?.subtitle.length;
    i++
  ) {
    filterTextNumbers.push({
      title: textLeves.text_numbers[0].fields?.subtitle[i],
      text: textLeves.text_numbers[0].fields?.text_field[i],
    });
  }

  const textNumbers = filterTextNumbers;

  const groupedByContentOrder: any = {};

  historyContent.icon_segments_heavy?.forEach((segment: any) => {
    const contentOrder = segment.fields.content_order;

    if (!groupedByContentOrder[contentOrder]) {
      groupedByContentOrder[contentOrder] = [];
    }

    groupedByContentOrder[contentOrder].push(segment);
  });
  const uniqueDescriptions: any = {};
  historyContent.icon_segments_heavy?.forEach((obj: any) => {
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
      href: segmentGroup[0]?.fields.href_attribute,
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
        segment[0]?.content_order !== "" ? segment[0]?.href : segment[1]?.href,
      id: segment[0]?.id !== "" ? segment[0]?.id : segment[1]?.id,
      image: segment[0]?.image !== "" ? segment[0]?.image : segment[1]?.image,
      title: segment[0]?.title !== "" ? segment[0]?.title : segment[1]?.title,
      visible: false,
    };
  });
  segments.sort((a: any, b: any) => a.content_order - b.content_order);

  return {
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
  };
};
