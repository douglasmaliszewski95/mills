import { getImage } from "@/services/hooks/getImage";
import { getImageSrc, getMobileImageName } from "@/utils/images";
import { mock } from "./utils";

export const getCMSHomeImage = async () => {
  const content: any = await getImage("home_leves");
  // const content: any = mock;

  const groupedBanners = content?.banner_carousel.reduce(
    (acc: any, banner: any) => {
      const contentOrder = parseInt(banner.fields.content_order);

      if (!acc[contentOrder]) {
        acc[contentOrder] = [];
      }

      acc[contentOrder].push(banner);

      return acc;
    },
    {}
  );

  const groupedBannersList = Object.keys(groupedBanners).map(
    (contentOrder) => ({
      contentOrder: parseInt(contentOrder),
      banners: groupedBanners[contentOrder],
    })
  );

  const bannersResult = groupedBannersList.map((banner: any) => {
    return {
      src: banner.banners[0].fields.native.links[0].href,
      srcMobile: banner.banners[1].fields.native.links[0].href,
      title: banner.content[0].fields?.content_title,
      buttonTitle: "Ver modelos",
      id: banner.id,
    };
  });

  const groupedOurProducts = content?.ourproducts.reduce(
    (acc: any, product: any) => {
      const contentOrder = parseInt(product.fields.content_order);
      if (!acc[contentOrder]) {
        acc[contentOrder] = [];
      }

      acc[contentOrder].push(product);

      return acc;
    },
    {}
  );

  const groupedOurProductsList = Object.keys(groupedOurProducts).map(
    (contentOrder) => ({
      contentOrder: parseInt(contentOrder),
      content: groupedOurProducts[contentOrder],
    })
  );

  const ourProducts = groupedOurProductsList.map((product: any) => {
    return {
      image: product.content[0].fields.native.links[0].href,
      id: product.id,
      mobileImage:
        product.content[0].fields.native.links[0].href ??
        product.content[1].fields.native.links[0].href,
      title: product.content[0].fields?.content_title,
    };
  });

  const bannerNumbers = content?.banner_numbers.map((banner: any) => {
    return {
      image: banner.fields.native.links[0].href,
    };
  });
  const ourServices = content?.ourservices.map((services: any) => {
    return {
      url: services.fields.native.links[0].href,
      id: services.id,
      title: services.fields.content_title,
      article: services.fields.content_text,
    };
  });

  return { bannersResult, ourProducts, bannerNumbers, ourServices };
};
