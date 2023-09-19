import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Banner } from "@/components/shared/Banner/Banner";
import { ImageCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { About } from "@/components/shared/About/About";
import { transformContentToMobile } from "@/utils/content";
import { ShovelLoaderContent } from "./types";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { AboutWrapCards } from "@/components/shared/AboutWrapCards/AboutWrapCards";
import { getText } from "@/services/hooks/getText";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { HeavyMachinesCarousel } from "@/components/HeavyMachines/HeavyMachinesCarousel/HeavyMachinesCarousel";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import { InformationWithLines } from "@/components/HeavyMachines/InformationWithLines/InformationWithLines";

function ShovelLoader() {
  const [content, setContent] = useState<ShovelLoaderContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText, contentShared }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentShared)
        : contentShared;

      const abouts = responsiveContent?.["heavy_machinery_wheel_loader"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const formattedData = {
        banner: responsiveContent?.["banner_heavy_machinery_wheel_loader"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        thirdAbout: abouts?.[2],
        information: responsiveShared?.["truck_rental"]?.[0],
        carousel: contentText?.["rental_leaders"]?.[0],
        fourthAbout: responsiveContent?.["especialista_pa_carregadeira"]?.[0],
        attachments: contentText?.["loader_attachments_tags"]?.[0],
        platformRental: contentText?.["lifting_platform_rental"]?.[0],
        secondBanner: responsiveContent?.["count_on_us"]?.[0],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent(
          "maquinas_pesadas_pa_carregadeira"
        );
        const contentText = await getText("maquinas_pesadas_pa_carregadeira");
        console.log("contentText", contentText);
        const contentShared = await getCMSContent("shared");
        setContentBase({ contentAux, contentText, contentShared });
        formatData({ contentAux, contentText, contentShared });
      } else {
        formatData(contentBase);
      }
    };
    getContent();
  }, [formatData]);

  return (
    <>
      <Header theme="rentalHeavy" />
      <main>
        <Banner
          backgroundImage={
            content?.banner && getImageSrc(content?.banner?.fields)
          }
          title={content?.banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: "Categorias",
              href: "/maquinas-pesadas/catalogo",
            },
            {
              name: "Pá carregadeira",
              href: "/maquinas-pesadas/pa-carregadeira",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          buttonTitle={
            content?.firstAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          orientation="inverted"
          hideImage={isMobile}
        />
        <HeavyMachinesCarousel
          title={content?.carousel?.fields?.text_field?.[0]}
          buttonTitle={content?.carousel?.fields?.buttonText?.[0]}
          products={content?.carousel?.fields?.subtitle}
        />
        <InformationWithLines
          theme="orange-500"
          title={content?.platformRental?.fields?.text_field?.[0]}
          buttonTitle={content?.platformRental?.fields?.buttonText[0]}
          buttonLink={content?.platformRental?.fields?.hrefButton[0]}
        />
        <InformationWithButton
          title={content?.information?.fields?.content_title}
          buttonLink={content?.information?.fields?.href_attribute}
          theme="bg-green-800"
          description=""
          buttonTitle={
            content?.information?.fields?.button_text ?? "Saiba Mais"
          }
          buttonColor={"bg-orange-500"}
          buttonTextColor={"text-white"}
          showDna={false}
          image={getImageSrc(content?.information?.fields)}
          paddingY="0"
        />
        <AboutWrapCards
          title={content?.attachments?.fields?.title}
          cards={content?.attachments?.fields?.subtitle}
          image={getImageSrc(content?.secondAbout?.fields)}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          theme="green-800"
          color="white"
        />
        <InformationWithLines
          theme="beige-200"
          title={content?.platformRental?.fields?.text_field?.[0]}
          buttonTitle={content?.platformRental?.fields?.buttonText[0]}
          buttonLink={content?.platformRental?.fields?.hrefButton[0]}
        />
        <TalkToSpecialistHeavy
          buttonText={content?.fourthAbout?.fields?.button_text}
          link={content?.fourthAbout?.fields?.href_attribute}
          text={content?.fourthAbout?.fields?.content_text}
          title={content?.fourthAbout?.fields?.content_title}
          image={getImageSrc(content?.fourthAbout?.fields)}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default ShovelLoader;
