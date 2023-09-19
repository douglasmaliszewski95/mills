import { useEffect, useState } from "react";
import { InfrastructureContent, InfrastructureContentText } from "./types";
import { Header } from "@/components/shared/Header/Header";
import { Footer } from "@/components/shared/Footer/Footer";
import { About } from "@/components/shared/About/About";
import { getImageSrc } from "@/utils/images";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { transformContentToMobile } from "@/utils/content";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { ImageCMS } from "@/types";
import { Individuals } from "@/components/Category/Individuals/Individuals";
import { GeneratorCarrousel } from "@/components/Category/GeneratorCarrousel/GeneratorCarrousel";
import { SellParts } from "@/components/Category/SellParts/SellParts";
import { Banner } from "@/components/shared/Banner/Banner";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { Card } from "../types";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { useRouter } from "next/router";

const ServicesAndInfrastructure = () => {
  const [content, setContent] = useState<InfrastructureContent>();
  const [contentText, setContentText] = useState<InfrastructureContentText>();
  const [isCompressors, setIsCompressors] = useState(false);
  const router = useRouter();
  const { isMobile } = useScreenWidth();

  const getContent = async () => {
    const contentAux: any = await getCMSContent(
      "compressores_geradores_servicos_infraestrutura"
    );
    const contentShared: any = await getCMSContent("shared");

    const contentTextAux = await getCMSText(
      "compressores_geradores_servicos_infraestrutura"
    );

    const contentTextShared = await getCMSText("shared");

    const responsiveContent = isMobile
      ? transformContentToMobile(contentAux)
      : contentAux;
    const responsiveShared = isMobile
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
      banner: responsiveContent?.["banner_compressores_geradores"][0],
      cards,
    };

    const formattedText = {
      individuals: {
        text: contentTextAux?.["individuais"][0]?.fields?.title,
        textCards: contentTextAux?.["individuais"][0]?.fields?.text_field,
      },
      products: contentTextShared?.aluguel[0]?.fields?.["text_field"],
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

  const baseAboutName = `${
    isMobile ? "m" : "d"
  }-compressor-servicos-infraestrutura`;
  const firstAbout = content?.[`${baseAboutName}01.jpg`]?.fields;
  const secondAbout = content?.[`${baseAboutName}02.jpg`]?.fields;
  const thirdAbout = content?.[`${baseAboutName}03.jpg`]?.fields;

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
              name: "Serviços e Infraestrutura",
              href: `${
                isCompressors ? "compressores" : "/geradores"
              }/servicos-e-infraestrutura`,
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
        <Individuals
          cards={contentText?.individuals?.textCards || [""]}
          title={contentText?.individuals?.text || ""}
        />
        <About
          title={secondAbout?.content_title || ""}
          description={secondAbout?.content_text || ""}
          image={getImageSrc(secondAbout)}
          alt={secondAbout?.alt_attribute || ""}
          orientation="inverted"
          hasButton={false}
          dnaColor="#004042"
          dnaWidth="400"
        />
        <SellParts text={contentText?.sellParts} />
        <About
          title={thirdAbout?.content_title || ""}
          description={thirdAbout?.content_text || ""}
          image={getImageSrc(thirdAbout)}
          alt={thirdAbout?.alt_attribute || ""}
          hasButton={false}
          theme="beige-200"
          forceImageDisplayOnMobile
        />
        {content?.cards && (
          <AboutRental
            title="Por que alugar compressores e geradores para a sua empresa atuar em Serviços e Infraestrutura?"
            items={content?.cards}
            theme="orange-500"
          />
        )}
        <GeneratorCarrousel
          title="A Mills oferece o aluguel de compressores e geradores, de modo a otimizar o tempo da sua equipe de funcionários, diminuir a sua preocupação quanto a manutenções e ser uma opção mais viável financeiramente."
          products={contentText?.products || [""]}
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default ServicesAndInfrastructure;
