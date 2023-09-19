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
import { MiningContent } from "./types";
import { CategoryCarousel } from "@/components/shared/CategoryCarousel/CategoryCarousel";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { AboutCards } from "@/components/HeavySegments/AboutCards/AboutCards";
import { OverflowCards } from "@/components/HeavySegments/OverflowCards/OverflowCards";
import { getText } from "@/services/hooks/getText";

function Mining() {
  const [content, setContent] = useState<MiningContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentShared, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const responsiveShared = isMobile
        ? transformContentToMobile(contentShared)
        : contentShared;

      const abouts = responsiveContent?.["heavy_mining_machinery"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const formattedData = {
        banner: responsiveContent?.["banner_mining"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        thirdAbout: abouts?.[2],
        equipment: contentText?.["mining_equipment_text"]?.[0],
        howRent: contentText?.["how_rent_mining"]?.[0],
        fourthAbout: responsiveContent?.["fale_com_especialista"]?.[0],
        categories: responsiveShared?.["machine_models_icon"],
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("maquinas_pesadas_mineracao");
        const contentText = await getText("maquinas_pesadas_mineracao");
        const contentShared = await getCMSContent("shared");
        setContentBase({ contentAux, contentShared, contentText });
        formatData({ contentAux, contentShared, contentText });
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
              name: "Mineração",
              href: "/maquinas-pesadas/mineracao",
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
        <AboutCards
          content={content?.secondAbout}
          title={content?.equipment?.fields?.title}
          cards={content?.equipment?.fields?.subtitle}
        />
        <CategoryCarousel
          title="Na Mills você encontra diversos modelos"
          categories={content?.categories}
        />
        <OverflowCards
          title={content?.howRent?.fields?.title}
          description={content?.howRent?.fields?.text_field?.[0]}
          cards={content?.howRent?.fields?.subtitle}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          link={content?.thirdAbout?.fields?.href_attribute ?? "#"}
          orientation="inverted"
          hasButton={false}
          dnaColor="#CECECE"
        />
        <About
          title={content?.fourthAbout?.fields?.content_title ?? ""}
          description={content?.fourthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fourthAbout?.fields)}
          alt={content?.fourthAbout?.fields?.alt_attribute ?? ""}
          link={content?.fourthAbout?.fields?.href_attribute ?? "#"}
          buttonTitle={
            content?.fourthAbout?.fields?.buttonText ??
            "Fale com um especialista"
          }
          theme="gray-50"
          forceImageDisplayOnMobile
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Mining;
