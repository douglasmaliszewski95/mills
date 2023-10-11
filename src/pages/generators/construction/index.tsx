import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { About } from "@/components/shared/About/About";
import { ConstructionContent, ConstructionContentText } from "./types";
import { getImageSrc } from "@/utils/images";
import { GeneratorCarrousel } from "@/components/Category/GeneratorCarrousel/GeneratorCarrousel";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { SellParts } from "@/components/Category/SellParts/SellParts";
import { transformContentToMobile } from "@/utils/content";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { ImageCMS } from "@/types";
import { Banner } from "@/components/shared/Banner/Banner";
import { Card } from "../types";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { useRouter } from "next/router";
import { updateParagraphs } from "@/utils/texts";

const Construction = () => {
  const [content, setContent] = useState<ConstructionContent>();
  const [contentText, setContentText] = useState<ConstructionContentText>();
  const [isCompressors, setIsCompressors] = useState(false);
  const router = useRouter();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    updateParagraphs();
  }, [content, contentText]);

  const getContent = async () => {
    const contentAux = await getCMSContent("compressores_geradores_construcao");
    const contentShared = await getCMSContent("shared");

    const contentTextShared = await getCMSText("shared");
    const responsiveContent: any = isMobile
      ? transformContentToMobile(contentAux)
      : contentAux;
    const responsiveShared: any = isMobile
      ? transformContentToMobile(contentShared)
      : contentShared;

    const cards = responsiveShared["compressores_geradores"]
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

    const formattedContent = {
      ...transformCMSArrayToObject(
        responsiveContent?.["compressores_geradores"]
      ),
      banner: responsiveContent?.["banner-compressores_geradores"][0],
      cards,
    };

    const formattedText = {
      products: contentTextShared?.["rent_models_text"]?.[0],
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

  const baseAboutName = `${isMobile ? "m" : "d"}-compressor-construcao`;
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
              name: "Construção",
              href: `${
                isCompressors ? "compressores" : "/geradores"
              }/construcao`,
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
        <About
          title={secondAbout?.content_title || ""}
          description={secondAbout?.content_text || ""}
          image={getImageSrc(secondAbout)}
          alt={secondAbout?.alt_attribute || ""}
          orientation="inverted"
          theme="orange-500"
          color="white"
          hasButton={false}
        />
        <About
          title={thirdAbout?.content_title || ""}
          description={thirdAbout?.content_text || ""}
          image={getImageSrc(thirdAbout)}
          alt={thirdAbout?.alt_attribute || ""}
          hasButton={false}
          forceImageDisplayOnMobile
          dnaColor="#F37021"
        />
        <SellParts text={contentText?.sellParts} />
        <About
          title={fourthAbout?.content_title || ""}
          description={fourthAbout?.content_text || ""}
          image={getImageSrc(fourthAbout)}
          alt={fourthAbout?.alt_attribute || ""}
          orientation="inverted"
          theme="beige-200"
          hasButton={false}
        />
        {content?.cards && (
          <AboutRental
            title="Por que alugar compressores e geradores para a sua empresa atuar em Serviços e Infraestrutura?"
            items={content?.cards}
            theme="orange-500"
          />
        )}
        <GeneratorCarrousel
          title={contentText?.products?.fields?.title}
          description={contentText?.products?.fields?.subtitle}
          products={contentText?.products?.fields?.text_field ?? []}
          link={contentText?.products?.fields?.hrefButton}
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Construction;
