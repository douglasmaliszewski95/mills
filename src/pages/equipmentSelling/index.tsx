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
import { SellParts } from "@/components/Category/SellParts/SellParts";
import { AboutSmallImage } from "@/components/AboutSmallImage/AboutSmallImage";
import { updateParagraphs } from "@/utils/texts";
import { ShoringModels } from "@/components/formworkAndShoring/ShoringModels/ShoringModels";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";

function EquipmentSelling() {
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isDesktop, isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const advantagesAux = responsiveContent?.["icon_sale_equipment"]?.map(
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
          (icon: ImageCMS) => icon.id === "icon venda equipamentos variedade"
        ),
        advantagesAux?.find(
          (icon: ImageCMS) => icon.id === "icon venda equipamentos customizada"
        ),
        advantagesAux?.find(
          (icon: ImageCMS) =>
            icon.id === "icon venda equipamentos inspecao anual"
        ),
        advantagesAux?.find(
          (icon: ImageCMS) =>
            icon.id === "icon venda equipamentos controle qualidade"
        ),
        advantagesAux?.find(
          (icon: ImageCMS) =>
            icon.id === "icon venda equipamentos assessoria tecnica"
        ),
        advantagesAux?.find(
          (icon: ImageCMS) => icon.id === "icon venda equipamentos manutencao"
        ),
      ];

      const formattedData = {
        banner: responsiveContent?.["banner_venda_equipamentos"]?.[0],
        firstAbout: responsiveContent?.["venda_equipamentos"]?.find(
          ({ description }: ImageCMS) => description === "venda equipamentos01"
        ),
        secondAbout: responsiveContent?.["venda_equipamentos"]?.find(
          ({ description }: ImageCMS) => description === "venda equipamentos02"
        ),
        thirdAbout: responsiveContent?.["venda_equipamentos"]?.find(
          ({ description }: ImageCMS) => description === "venda equipamentos03"
        ),
        fourthAbout: responsiveContent?.["venda_equipamentos"]?.find(
          ({ description }: ImageCMS) => description === "venda equipamentos04"
        ),
        fifthAbout: responsiveContent?.["venda_equipamentos"]?.find(
          ({ description }: ImageCMS) => description === "venda equipamentos05"
        ),
        sixthAbout: responsiveContent?.["venda_equipamentos"]?.find(
          ({ description }: ImageCMS) => description === "venda equipamentos06"
        ),
        seventhAbout: responsiveContent?.["logo_brand_sale"]?.[0],
        eighthAbout: responsiveContent?.["fale_especialista"]?.[0],
        advantages,
        equipments: contentText?.["buy_new_equipment"]?.[0],
        knowMore: contentText?.["know_more_lifting"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const [
          contentAux,
          contentText
        ]: any = await Promise.all([
          getCMSContent("venda_equipamentos"),
          getText("venda_equipamentos")
        ]);        
        setContentBase({ contentAux, contentText });
        formatData({ contentAux, contentText });
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

  useEffect(() => {
    updateParagraphs();
  }, [contentBase, content]);

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
              name: "Venda de equipamentos",
              href: "/vendas-de-maquinas",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          textFullLength
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver modelos"}
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
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          forceImageDisplayOnMobile
          link={content?.thirdAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.thirdAbout?.fields?.buttonText ?? "Ver modelos"}
        />
        <About
          title={content?.fourthAbout?.fields?.content_title ?? ""}
          description={content?.fourthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fourthAbout?.fields)}
          alt={content?.fourthAbout?.fields?.alt_attribute ?? ""}
          link={content?.fourthAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={
            content?.fourthAbout?.fields?.buttonText ?? "Ver modelos"
          }
          orientation="inverted"
          theme="green-800"
          color="white"
        />
        <About
          title={content?.fifthAbout?.fields?.content_title ?? ""}
          description={content?.fifthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fifthAbout?.fields)}
          alt={content?.fifthAbout?.fields?.alt_attribute ?? ""}
          link={content?.fifthAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.fifthAbout?.fields?.buttonText ?? "Ver modelos"}
          forceImageDisplayOnMobile
        />
        <About
          title={content?.sixthAbout?.fields?.content_title ?? ""}
          description={content?.sixthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.sixthAbout?.fields)}
          alt={content?.sixthAbout?.fields?.alt_attribute ?? ""}
          link={content?.sixthAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.sixthAbout?.fields?.buttonText ?? "Ver modelos"}
          orientation="inverted"
          theme="gray-200"
        />
        <SellParts
          text={content?.knowMore?.fields?.title}
          buttonTitle="Saiba mais"
          buttonVariant="inverted"
          href={content?.knowMore?.fields?.hrefButton?.[0] ?? ""}
        />
        {content?.advantages && (
          <AboutRental
            title="Adquira seus equipamentos com a Mills"
            description="Temos uma equipe especializada na venda de equipamentos novos e seminovos, como as plataformas elevatórias, compressores e geradores. Todos os equipamentos possuem manutenção em dia e passam por um rigoroso processo de qualidade, que atesta e garante o pleno funcionamento do equipamento."
            items={content?.advantages}
            theme="white"
            textColor="green-800"
            iconFont="base"
            hasDna={false}
            largeDescription={isDesktop}
            forceTitleDisplay
          />
        )}
        <AboutSmallImage
          title={content?.seventhAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.seventhAbout?.fields)}
          alt={content?.seventhAbout?.fields?.alt_attribute ?? ""}
        />
        <ShoringModels
          ids={content?.equipments?.fields?.text_field ?? []}
          title={content?.equipments?.fields?.title ?? ""}
          cardText="Incluir no orçamento"
          theme="white"
          buttonTitle={content?.equipments?.fields?.buttonText?.[0] ?? ""}
          href={content?.equipments?.fields?.hrefButton?.[0] ?? ""}
        />
        <About
          title={content?.eighthAbout?.fields?.content_title ?? ""}
          description={content?.eighthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.eighthAbout?.fields)}
          alt={content?.eighthAbout?.fields?.alt_attribute ?? ""}
          link={content?.eighthAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={
            content?.eighthAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          forceImageDisplayOnMobile
          theme="orange-500"
          color="white"
          isTalkToSpecialist
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default EquipmentSelling;
