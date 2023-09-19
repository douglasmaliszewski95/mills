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
import { Item } from "@/components/Category/AboutRental/types";
import { Slideshow } from "@/components/shared/Slideshow/Slideshow";
import { FrequentQuestions } from "@/components/Home/FrequentQuestions/FrequentQuestions";
import { SimpleInformation } from "@/components/shared/SimpleInformation/SimpleInformation";
import dnaBottom from "@/assets/colored-dna-bottom.svg";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";

function Shipping() {
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const differentialsAux = responsiveContent?.[
        "icon_differential_service"
      ]?.map((icon: ImageCMS) => ({
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
        responsiveContent?.["benefits_freight"]?.find(
          (image: Item) => image.description === "carrossel frete seguranca"
        ),
        responsiveContent?.["benefits_freight"]?.find(
          (image: Item) => image.description === "carrossel frete comodidade"
        ),
        responsiveContent?.["benefits_freight"]?.find(
          (image: Item) => image.description === "carrossel frete produtividade"
        ),
        responsiveContent?.["benefits_freight"]?.find(
          (image: Item) =>
            image.description === "carrossel frete sustentabilidade"
        ),
        responsiveContent?.["benefits_freight"]?.find(
          (image: Item) =>
            image.description === "carrossel frete expertise mills"
        ),
      ];

      const formattedData = {
        banner: responsiveContent?.["banner_service_freight"]?.[0],
        firstAbout: responsiveContent?.["service_freight"]?.[0],
        secondAbout: responsiveContent?.["national_coverage"]?.[0],
        differentials,
        aboutCarousel,
        simpleInformation: contentText?.["running_routine"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("frete");
        const contentText = await getText("frete");
        setContentBase({ contentAux, contentText });
        formatData({ contentAux, contentText });
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
          backgroundImage={
            content?.banner && getImageSrc(content?.banner?.fields)
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
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          orientation="inverted"
          hideImage={isMobile}
        />
        {content?.differentials && (
          <AboutRental
            title="Vantagens do aluguel de plataformas elevatórias"
            items={content?.differentials}
            theme="orange-500"
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
            description={content?.secondAbout?.fields?.content_subtitle ?? ""}
            image={getImageSrc(content?.secondAbout?.fields)}
            alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
            link={content?.secondAbout?.fields?.href_attribute ?? "#"}
            buttonTitle="Ver áreas de atuação"
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
      <Footer />
    </>
  );
}

export default Shipping;
