import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Banner } from "@/components/shared/Banner/Banner";
import { ImageCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { About } from "@/components/shared/About/About";
import { transformContentToMobile } from "@/utils/content";
import { Item } from "@/components/Category/AboutRental/types";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { AgribusinessContent } from "./types";
import { SimpleBanner } from "@/components/SimpleBanner/SimpleBanner";
import { CategoryCarousel } from "@/components/shared/CategoryCarousel/CategoryCarousel";

function Agribusiness() {
  const [content, setContent] = useState<AgribusinessContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentShared }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentShared)
        : contentShared;

      const abouts = responsiveContent?.["agribusiness"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const iconsAux = responsiveContent?.["icon_agribusiness_rental"]?.map(
        (icon: ImageCMS) => ({
          id: icon?.description,
          title: icon?.fields?.content_title,
          description: icon?.fields?.content_text,
          alt: icon?.fields?.alt_attribute,
          image: getImageSrc(icon?.fields),
        })
      );

      const icons = [
        iconsAux?.find(({ id }: Item) => id === "icon controle qualidade"),
        iconsAux?.find(({ id }: Item) => id === "icon otimizacao recursos"),
        iconsAux?.find(({ id }: Item) => id === "icon alta produtividade"),
        iconsAux?.find(({ id }: Item) => id === "icon motivos"),
      ];

      const formattedData = {
        banner: responsiveContent?.["banner_agribusiness"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        icons,
        categories: responsiveShared?.["machine_models_icon"],
        secondBanner: responsiveContent?.["count_on_us"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("maquinas_pesadas_agronegocio");
        const contentShared = await getCMSContent("shared");
        setContentBase({ contentAux, contentShared });
        formatData({ contentAux, contentShared });
      } else {
        formatData(contentBase);
      }
    };
    getContent();
  }, [formatData]);

  return (
    <>
      <Header />
      <main>
        <Banner
          backgroundImage={
            content?.banner && getImageSrc(content?.banner?.fields)
          }
          title={content?.banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: "Home",
              href: "/maquinas-pesadas",
            },
            {
              name: "Agronegócio",
              href: "/maquinas-pesadas/agronegocio",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          buttonTitle={
            content?.firstAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          link={content?.secondAbout?.fields?.href_attribute ?? "#"}
          orientation="inverted"
          theme="beige-100"
        />
        <CategoryCarousel
          title="Na Mills você encontra diversos modelos"
          categories={content?.categories}
        />
        {content?.icons && (
          <AboutRental
            title="Na Mills você encontra diversos modelos"
            items={content?.icons}
          />
        )}
        <SimpleBanner banner={content?.secondBanner} textWidth={80} />
      </main>
      <Footer />
    </>
  );
}

export default Agribusiness;
