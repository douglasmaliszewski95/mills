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
import { InfiniteCards } from "@/components/Rental/InfiniteCards/InfiniteCards";
import { DifferentPages } from "@/components/Rental/DifferentPages/DifferentPages";

function PlatformRental() {
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveText = isMobile
        ? transformContentToMobile(contentText)
        : contentText;

      const advantagesAux = responsiveContent?.["icon_advantage_rent"]?.map(
        (icon: ImageCMS) => ({
          id: icon?.description,
          title: icon?.fields?.content_title,
          description: icon?.fields?.content_text,
          alt: icon?.fields?.alt_attribute,
          image: getImageSrc(icon?.fields),
        })
      );

      const advantages = [
        advantagesAux?.find(
          (icon: Item) =>
            icon.id === "icon aluguel equipamentos assistencia tecnica"
        ),
        advantagesAux?.find(
          (icon: Item) => icon.id === "icon aluguel equipamentos reposicao"
        ),
        advantagesAux?.find(
          (icon: Item) =>
            icon.id === "icon aluguel equipamentos disponibilidade"
        ),
        advantagesAux?.find(
          (icon: Item) => icon.id === "icon aluguel equipamentos economia"
        ),
      ];

      const formattedData = {
        banner: responsiveContent?.["banner_equipment_rental"]?.[0],
        firstAbout: responsiveContent?.["aluguel_equipamentos"]?.find(
          ({ description }: ImageCMS) =>
            description === "aluguel equipamentos01"
        ),
        secondAbout: responsiveContent?.["aluguel_equipamentos"]?.find(
          ({ description }: ImageCMS) =>
            description === "aluguel equipamentos02"
        ),
        thirdAbout: responsiveContent?.["aluguel_equipamentos"]?.find(
          ({ description }: ImageCMS) =>
            description === "aluguel equipamentos03"
        ),
        fourthAbout: responsiveContent?.["aluguel_equipamentos"]?.find(
          ({ description }: ImageCMS) =>
            description === "aluguel equipamentos04"
        ),
        fifthAbout: responsiveContent?.["fale_especialista"]?.[0],
        advantages,
        pages: responsiveContent?.["platform_rental"],
        howRent: responsiveText?.["how_rent"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("aluguel_equipamentos");
        const contentText = await getText("aluguel_equipamentos");
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
              name: "Aluguel de equipamentos",
              href: "/aluguel-de-plataformas-elevatorias",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          orientation="inverted"
          theme="orange-500"
          color="white"
          dnaColor="#ffffff"
        />
        {content?.advantages && (
          <AboutRental
            title="Vantagens do aluguel de plataformas elevatórias"
            items={content?.advantages}
            theme="white"
            textColor="green-800"
          />
        )}
        <InfiniteCards
          title={content?.howRent?.fields?.title ?? ""}
          description={content?.howRent?.fields?.text_field?.[0] ?? ""}
          cards={content?.howRent?.fields?.subtitle ?? []}
        />
        {content?.pages && <DifferentPages cards={content?.pages} />}
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          link={content?.thirdAbout?.fields?.href_attribute ?? "#"}
          theme="beige-200"
          buttonTitle="Ver mapa de atuação"
          forceImageDisplayOnMobile
        />
        <About
          title={content?.fourthAbout?.fields?.content_title ?? ""}
          description={content?.fourthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fourthAbout?.fields)}
          alt={content?.fourthAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          orientation="inverted"
          theme="green-800"
          color="white"
        />
        <About
          title={content?.fifthAbout?.fields?.content_title ?? ""}
          description={content?.fifthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fifthAbout?.fields)}
          alt={content?.fifthAbout?.fields?.alt_attribute ?? ""}
          buttonTitle="Fale com um especialista"
          forceImageDisplayOnMobile
        />
      </main>
      <Footer />
    </>
  );
}

export default PlatformRental;
