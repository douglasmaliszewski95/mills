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
import { transformContentToMobile } from "@/utils/content";
import { Item } from "@/components/Category/AboutRental/types";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { SellParts } from "@/components/Category/SellParts/SellParts";
import { AboutSmallImage } from "@/components/AboutSmallImage/AboutSmallImage";
import { ShoringModels } from "@/components/formworkAndShoring/ShoringModels/ShoringModels";
import { MultipleBrands } from "@/components/Parts/MultipleBrands/MultipleBrands";

function Parts() {
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const abouts = responsiveContent?.["venda_pecas"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const differentialsAux = responsiveContent?.["icon_sale_parts"]?.map(
        (icon: ImageCMS) => ({
          id: icon?.description,
          title: icon?.fields?.content_title,
          description: icon?.fields?.content_text,
          alt: icon?.fields?.alt_attribute,
          image: getImageSrc(icon?.fields),
        })
      );

      const differentials = [
        differentialsAux?.find(
          (icon: Item) => icon.id === "icon venda de pecas manual"
        ),
        differentialsAux?.find(
          (icon: Item) => icon.id === "icon venda de pecas orientacao"
        ),
        differentialsAux?.find(
          (icon: Item) => icon.id === "icon venda de pecas avaliacao"
        ),
        differentialsAux?.find(
          (icon: Item) => icon.id === "icon venda de pecas garantia"
        ),
        differentialsAux?.find(
          (icon: Item) =>
            icon.id === "icon venda de pecas profissionais capacitados"
        ),
      ];

      const brands = [
        responsiveContent?.["logo_brands_consolidated"]?.find(
          (image: ImageCMS) =>
            image?.description === "logo brand venda de pecas JLG"
        ),
        responsiveContent?.["logo_brands_consolidated"]?.find(
          (image: ImageCMS) =>
            image?.description === "logo brand venda de pecas genie"
        ),
        responsiveContent?.["logo_brands_consolidated"]?.find(
          (image: ImageCMS) =>
            image?.description === "logo brand venda de pecas skyjack"
        ),
        responsiveContent?.["logo_brands_consolidated"]?.find(
          (image: ImageCMS) =>
            image?.description === "logo brand venda de pecas haulotte"
        ),
      ];

      const formattedData = {
        banner: responsiveContent?.["banner_venda_pecas"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        thirdAbout: abouts?.[2],
        fourthAbout: abouts?.[3],
        fifthAbout: abouts?.[4],
        aboutSmallImage: responsiveContent?.["logo_brands_consolidated"]?.find(
          (image: ImageCMS) =>
            image?.description === "logo brand venda de pecas sullair"
        ),
        brands,
        brandsText: contentText?.["consolidated_brands_text"]?.[0],
        compressorParts: contentText?.["compressor_parts_text"]?.[0],
        expertRecommendation: responsiveContent?.["fale_especialista"]?.[0],
        platformParts: contentText?.["platform_parts_text"]?.[0],
        differentials,
        orangeInformation: contentText?.["used_platforms_text"]?.[0],
        greenInformation: contentText?.["original_parts_text"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("venda_pecas");
        const contentText = await getText("venda_pecas");
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
              name: "Venda de peças",
              href: "/pecas",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver peças"}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          orientation="inverted"
          theme="green-800"
          color="white"
          dnaColor="#ffffff"
        />
        {content?.differentials && (
          <AboutRental
            title="Ao escolher a Mills como fornecedor de peças para plataformas elevatórias, você terá"
            items={content?.differentials}
            theme="white"
            textColor="green-800"
          />
        )}
        <SellParts
          buttonTitle="Saiba mais"
          buttonVariant="inverted"
          text={content?.greenInformation?.fields?.title}
        />
        <ShoringModels
          ids={content?.platformParts?.fields?.text_field ?? []}
          title={content?.platformParts?.fields?.title ?? ""}
          cardText="Incluir no orçamento"
          theme="white"
          buttonTitle="Ver todas"
        />
        {content?.brands && (
          <MultipleBrands
            brands={content.brands}
            title={content?.brandsText?.fields?.title ?? ""}
            subtitle={content?.brandsText?.fields?.text_field?.[0] ?? ""}
          />
        )}
        <ShoringModels
          ids={content?.compressorParts?.fields?.text_field ?? []}
          title={content?.compressorParts?.fields?.title ?? ""}
          cardText="Incluir no orçamento"
          textOnCenter
          theme="white"
          buttonTitle="Ver todas"
        />
        <AboutSmallImage
          title={content?.aboutSmallImage?.fields?.content_text ?? ""}
          image={getImageSrc(content?.aboutSmallImage?.fields)}
          alt={content?.aboutSmallImage?.fields?.alt_attribute ?? ""}
        />
        <SellParts
          buttonTitle="Saiba mais"
          buttonVariant="inverted"
          theme="orange-500"
          text={content?.orangeInformation?.fields?.title}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          forceImageDisplayOnMobile
        />
        <About
          title={content?.fourthAbout?.fields?.content_title ?? ""}
          description={content?.fourthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fourthAbout?.fields)}
          alt={content?.fourthAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          orientation="inverted"
          theme="orange-500"
          color="white"
          dnaColor="#ffffff"
        />
        <About
          title={content?.fifthAbout?.fields?.content_title ?? ""}
          description={content?.fifthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fifthAbout?.fields)}
          alt={content?.fifthAbout?.fields?.alt_attribute ?? ""}
          link={content?.fifthAbout?.fields?.href_attribute ?? "#"}
          buttonTitle="Saiba mais"
          forceImageDisplayOnMobile
        />
        <About
          title={content?.expertRecommendation?.fields?.content_title ?? ""}
          description={
            content?.expertRecommendation?.fields?.content_text ?? ""
          }
          image={getImageSrc(content?.expertRecommendation?.fields)}
          alt={content?.expertRecommendation?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          theme="green-800"
          color="white"
          buttonTitle="Fale com um especialista"
          buttonVariant="inverted"
        />
      </main>
      <Footer />
    </>
  );
}

export default Parts;
