import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useEffect, useState } from "react";

import useScreenWidth from "@/services/hooks/useScreenWidth";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { About } from "@/components/shared/About/About";
import { CompressorsContent, CompressorsContentText } from "./types";
import { getImageSrc } from "@/utils/images";
import { GeneratorCarrousel } from "@/components/Category/GeneratorCarrousel/GeneratorCarrousel";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { transformContentToMobile } from "@/utils/content";
import { Banner } from "@/components/shared/Banner/Banner";
import { Applications } from "@/components/Category/Applications/Applications";
import { Advantages } from "@/components/Category/Advantages/Advantages";
import { MainApplications } from "@/components/Category/MainApplications/MainApplications";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { updateParagraphs } from "@/utils/texts";

const Compressors = () => {
  const [content, setContent] = useState<CompressorsContent>();
  const [contentText, setContentText] = useState<CompressorsContentText>();
  const { isMobile } = useScreenWidth();

  const getContent = async () => {
    const [
      contentAux,
      contentShared,
      contentTextShared,
      contentTextAux
    ]: any = await Promise.all([
      getCMSContent("compressores_ar"),
      getCMSContent("shared"),
      getCMSText("shared"),
      getCMSText("compressores_ar")
    ]);

    const responsiveContent: any = isMobile
      ? transformContentToMobile(contentAux)
      : contentAux;
    const responsiveShared: any = isMobile
      ? transformContentToMobile(contentShared)
      : contentShared;

    const formattedContent = {
      ...transformCMSArrayToObject(responsiveContent?.["compressores_ar"]),
      banner: responsiveContent?.["banner_compressores"][0],
      applications: responsiveShared?.["types_applications_generator"],
    };

    const formattedText = {
      products: contentTextAux?.["rent_text"]?.[0],
      sellParts: contentTextShared?.["vendemos_pecas"][0]?.fields?.["title"],
    };

    setContentText(formattedText);
    setContent(formattedContent);
  };

  useEffect(() => {
    if (isMobile !== undefined) {
      getContent();
    }
  }, [isMobile]);

  const baseAboutName = `${isMobile ? "m" : "d"}-compressor-compressor`;
  const firstAbout = content?.[`${baseAboutName}01.jpg`]?.fields;
  const secondAbout = content?.[`${baseAboutName}02.jpg`]?.fields;

  const baseCardName = `${isMobile ? "m" : "d"}-icon-compressor-vantagens`;
  const advantagesCards = [
    content?.[`${baseCardName}01.svg`],
    content?.[`${baseCardName}02.svg`],
    content?.[`${baseCardName}03.svg`],
    content?.[`${baseCardName}04.svg`],
  ];

  const baseMainApplicationName = `${
    isMobile ? "m" : "d"
  }-compressor-servicos-`;
  const mainApplicationCards = [
    content?.[`${baseMainApplicationName}ordinarios.jpg`],
    content?.[`${baseMainApplicationName}industriais.jpg`],
  ];

  useEffect(() => {
    updateParagraphs();
  }, [content, contentText]);

  return (
    <>
      <Header />
      <main>
        <Banner
          backgroundImage={
            content?.banner && getImageSrc(content?.banner?.fields)
          }
          title={content?.banner?.fields?.content_title || ""}
          linkList={[
            {
              name: "Compressores de ar",
              href: "/compressores",
            },
          ]}
        />
        <About
          title={firstAbout?.content_title || ""}
          description={firstAbout?.content_text || ""}
          image={getImageSrc(firstAbout)}
          alt={firstAbout?.alt_attribute || ""}
          link={firstAbout?.href_attribute ?? "#"}
          buttonTitle={firstAbout?.buttonText ?? "Ver modelos"}
        />
        <MainApplications
          title="Principais aplicações dos compressores"
          cards={mainApplicationCards}
        />
        {content?.applications && (
          <Applications
            title="Segmentos do compresssor:"
            cards={content?.applications}
          />
        )}
        <About
          title={secondAbout?.content_title || ""}
          description={secondAbout?.content_text || ""}
          image={getImageSrc(secondAbout)}
          alt={secondAbout?.alt_attribute || ""}
          orientation="inverted"
          hasButton={false}
          dnaColor="#ebe3c7"
        />
        <Advantages
          title="Vantagens dos compressores"
          cards={advantagesCards}
          theme="beige-200"
        />
        <GeneratorCarrousel
          title={contentText?.products?.fields?.title}
          products={contentText?.products?.fields?.text_field ?? []}
          link={contentText?.products?.fields?.hrefButton ?? "#"}
          hasDna
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Compressors;
