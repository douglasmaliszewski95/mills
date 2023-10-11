import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { MoldsContent } from "./types";
import { Banner } from "@/components/shared/Banner/Banner";
import { getImageSrc } from "@/utils/images";
import { transformContentToMobile } from "@/utils/content";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { About } from "@/components/shared/About/About";
import { ImageCMS } from "@/types";
import { AtuationSegments } from "@/components/Category/AtuationSegments/AtuationSegments";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { ConstructionSlideShow } from "@/components/Category/ConstructionSlideShow/ConstructionSlideShow";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { getText } from "@/services/hooks/getText";
import { AboutCarousel } from "@/components/Category/AboutCarousel/AboutCarousel";
import _ from "lodash";
import { updateParagraphs } from "@/utils/texts";

function MoldsAndShoring() {
  const [content, setContent] = useState<MoldsContent>();
  const [contentBase, setContentBase] = useState<any>();
  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentSharedAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentSharedAux)
        : contentSharedAux;

      const transformedConstructions = transformCMSArrayToObject(
        responsiveShared?.["construction_presents"],
        "description"
      );

      const segments: ImageCMS[] = [
        responsiveContent?.["acting_infrastructure"][0],
        responsiveContent?.["acting_energy"][0],
        responsiveContent?.["acting_large_buildings"][0],
        responsiveContent?.["acting_industry"][0],
        responsiveContent?.["acting_sanitation"][0],
        responsiveContent?.["acting_transport_mobility"][0],
      ];

      const differentialIcons = [
        responsiveContent?.["icon_differential_aliancas"][0],
        responsiveContent?.["icon_differential_equipment"][0],
        responsiveContent?.["icon_differential_inovacoes"][0],
        responsiveContent?.["icon_differential_expressiveness"][0],
      ];

      const differentials = differentialIcons.map((icon) => ({
        id: icon?.name,
        title: icon?.fields?.content_title,
        description: icon?.fields?.content_text,
        alt: icon?.fields?.alt_attribute,
        image: getImageSrc(icon?.fields),
      }));

      const constructionCards: ImageCMS[] = [
        transformedConstructions?.["obras presentes olimpíadas 2016"],
        transformedConstructions?.["obras presentes arcos da lapa"],
        transformedConstructions?.["obras presentes rodoanel norte sp"],
        transformedConstructions?.[
          "obras presentes usina hidrelétrica de itaipu"
        ],
        transformedConstructions?.["obras presentes ponte guaiba"],
        transformedConstructions?.["obras presentes ferrovias aco"],
        transformedConstructions?.["obras presentes copa mundo"],
        transformedConstructions?.["obras presentes catedral se"],
      ];

      const formattedContent = {
        banner: responsiveContent?.["banner_formas_escoramentos"]?.[0],
        firstAbout: isMobile
          ? contentAux?.["civi_construction"]?.[0]
          : responsiveContent?.["civi_construction"]?.[0],
        segments,
        differentials,
        constructionCards,
        secondAbout: responsiveContent?.["fale_com_especialista"]?.[0],
        molds: contentText?.["text_molds"]?.[0],
        shoring: contentText?.["text_shoring"]?.[0],
        specialSystems: contentText?.["text_especial"]?.[0],
      };

      setContent(formattedContent);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const [
          contentAux,
          contentSharedAux,
          contentText
        ]: any = await Promise.all([
          getCMSContent("formas"),
          getCMSContent("shared"),
          getText("formas_e_escoramentos")
        ]);        
        setContentBase({ contentAux, contentSharedAux, contentText });
        formatData({ contentAux, contentSharedAux, contentText });
      } else {
        formatData({ ...contentBase });
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
          title={content?.banner?.fields?.content_title ?? ""}
          backgroundImage={getImageSrc(content?.banner?.fields)}
          linkList={[
            {
              name: "Fôrmas e escoramentos",
              href: "formas-e-escoramentos",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          hideImage={isMobile}
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver modelos"}
        />
        {content?.segments && (
          <AtuationSegments
            title="Segmentos de atuação"
            description="Estamos presente em todo o território Nacional, com centros logísticos operando em todas as regiões do Brasil em diferentes segmentos:"
            cards={content.segments}
          />
        )}
        <AboutCarousel content={content?.molds} />
        <AboutCarousel
          content={content?.shoring}
          theme="beige-200"
          tooltipText={
            content?.shoring?.fields?.subtitle?.[0] ??
            "A Associação Brasileira de Cimento Portland (ABCP) define o escoramento como uma estrutura provisória que possui em sua composição um conjunto de elementos com o intuito de apoiar as fôrmas de lajes e vigas. Ele é capaz, portanto, de suportar as cargas atuantes, o peso próprio do concreto, movimentação de operários e equipamentos. Este peso é transmitido para a estrutura anterior ou para o piso, até que essa estrutura se torne autoportante, podendo ser metálico ou de madeira."
          }
        />
        <AboutCarousel content={content?.specialSystems} />
        {content?.differentials && (
          <AboutRental
            title="O que a Mills traz como diferencial?"
            items={content?.differentials}
          />
        )}
        {content?.constructionCards && (
          <ConstructionSlideShow cards={content?.constructionCards} />
        )}
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          theme="orange-500"
          color="white"
          buttonTitle={
            content?.secondAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          isTalkToSpecialist
        />
      </main>
      <Footer />
    </>
  );
}

export default MoldsAndShoring;
