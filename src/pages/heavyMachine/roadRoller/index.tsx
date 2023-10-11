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
import { RoadRollerContent } from "./types";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { AboutWrapCards } from "@/components/shared/AboutWrapCards/AboutWrapCards";
import { getText } from "@/services/hooks/getText";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { HeavyMachinesCarousel } from "@/components/HeavyMachines/HeavyMachinesCarousel/HeavyMachinesCarousel";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import { InformationWithLines } from "@/components/HeavyMachines/InformationWithLines/InformationWithLines";
import { CarouselTabs } from "@/components/shared/CarouselTabs/CarouselTabs";
import { updateParagraphs } from "@/utils/texts";

function RoadRoller() {
  const [content, setContent] = useState<RoadRollerContent>();
  const [contentBase, setContentBase] = useState<any>();

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText, contentShared }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentShared)
        : contentShared;

      const abouts = responsiveContent?.[
        "heavy_machinery_compactor_roller"
      ]?.sort((a: ImageCMS, b: ImageCMS) =>
        a?.description?.localeCompare(b?.description)
      );

      const tabs = [
        {
          fields: {
            title:
              contentText?.["customer_questions_text"]?.[0]?.fields
                ?.subtitle?.[0],
            text_field: [
              contentText?.["customer_questions_text"]?.[0]?.fields
                ?.text_field?.[0],
            ],
          },
        },
        {
          fields: {
            title:
              contentText?.["customer_questions_text"]?.[0]?.fields
                ?.subtitle?.[1],
            text_field: [
              contentText?.["customer_questions_text"]?.[0]?.fields
                ?.text_field?.[1],
            ],
          },
        },
        {
          fields: {
            title:
              contentText?.["customer_questions_text"]?.[0]?.fields
                ?.subtitle?.[2],
            text_field: [
              contentText?.["customer_questions_text"]?.[0]?.fields
                ?.text_field?.[2],
            ],
          },
        },
      ];

      const formattedData = {
        banner:
          responsiveContent?.["banner_heavy_machinery_compactor_roller"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        information: responsiveShared?.["truck_rental"]?.[0],
        secondInformation:
          contentText?.["heavy_technical_assistance_text"]?.[0],
        tabs,
        carousel: contentText?.["smooth_roller_text"]?.[0],
        thirdAbout: responsiveContent?.["especialista_rolo_compactador"]?.[0],
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
          "maquinas_pesadas_rolo_compactador"
        );
        const contentText = await getText("maquinas_pesadas_rolo_compactador");
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
              name: "Rolo compactador",
              href: "/maquinas-pesadas/rolo-compactador",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          link={content?.firstAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={content?.firstAbout?.fields?.buttonText ?? "Ver modelos"}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          theme="beige-100"
          orientation="inverted"
          dnaColor="#0b5e61"
          forceDnaOnMobile
        />
        <HeavyMachinesCarousel
          title={content?.carousel?.fields?.title}
          description={content?.carousel?.fields?.text_field?.[0]}
          buttonTitle={content?.carousel?.fields?.buttonText?.[0]}
          products={content?.carousel?.fields?.subtitle}
          isTalkToSpecialist
        />
        <InformationWithLines
          title={content?.secondInformation?.fields?.text_field?.[0]}
          buttonTitle={content?.secondInformation?.fields?.buttonText?.[0]}
          buttonLink={content?.secondInformation?.fields?.hrefButton?.[0]}
        />
        <CarouselTabs
          theme="green-800"
          bgTheme="beige-200"
          tabs={content?.tabs}
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
        <TalkToSpecialistHeavy
          buttonText={content?.thirdAbout?.fields?.button_text}
          link={content?.thirdAbout?.fields?.href_attribute}
          text={content?.thirdAbout?.fields?.content_text}
          title={content?.thirdAbout?.fields?.content_title}
          image={getImageSrc(content?.thirdAbout?.fields)}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default RoadRoller;
