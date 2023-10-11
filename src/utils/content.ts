import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { getBlogPosts } from "@/services/hooks/getBlogPosts";
import { ImageCMS } from "@/types";

const sortOurProducts = (ourProducts: ImageCMS[]) => {
  const ourProductsAux = [
    ourProducts?.find(
      (image: ImageCMS) => image.description === "ourproducts elevatorias"
    ),
    ourProducts?.find(
      (image: ImageCMS) => image.description === "ourproducts pesadas"
    ),
    ourProducts?.find(
      (image: ImageCMS) => image.description === "ourproducts escoramentos"
    ),
    ourProducts?.find(
      (image: ImageCMS) => image.description === "ourproducts compressores"
    ),
    ourProducts?.find(
      (image: ImageCMS) => image.description === "ourproducts geradores"
    ),
  ];

  return ourProductsAux;
};

export const getCMSHomeImage = async () => {
  const [content, text, historyContent, blogPosts]: any = await Promise.all([
    getImage("home_leves"),
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
      srcMobile: banner.mobileObj?.fields.native.links[0].href ?? "",
      title: banner.fields?.content_title,
      buttonTitle: banner.fields?.button_text ?? "Ver modelos",
      href: banner.fields?.href_attribute ?? "",
      id: banner.id,
      alt: banner.fields?.alt_attribute ?? "",
    };
  });

  const ourProductsAux = sortOurProducts(content?.ourproducts);

  const ourProducts = ourProductsAux
    ?.map((product: any) => {
      return {
        image: product.fields.native.links[0].href,
        id: product.id,
        mobileImage: product.mobileObj
          ? product.mobileObj.fields.native.links[0].href
          : product.fields.native.links[0].href,
        title: product.fields.content_title,
        href: product.fields.href_attribute ?? "#",
      };
    })
    .sort((a: any, b: any) => a.order - b.order);

  const groupedByContentOrder: any = {};

  historyContent?.icon_types_segments?.forEach((segment: any) => {
    const contentOrder = segment.fields.content_order;

    if (!groupedByContentOrder[contentOrder]) {
      groupedByContentOrder[contentOrder] = [];
    }

    groupedByContentOrder[contentOrder].push(segment);
  });

  const uniqueDescriptions: any = {};
  historyContent?.icon_types_segments?.forEach((obj: any) => {
    const description = obj.description;
    if (!uniqueDescriptions[description]) {
      uniqueDescriptions[description] = [];
    }
    uniqueDescriptions[description].push(obj);
  });

  const newArray = Object.values(uniqueDescriptions);
  const segments = newArray.map((segmentGroup: any) => {
    let image = "";
    let hoverImage = "";
    for (const segment of segmentGroup) {
      if (segment.name.includes("laranja")) {
        image = segment.fields.native.links[0].href;
        break;
      }
    }

    for (const segment of segmentGroup) {
      if (segment.name.includes("cinza")) {
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
    };
  });
  segments.sort((a, b) => a.content_order - b.content_order);

  const bannerNumbers = content?.banner_numbers?.map((banner: any) => {
    return {
      image: banner.fields.native.links[0].href,
      mobileImage: banner.mobileObj.fields.native.links[0].href,
    };
  });

  const ourServices = content?.ourservices?.map((services: any) => {
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

  let filterTextNumbers: any = [];
  for (let i = 0; i < text?.text_numbers?.[0].fields?.subtitle.length; i++) {
    filterTextNumbers.push({
      title: text.text_numbers[0].fields?.subtitle[i],
      text: text.text_numbers[0].fields?.text_field[i],
    });
  }

  const textNumbers = filterTextNumbers;
  const successHistoryTexts = {
    title: text?.historias_de_sucesso?.[0].fields.title,
    text: text?.historias_de_sucesso?.[0].fields.text_field[0],
    buttonText: text?.historias_de_sucesso?.[0].fields.buttonText[0],
    hrefButton: text?.historias_de_sucesso?.[0].fields.hrefButton[0],
  };

  // let filterPosts: any = [];
  // for (let i = 0; i < blogPosts?.item?.length; i++) {
  //   if (filterPosts.length === 9) break;
  //   else {
  //     filterPosts.push({
  //       image: null,
  //       alt: null,
  //       category: blogPosts.item[i].category[0]._cdata,
  //       title: blogPosts.item[i].title._text,
  //       date: new Date(blogPosts.item[i].pubDate._text).toLocaleDateString(),
  //       link: blogPosts.item[i].link._text,
  //     });
  //   }
  // }

  const millsMagazine = {
    title: text?.revista_mills?.[0].fields.title ?? "",
    text: text?.revista_mills?.[0].fields.text_field[0] ?? "",
    href: text?.revista_mills?.[0].fields.hrefButton ?? "#",
    buttonTitle: text?.revista_mills?.[0].fields.buttonText,
    posts: blogPosts,
  };

  return {
    bannersResult,
    ourProducts,
    segments,
    bannerNumbers,
    ourServices,
    successHistory,
    textNumbers,
    successHistoryTexts,
    millsMagazine,
  };
};

export const transformContentToMobile = (content: any) => {
  const transformedData: {
    [key: string]: { mobileObj: ImageCMS }[];
  } = {};

  for (const key in content) {
    if (content.hasOwnProperty(key)) {
      transformedData[key] = content[key].map((image: ImageCMS) => {
        if (image.mobileObj === undefined) {
          return image;
        } else {
          return image.mobileObj;
        }
      });
    }
  }

  return transformedData;
};
