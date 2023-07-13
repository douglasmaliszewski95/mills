import ImagesHome from "@/dtos/ImagesHome";
import { getImage } from "@/services/hooks/getImage";
import { getImageSrc, getMobileImageName } from "@/utils/images";

export const getCMSContent = async (homeType: string) => {
  const content: ImagesHome[] = await getImage(homeType);

  const desktopBanners = content.filter((image) =>
    image.name.startsWith("d_banner_carousel")
  );
  const mobileBanners = content.filter((image) =>
    image.name.startsWith("m_banner_carousel")
  );

  const desktopOurProducts = content.filter((image) =>
    image.name.startsWith("d_ourproducts")
  );

  const ourServices = content.filter((image) =>
    image.name.startsWith("d_ourservices")
  );

  const numbersBanner = content.find((image) =>
    image.name.startsWith("d_numbers_banner")
  );

  const numbersBannerMobile = content.find((image) =>
    image.name.startsWith("m_numbers_banner")
  );

  const info = {
    banners: desktopBanners.map((image, index) => {
      const src = getImageSrc(image);

      const respectiveMobileImage = mobileBanners.find(
        (mobileImage) => mobileImage.name === getMobileImageName(image.name)
      );
      const srcMobile = respectiveMobileImage
        ? getImageSrc(respectiveMobileImage)
        : "";

      const banner = {
        id: String(index),
        src,
        srcMobile,
        title:
          "Conte com a eficiência e proximidade que você já conhece para alavancar a produtividade na gestão da sua frota.",
        buttonTitle: "Ver modelos",
      };

      return banner;
    }),
    ourProducts: desktopOurProducts.map((image, index) => {
      const src = getImageSrc(image);

      return {
        id: String(index),
        image: src,
        alt: "",
        title: "Plataforma Elevatória",
      };
    }),
    ourServices: ourServices.map((image, index) => {
      const src = getImageSrc(image);

      return {
        id: String(index),
        image: src,
        alt: "",
        title: "Treinamento para operadores e supervisores",
        article:
          "Nos últimos anos capacitamos cerca de 26 mil trabalhadores em mais de 2 mil treinamentos realizados nos últimos anos. Nossos treinamentos levam conhecimento especializado aos seus operadores para um uso seguro e eficaz.",
        url: "https://google.com.br",
      };
    }),
    numbers: {
      bannerDesktop: numbersBanner ? getImageSrc(numbersBanner) : "",
      bannerMobile: numbersBannerMobile ? getImageSrc(numbersBannerMobile) : "",
    },
  };

  return info;
};
