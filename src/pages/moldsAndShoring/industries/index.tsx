import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { IndustriesContent } from "./types";
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
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { Item } from "@/components/Category/AboutRental/types";

function Industries() {
  const [content, setContent] = useState<IndustriesContent>();
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
      const secondAbout = responsiveContent?.["formas-e-escoramentos"]?.find(
        (image: ImageCMS) =>
          image?.description === "formas escoramentos industria02"
      );

      const formattedData = {
        banner: responsiveContent?.["banner_formas_escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "banner formas escoramentos industria"
        ),
        firstAbout: responsiveContent?.["formas-e-escoramentos"]?.find(
          (image: ImageCMS) =>
            image?.description === "formas escoramentos industria01"
        ),
        secondAbout:
          isMobile && secondAbout?.mobileObj
            ? secondAbout?.mobileObj
            : secondAbout,
        differentials,
        constructionCards,
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent(
          "formas-escoramentos-industrias"
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
            {
              name: "Indústria e evento",
              href: "formas-e-escoramentos/industria",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver modelos"}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          textFullLength
          hasButton={false}
          orientation="inverted"
          theme="orange-500"
          color="white"
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
            mobileTheme="beige-200"
          />
        )}
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Industries;
