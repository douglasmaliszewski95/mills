import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { TransportContent } from "./types";
import _ from "lodash";
import { getText } from "@/services/hooks/getText";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Banner } from "@/components/shared/Banner/Banner";
import { ImageCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { About } from "@/components/shared/About/About";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { transformContentToMobile } from "@/utils/content";
import { ConstructionSlideShow } from "@/components/Category/ConstructionSlideShow/ConstructionSlideShow";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Item } from "@/components/Category/AboutRental/types";
import { updateParagraphs } from "@/utils/texts";
import { CustomExpertRecommendation } from "@/components/shared/CustomExpertRecommendation/CustomExpertRecommendation";

function Sanitation() {
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentSharedAux }: any) => {
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

      const differentialsAux = responsiveShared[
        "icon_formas_e_escoramentos"
      ].map((icon: ImageCMS) => ({
        id: icon?.description,
        title: icon?.fields?.content_title,
        description: icon?.fields?.content_text,
        alt: icon?.fields?.alt_attribute,
        image: getImageSrc(icon?.fields),
      }));

      const differentials = [
        differentialsAux.find(
          (icon: Item) =>
            icon.id === "icon formas escoramentos eficiencia verde"
        ),
        differentialsAux.find(
          (icon: Item) =>
            icon.id === "icon formas escoramentos diversidade verde"
        ),
        differentialsAux.find(
          (icon: Item) =>
            icon.id === "icon formas escoramentos produtividade verde"
        ),
        differentialsAux.find(
          (icon: Item) =>
            icon.id === "icon formas escoramentos investimento verde"
        ),
      ];

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
            image?.description ===
            "banner formas escoramentos transporte mobilidade"
        ),
        firstAbout: responsiveContent?.["formas-e-escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "formas escoramentos transporte mobilidade01"
        ),
        differentials,
        constructionCards,
        talkToSpecialist: responsiveContent?.["banner_especialista"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent(
          "formas-escoramentos-transporte-e-mobilidade"
        );
        const contentSharedAux = await getCMSContent("shared");
        const contentText = await getText("formas_e_escoramentos");
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
          title={content?.banner?.fields?.content_title || ""}
          backgroundImage={getImageSrc(content?.banner?.fields)}
          linkList={[
            {
              name: "Fôrmas e escoramentos",
              href: "formas-e-escoramentos",
            },
            {
              name: "Transporte e Mobilidade",
              href: "formas-e-escoramentos/transportes-e-mobilidade",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title || ""}
          description={content?.firstAbout?.fields?.content_text || ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute || ""}
          orientation="inverted"
          hideImage={isMobile}
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver modelos"}
        />
        <About
          type="carousel"
          theme="beige-200"
          title="Principais fôrmas e escoramentos usados em Transportes e Mobilidades"
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
          description="As obras no segmento Transportes e Mobilidades exigem um cuidado maior nos serviços e execução dos projetos, e com isso surge a necessidade de investir em equipamentos específicos. Um exemplo de estruturas que você precisa são as fôrmas e escoramentos, contribuindo para a segurança e perfeita execução da obra. Essas estruturas podem ajudar na construção de túneis, pontes e viadutos, por exemplo."
        />
        {content?.differentials && (
          <AboutRental
            title="Por que alugar fôrmas e escoramentos para a sua empresa atuar em Serviços e Infraestrutura?"
            items={content?.differentials}
            theme="white"
            textColor="green-800"
          />
        )}
        {content?.constructionCards && (
          <ConstructionSlideShow
            cards={content?.constructionCards}
            mobileTheme="orange-500"
            theme="orange-500"
          />
        )}
        <CustomExpertRecommendation content={content?.talkToSpecialist} />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Sanitation;
