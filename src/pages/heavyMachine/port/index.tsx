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
import { PortContent } from "./types";
import { CategoryCarousel } from "@/components/shared/CategoryCarousel/CategoryCarousel";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { updateParagraphs } from "@/utils/texts";

function Port() {
  const [content, setContent] = useState<PortContent>();
  const [contentBase, setContentBase] = useState<any>();

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentShared }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentShared)
        : contentShared;

      const abouts = responsiveContent?.["port_heavy_machinery"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const formattedData = {
        banner: responsiveContent?.["banner_port_heavy_machinery"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        thirdAbout: responsiveContent?.["fale_com_especialista"]?.[0],
        categories: responsiveShared?.["machine_models_icon"],
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
        const contentAux = await getCMSContent("maquinas_pesadas_portuario");
        const contentShared = await getCMSContent("shared");
        setContentBase({ contentAux, contentShared });
        formatData({ contentAux, contentShared });
      } else {
        formatData(contentBase);
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
              name: "Home",
              href: "/maquinas-pesadas",
            },
            {
              name: "Portuário",
              href: "/maquinas-pesadas/portuario",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          theme="gray-50"
          buttonTitle={
            content?.firstAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          isTalkToSpecialist
        />
        <CategoryCarousel
          title="Na Mills você encontra diversos modelos"
          categories={content?.categories}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          link={content?.secondAbout?.fields?.href_attribute ?? "#"}
          theme="gray-50"
          orientation="inverted"
          hasButton={false}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          link={content?.thirdAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={
            content?.thirdAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          theme={isMobile ? "gray-50" : "green-800"}
          color={isMobile ? "green-800" : "white"}
          buttonVariant={isMobile ? "default" : "whiteOutline"}
          forceImageDisplayOnMobile
          isTalkToSpecialist
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Port;
