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
import { ConstructionContent } from "./types";
import { SimpleBanner } from "@/components/SimpleBanner/SimpleBanner";
import { CategoryCarousel } from "@/components/shared/CategoryCarousel/CategoryCarousel";
import { updateParagraphs } from "@/utils/texts";

function Construction() {
  const [content, setContent] = useState<ConstructionContent>();
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

      const abouts = responsiveContent?.["heavy_construction_machinery"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const iconsAux = responsiveContent?.[
        "icon_heavy_construction_machinery"
      ]?.map((icon: ImageCMS) => ({
        id: icon?.description,
        title: icon?.fields?.content_title,
        description: icon?.fields?.content_text,
        alt: icon?.fields?.alt_attribute,
        image: getImageSrc(icon?.fields),
      }));

      const icons = [
        iconsAux?.find(
          ({ id }: Item) => id === "icon pesados liderança nacional"
        ),
        iconsAux?.find(
          ({ id }: Item) => id === "icon pesados venda consultiva"
        ),
        iconsAux?.find(({ id }: Item) => id === "icon pesados excelencia"),
        iconsAux?.find(({ id }: Item) => id === "icon pesados economia"),
      ];

      const formattedData = {
        banner: responsiveContent?.["banner_heavy_construction_machinery"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        thirdAbout: abouts?.[2],
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
        const contentAux = await getCMSContent("maquinas_pesadas_construcao");
        const contentShared = await getCMSContent("shared");
        setContentBase({ contentAux, contentShared });
        formatData({ contentAux, contentShared });
      } else {
        formatData(contentBase);
      }
    };
    getContent();
  }, [formatData]);

  useEffect(() => {
    updateParagraphs();
  }, [content, contentBase]);

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
              name: "Construção",
              href: "/maquinas-pesadas/construcao",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          theme="gray-50"
          buttonTitle={
            content?.firstAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          isTalkToSpecialist
        />
        <CategoryCarousel
          title="Na Mills você encontra diversos modelos"
          categories={content?.categories}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          link={content?.secondAbout?.fields?.href_attribute ?? "#"}
          orientation="inverted"
          hasButton={false}
          theme="green-800"
          color="white"
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          link={content?.thirdAbout?.fields?.href_attribute ?? "#"}
          forceImageDisplayOnMobile
        />
        {content?.icons && (
          <AboutRental
            title="Principais benefícios ao investir na locação de máquinas pesadas com a Mills"
            items={content?.icons}
            theme="gray-50"
            textColor="green-800"
          />
        )}
        <SimpleBanner banner={content?.secondBanner} textWidth={80} />
      </main>
      <Footer />
    </>
  );
}

export default Construction;
