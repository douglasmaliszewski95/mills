import { useEffect, useState } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { About } from "@/components/shared/About/About";
import { IndustriesContent, TextContent } from "./types";
import { getImageSrc } from "@/utils/images";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { ImageCMS } from "@/types";
import { Banner } from "@/components/shared/Banner/Banner";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { transformContentToMobile } from "@/utils/content";
import _ from "lodash";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { GeneratorCarrousel } from "@/components/Category/GeneratorCarrousel/GeneratorCarrousel";
import { SellParts } from "@/components/Category/SellParts/SellParts";
import { Card } from "../types";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { useRouter } from "next/router";
import { updateParagraphs } from "@/utils/texts";

const Generators: React.FC = () => {
  const [content, setContent] = useState<IndustriesContent>();
  const [textContent, setTextContent] = useState<TextContent>();
  const [isCompressors, setIsCompressors] = useState(false);
  const router = useRouter();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    updateParagraphs();
  }, [content, textContent]);

  const getContent = async () => {
    const contentAux: any = await getCMSContent(
      "compressores_geradores_industria"
    );
    const contentTextShared = await getCMSText("shared");

    const responsiveContent = isMobile
      ? transformContentToMobile(contentAux)
      : contentAux;

    const text = await getCMSText("shared");

    const formattedText = {
      products: contentTextShared?.["rent_models_text"]?.[0],
      sellParts: contentTextShared?.["vendemos_pecas"][0]?.fields?.["title"],
      link: contentTextShared?.["vendemos_pecas"][0]?.fields?.hrefButton[0]
    };

    const sharedContent: any = await getCMSContent("shared");

    const responsiveShared = isMobile
      ? transformContentToMobile(sharedContent)
      : sharedContent;

    const aboutRentalCards = responsiveShared?.["compressores_geradores"];

    const cards = aboutRentalCards
      ?.map((image: ImageCMS, index: number) => {
        return {
          id: index,
          title: image.fields.content_title,
          description: image.fields.content_text,
          image: getImageSrc(image.fields),
          alt: image.fields.alt_attribute,
          position: image.fields.content_order,
        };
      })
      .sort((current: Card, next: Card) => current?.position - next?.position);

    setContent({
      ...transformCMSArrayToObject(responsiveContent?.compressores_geradores),
      banner: responsiveContent?.["banner-compressores_geradores"][0],
      cards,
    });
    setTextContent(formattedText);
  };

  useEffect(() => {
    if (isMobile !== undefined) {
      getContent();
    }
  }, [getCMSContent, isMobile]);

  const baseAboutName = `${
    isMobile ? "m" : "d"
  }-compressor-compressores-na-industria`;
  const firstAbout = content?.[`${baseAboutName}01.jpg`]?.fields;
  const secondAbout = content?.[`${baseAboutName}02.jpg`]?.fields;
  const thirdAbout = content?.[`${baseAboutName}03.jpg`]?.fields;
  const fourthAbout = content?.[`${baseAboutName}04.jpg`]?.fields;

  useEffect(() => {
    const url = router.asPath.split("/");
    const collection = url ? url[url.length - 2] : "";
    setIsCompressors(collection === "compressores");
  }, [router]);

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
              name: isCompressors ? "Compressores" : "Geradores",
              href: isCompressors ? "/compressores" : "/geradores",
            },
            {
              name: "Indústrias",
              href: `${
                isCompressors ? "compressores" : "/geradores"
              }/industrias}`,
            },
          ]}
        />
        <About
          title={firstAbout?.content_title || ""}
          description={firstAbout?.content_text || ""}
          image={firstAbout && getImageSrc(firstAbout)}
          alt={firstAbout?.alt_attribute || ""}
          link={firstAbout?.href_attribute ?? "#"}
          buttonTitle={firstAbout?.buttonText ?? "Ver modelos"}
        />
        <About
          title={secondAbout?.content_title || ""}
          description={secondAbout?.content_text || ""}
          image={secondAbout && getImageSrc(secondAbout)}
          alt={secondAbout?.alt_attribute || ""}
          orientation="inverted"
          theme="orange-500"
          color="white"
          hasButton={false}
        />
        <About
          title={thirdAbout?.content_title || ""}
          description={thirdAbout?.content_text || ""}
          image={thirdAbout && getImageSrc(thirdAbout)}
          alt={thirdAbout?.alt_attribute || ""}
          hasButton={false}
          forceImageDisplayOnMobile
        />
        <SellParts text={textContent?.sellParts} href={textContent?.link} />
        <About
          title={fourthAbout?.content_title || ""}
          description={fourthAbout?.content_text || ""}
          image={fourthAbout && getImageSrc(fourthAbout)}
          alt={fourthAbout?.alt_attribute || ""}
          hasButton={false}
          orientation="inverted"
        />
        {content?.cards && (
          <AboutRental
            title="Por que alugar compressores e geradores para a sua empresa atuar em Serviços e Infraestrutura?"
            items={content?.cards}
            theme="orange-500"
          />
        )}
        {!_.isEmpty(textContent?.products) && (
          <GeneratorCarrousel
            title={textContent?.products?.fields?.title}
            description={textContent?.products?.fields?.subtitle}
            products={textContent?.products?.fields?.text_field ?? []}
            link={textContent?.products?.fields?.hrefButton}
          />
        )}
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Generators;
