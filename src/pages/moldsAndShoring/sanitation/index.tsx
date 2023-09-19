import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { SanitationContent } from "./types";
import _ from "lodash";
import { getText } from "@/services/hooks/getText";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Banner } from "@/components/shared/Banner/Banner";
import { ImageCMS, TextCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { About } from "@/components/shared/About/About";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { transformContentToMobile } from "@/utils/content";
import { ConstructionSlideShow } from "@/components/Category/ConstructionSlideShow/ConstructionSlideShow";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { Item } from "@/components/Category/AboutRental/types";
import { ShoringModels } from "@/components/formworkAndShoring/ShoringModels/ShoringModels";

function Sanitation() {
  const [content, setContent] = useState<SanitationContent>();
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

      const responsiveText = isMobile
        ? transformContentToMobile(contentText)
        : contentText;

      const transformedConstructions = transformCMSArrayToObject(
        responsiveShared?.["construction_presents"],
        "description"
      );

      const differentials = responsiveShared["compressores_geradores"]
        .map((icon: ImageCMS) => ({
          id: icon?.name,
          title: icon?.fields?.content_title,
          description: icon?.fields?.content_text,
          alt: icon?.fields?.alt_attribute,
          image: getImageSrc(icon?.fields),
        }))
        .reverse();
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

      const formattedData = {
        banner: responsiveContent?.["banner_formas_escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "banner formas escoramentos saneamento"
        ),
        firstAbout: responsiveContent?.["formas-e-escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "formas escoramentos saneamento01"
        ),
        secondAbout: responsiveContent?.["formas-e-escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "formas escoramentos saneamento02"
        ),
        thirdAbout: responsiveContent?.["formas-e-escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "formas escoramentos saneamento03"
        ),
        differentials,
        constructionCards,
        carouselProducts: responsiveText?.["shoring_models_text"]?.find(
          (text: TextCMS) =>
            text?.description === "saneamento modelos escoramento texto"
        ),
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent(
          "formas-escoramentos-saneamento"
        );
        const contentSharedAux = await getCMSContent("shared");
        const contentText = await getText("formas-e-escoramentos-saneamento");
        setContentBase({ contentAux, contentSharedAux, contentText });
        formatData({ contentAux, contentSharedAux, contentText });
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

  return (
    <>
      <Header />
      <main>
        <Banner
          title={content?.banner?.fields?.content_title || ""}
          backgroundImage={getImageSrc(content?.banner?.fields)}
          linkList={[
            {
              name: "Fôrmas e escoramentos",
              href: "formas-e-escoramentos",
            },
            {
              name: "Saneamento",
              href: "formas-e-escoramentos/saneamento",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title || ""}
          description={content?.firstAbout?.fields?.content_text || ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute || ""}
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver modelos"}
        />
        <About
          title={content?.secondAbout?.fields?.content_title || ""}
          description={content?.secondAbout?.fields?.content_text || ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute || ""}
          textFullLength
          hasButton={false}
          orientation="inverted"
          theme="beige-200"
        />
        <About
          type="carousel"
          title="Nosso portfólio de formas atende a diferentes geometrias de acordo com as características das diversas obras e arquiteturas."
          hasButton={true}
          informationCards={[
            {
              title: "SL 2000",
              description:
                "É um sistema de painéis em aço, têm montagem fácil e rápida em qualquer geometria.",
            },
            {
              title: "Alu-L:",
              description:
                "estes são painéis com perfis de alumínio, movimentação manual ou mecanizada.",
            },
            {
              title: "Top Mills:",
              description:
                "é um sistema de painéis com estrutura em aço e movimentação mecanizada.",
            },
            {
              title: "Painel Aluma:",
              description:
                "é um painel montado com vigas Aluma, oferece excelente relação rigidez/peso.",
            },
            {
              title: "Fôrma Circular:",
              description:
                "essa é uma fôrma metálica que permite a concretagem de pilares de grandes diâmetros.",
            },
            {
              title: "Fôrma Trepante:",
              description:
                " um sistema para estruturas verticais de concreto, vários níveis de concretagem",
            },
            {
              title: "Mills Deck:",
              description:
                "é um sistema de fôrma para lajes composto por painéis modulares em alumínio.",
            },
          ]}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title || ""}
          description={content?.thirdAbout?.fields?.content_text || ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute || ""}
          theme="beige-200"
          hasButton={false}
          orientation="inverted"
        />

        <ShoringModels
          ids={content?.carouselProducts?.fields?.text_field || []}
          title={content?.carouselProducts?.fields?.title || ""}
        />
        {content?.differentials && (
          <AboutRental
            title="Por que alugar fôrmas e escoramentos para a sua empresa atuar em Serviços e Infraestrutura?"
            items={content?.differentials}
            theme="orange-500"
          />
        )}
        {content?.constructionCards && (
          <ConstructionSlideShow
            cards={content?.constructionCards}
            mobileTheme="beige-200"
          />
        )}
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Sanitation;
