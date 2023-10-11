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
import { OthersContent } from "./types";
import { SimpleBanner } from "@/components/SimpleBanner/SimpleBanner";
import { CategoryCarousel } from "@/components/shared/CategoryCarousel/CategoryCarousel";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { OtherSegments } from "@/components/HeavySegments/OtherSegments/OtherSegments";
import { Slideshow } from "@/components/shared/Slideshow/Slideshow";
import { SegmentsSlideshow } from "@/components/HeavySegments/SegmentsSlideshow/SegmentsSlideshow";
import { updateParagraphs } from "@/utils/texts";

function Others() {
  const [content, setContent] = useState<OthersContent>();
  const [contentBase, setContentBase] = useState<any>();

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const { isDesktop, isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentShared }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentShared)
        : contentShared;

      const abouts = responsiveContent?.["heavy_Others_machinery"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const segments =
        responsiveContent?.["showcase_heavy_machinery_other_segments"];
      const otherSegments = [
        segments?.find(
          ({ description }: ImageCMS) =>
            description === "vitrine maquinas pesadas agronegocio"
        ),
        segments?.find(
          ({ description }: ImageCMS) =>
            description === "vitrine maquinas pesadas construcao"
        ),
        segments?.find(
          ({ description }: ImageCMS) =>
            description === "vitrine maquinas pesadas florestal"
        ),
        segments?.find(
          ({ description }: ImageCMS) =>
            description === "vitrine maquinas pesadas mineracao"
        ),
        segments?.find(
          ({ description }: ImageCMS) =>
            description === "vitrine maquinas pesadas portuario"
        ),
      ];

      const showcase =
        responsiveContent?.["acting_heavy_machinery_other_segments"];

      const carousel = [
        showcase?.find(
          ({ description }: ImageCMS) =>
            description === "maquinas pesadas siderurgica"
        ),
        showcase?.find(
          ({ description }: ImageCMS) =>
            description === "maquinas pesadas fertilizante"
        ),
        showcase?.find(
          ({ description }: ImageCMS) =>
            description === "maquinas pesadas industria de manufatura"
        ),
        showcase?.find(
          ({ description }: ImageCMS) =>
            description === "maquinas pesadas aterro sanitario"
        ),
      ];

      const formattedData = {
        banner:
          responsiveContent?.["banner_heavy_machinery_other_segments"]?.[0],
        categories: responsiveShared?.["machine_models_icon"],
        firstAbout: responsiveContent?.["heavy_machinery_other_segments"]?.[0],
        secondAbout: responsiveContent?.["heavy_machinery_other_segments"]?.[1],
        otherSegments,
        carousel,
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent(
          "maquinas_pesadas_outros_segmentos"
        );
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
              name: "Outros segmentos",
              href: "/maquinas-pesadas/outros",
            },
          ]}
        />

        {content?.otherSegments && (
          <OtherSegments
            title="A Mills oferece a locação de máquinas pesadas para diversos segmentos"
            cards={content.otherSegments}
          />
        )}
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          buttonTitle={
            content?.firstAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          isTalkToSpecialist
          forceImageDisplayOnMobile
          theme="beige-100"
          buttonVariant="outlined"
          dnaColor={isDesktop && "#004042"}
        />
        <CategoryCarousel
          title="Na Mills você encontra diversos modelos"
          categories={content?.categories}
        />
        {content?.carousel && (
          <SegmentsSlideshow
            title="Como a Mills atua em outros segmentos"
            description="A Mills não se limita aos segmentos mais populares, como construção e agronegócio. As nossas máquinas são muito úteis para os setores de siderurgia, indústrias de manufatura, fertilizante e aterro sanitário. Quer saber como? Confira"
            buttonHref="/maquinas-pesadas/busca"
            slides={content?.carousel}
          />
        )}
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          buttonTitle={
            content?.secondAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          isTalkToSpecialist
          orientation="inverted"
          theme="green-800"
          color="white"
          buttonVariant="whiteOutline"
          dnaColor="#ffffff"
          dnaOnTop
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Others;
