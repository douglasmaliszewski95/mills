import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useEffect, useState } from "react";
import { GeneratorsContent, GeneratorsTextContent } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { transformContentToMobile } from "@/utils/content";
import { Banner } from "@/components/shared/Banner/Banner";
import { getImageSrc } from "@/utils/images";
import { transformCMSArrayToObject } from "@/utils/transformCMSArrayToObject";
import { About } from "@/components/shared/About/About";
import { CollapsibleSpecs } from "@/components/Category/CollapsibleSpecs/CollapsibleSpecs";
import { Advantages } from "@/components/Category/Advantages/Advantages";
import { GeneratorCarrousel } from "@/components/Category/GeneratorCarrousel/GeneratorCarrousel";
import { Applications } from "@/components/Category/Applications/Applications";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { ImageCMS } from "@/types";

const Generators = () => {
  const [content, setContent] = useState<GeneratorsContent>();
  const [contentText, setContentText] = useState<GeneratorsTextContent | any>();
  const { isMobile } = useScreenWidth();

  const getContent = async () => {
    const contentAux: any = await getCMSContent("gerador_energia");
    const contentShared: any = await getCMSContent("shared");

    const contentTextAux = await getCMSText("gerador_energia");
    const contentTextShared = await getCMSText("shared");

    const responsiveContent = isMobile
      ? transformContentToMobile(contentAux)
      : contentAux;

    const responsiveContentShared = isMobile
      ? transformContentToMobile(contentShared)
      : contentShared;

    const formattedContent = {
      ...transformCMSArrayToObject(
        responsiveContent?.["geradores"].concat(
          responsiveContent?.["advantage_geradores"]
        )
      ),
      applications: responsiveContentShared?.["types_applications_generator"],
      banner: responsiveContent?.["banner_geradores"][0],
    };

    const formattedText = {
      ...contentTextAux,
      products: contentTextShared?.aluguel[0]?.fields?.["text_field"],
    };

    setContentText(formattedText);
    setContent(formattedContent);
  };

  useEffect(() => {
    if (isMobile !== undefined) {
      getContent();
    }
  }, [isMobile]);

  const baseAboutName = `${isMobile ? "m" : "d"}-gerador-energia-gerador`;
  const firstAbout = content?.[`${baseAboutName}01.jpg`]?.fields;
  const secondAbout = content?.[`${baseAboutName}02.jpg`]?.fields;
  const thirdAbout = content?.[`${baseAboutName}03.jpg`]?.fields;

  const baseCardName = `${isMobile ? "m" : "d"}-icon-gerador-`;
  const dieselCards = [
    { title: "version", icon: content?.[`${baseCardName}versao.svg`] },
    { title: "sizes", icon: content?.[`${baseCardName}tamanhos.svg`] },
    { title: "behaviour", icon: content?.[`${baseCardName}funcionamento.svg`] },
    { title: "places", icon: content?.[`${baseCardName}locais-uso.svg`] },
  ];

  const specsTitle =
    contentText?.["gerador_diesel"][0]?.fields?.["title"] || "";

  const specsText =
    contentText?.["gerador_diesel"][0]?.fields?.["text_field"][0] || "";

  const advantagesCards = [
    content?.[`${baseCardName}desempenho.svg`],
    content?.[`${baseCardName}rentabilidade.svg`],
    content?.[`${baseCardName}manutencao.svg`],
    content?.[`${baseCardName}duracao-motor.svg`],
    content?.[`${baseCardName}modelos-silenciosos.svg`],
    content?.[`${baseCardName}versatilidade.svg`],
  ];

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
              name: "Gerador de energia",
              href: "geradores",
            },
          ]}
        />
        <About
          title={firstAbout?.content_title ?? ""}
          description={firstAbout?.content_text ?? ""}
          image={firstAbout && getImageSrc(firstAbout)}
          alt={firstAbout?.alt_attribute ?? ""}
          link={firstAbout?.href_attribute ?? "#"}
          buttonTitle={firstAbout?.buttonText ?? "Ver Modelos"}
        />
        <CollapsibleSpecs
          title={specsTitle}
          text={specsText}
          cards={dieselCards}
        />
        <About
          title={secondAbout?.content_title ?? ""}
          description={secondAbout?.content_text ?? ""}
          image={secondAbout && getImageSrc(secondAbout)}
          alt={secondAbout?.alt_attribute ?? ""}
          hasButton={false}
          orientation="inverted"
          dnaColor="#ebe3c7"
        />
        {content?.applications && (
          <Applications
            title="Aplicações de gerador de energia:"
            cards={content?.applications}
          />
        )}
        <About
          title={thirdAbout?.content_title ?? ""}
          description={thirdAbout?.content_text ?? ""}
          image={thirdAbout && getImageSrc(thirdAbout)}
          alt={thirdAbout?.alt_attribute ?? ""}
          hasButton={false}
          forceImageDisplayOnMobile
        />
        <Advantages
          title="Vantagens do gerador de energia a diesel"
          cards={advantagesCards}
        />
        <GeneratorCarrousel
          title="Tipos de gerador de energia a diesel"
          description="Os geradores de energia a diesel podem ser classificados de acordo com a capacidade. Aqui, na Mills, estão disponíveis para locação diversos modelos, sendo todos apropriados para diversas aplicações, desde a geração emergencial até a geração contínua para localidades remotas"
          products={contentText?.products ?? []}
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Generators;
