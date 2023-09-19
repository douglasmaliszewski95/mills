import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { Slideshow } from "@/components/shared/Slideshow/Slideshow";
import { SimpleInformation } from "@/components/shared/SimpleInformation/SimpleInformation";
import { FrequentQuestions } from "@/components/Home/FrequentQuestions/FrequentQuestions";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Item } from "@/components/Category/AboutRental/types";
import { getImageSrc } from "@/utils/images";
import { getText } from "@/services/hooks/getText";
import dnaBottom from "@/assets/colored-dna-bottom.svg";
import _ from "lodash";
import { getImage } from "@/services/hooks/getImage";
import SearchCMS from "@/dtos/SearchCMS";

export default function Freight() {
  const [content, setContent] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getContent = useCallback(async () => {
    const images = await getImage("frete");
    const imagesHeavy = await getImage("frete_pesados");
    const texts =await getText("frete");

    const differentialsAux = images?.[
      "icon_differential_service"
    ]?.map((icon: SearchCMS) => ({
      id: icon?.description,
      title: icon?.fields?.content_title,
      description: icon?.fields?.content_text,
      alt: icon?.fields?.alt_attribute,
      image: getImageSrc(icon?.fields),
    }));

    const differentials = [
      differentialsAux?.find(
        (icon: Item) => icon.id === "icon frete diferenciais descontos"
      ),
      differentialsAux?.find(
        (icon: Item) => icon.id === "icon frete diferenciais rastreabilidade"
      ),
      differentialsAux?.find(
        (icon: Item) => icon.id === "icon frete diferenciais seguranca carga"
      ),
    ];

    const aboutCarousel = [
      imagesHeavy?.["heavy_machinery_benefits_freight"]?.find(
        (image: SearchCMS) => image.description === "maquinas pesadas carrosel frete"
      ),
      images?.["benefits_freight"]?.find(
        (image: SearchCMS) => image.description === "carrossel frete comodidade"
      ),
      images?.["benefits_freight"]?.find(
        (image: SearchCMS) => image.description === "carrossel frete produtividade"
      ),
      images?.["benefits_freight"]?.find(
        (image: SearchCMS) =>
          image.description === "carrossel frete sustentabilidade"
      ),
      images?.["benefits_freight"]?.find(
        (image: SearchCMS) =>
          image.description === "carrossel frete expertise mills"
      ),
    ];

    const formattedData = {
      banner: imagesHeavy?.["banner_heavy_machinery_freight"]?.[0],
      firstAbout: imagesHeavy?.["heavy_machinery_service_freight"]?.[0],
      secondAbout: imagesHeavy?.["heavy_machinery_freight_map"]?.[0],
      differentials,
      aboutCarousel,
      simpleInformation: texts?.["running_routine"]?.[0],
    };
    setContent(formattedData);
  },
    [isMobile]
  );

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header theme="rentalHeavy" />
      <main className="h-full bg-white w-full">
        <Banner
          backgroundImage={
            isMobile ? content?.banner?.fields.native.links[0].href : content?.banner?.mobileObj?.fields.native.links[0].href
          }
          title={content?.banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: "Frete",
              href: "/frete",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          buttonTitle={content?.firstAbout?.fields?.button_text ?? ""}
          orientation="inverted"
          hideImage={isMobile}
        />
        {content?.differentials && (
          <AboutRental
            title="Diferenciais do nosso serviço"
            items={content?.differentials}
          />
        )}
        {content?.aboutCarousel && (
          <Slideshow
            title="A gestão do seu transporte agora é com a gente e, com isso, você ganha muitos benefícios:"
            slides={content?.aboutCarousel}
          />
        )}
        <SimpleInformation
          text={content?.simpleInformation?.fields?.text_field?.[0] ?? ""}
        />
        <div className="relative tablet:pb-16">
          <About
            title={content?.secondAbout?.fields?.content_title ?? ""}
            description={content?.secondAbout?.fields?.content_text ?? ""}
            image={getImageSrc(content?.secondAbout?.fields)}
            buttonTitle="Ver áreas de atuação"
            alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
            imagePadding="pt-8 pb-2"
            forceImageDisplayOnMobile
          />
          <div className="absolute left-0 bottom-3">
            <img src={dnaBottom.src} />
          </div>
        </div>
        <FrequentQuestions />
        <MachinesAndPlatforms />
      </main>
      <Footer theme="rentalHeavy" />
    </>
  );
}