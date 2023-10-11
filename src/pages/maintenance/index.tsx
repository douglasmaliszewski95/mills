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
import { GridInformation } from "@/components/shared/GridInformation/GridInformation";
import { updateParagraphs } from "@/utils/texts";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";

function Maintenance() {
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const gridCards = responsiveContent?.["icon_technical_assistance"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const formattedData = {
        banner: responsiveContent?.["banner_manutencao"]?.[0],
        firstAbout: responsiveContent?.["manutencao"]?.find(
          ({ description }: ImageCMS) => description === "manutencao01"
        ),
        secondAbout: responsiveContent?.["manutencao"]?.find(
          ({ description }: ImageCMS) => description === "manutencao02"
        ),
        thirdAbout: responsiveContent?.["manutencao"]?.find(
          ({ description }: ImageCMS) => description === "manutencao03"
        ),
        fourthAbout: responsiveContent?.["manutencao"]?.find(
          ({ description }: ImageCMS) => description === "manutencao04"
        ),
        fifthAbout: responsiveContent?.["manutencao"]?.find(
          ({ description }: ImageCMS) => description === "manutencao05"
        ),
        map: responsiveContent?.["map_acting"]?.[0],
        logo: responsiveContent?.["logo_maintenance"]?.[0],
        gridCards,
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
        const [
          contentAux,
          contentText
        ]: any = await Promise.all([
          getCMSContent("manutencao"),
          getText("manutencao")
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
  }, [content, contentBase]);

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
              name: "Manutenção e assistência técnica",
              href: "/manutencao-e-assistencia-tecnica",
            },
          ]}
          height="184px"
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          buttonTitle={
            content?.firstAbout?.fields?.buttonText ??
            "Falar com um especialista"
          }
          isTalkToSpecialist
        />
        {content?.gridCards && (
          <GridInformation
            title="Assistência Técnica Mills"
            cards={content?.gridCards}
          />
        )}
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          hasButton={false}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          theme="beige-200"
          hasButton={false}
          forceImageDisplayOnMobile
        />
        <About
          title={content?.fourthAbout?.fields?.content_title ?? ""}
          description={content?.fourthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fourthAbout?.fields)}
          alt={content?.fourthAbout?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          hasButton={false}
        />
        <section className="bg-green-800 py-[56px] flex justify-center tablet:py-8 tablet:px-4">
          <div className="container flex gap-10 tablet:gap-6 items-center tablet:flex-col">
            <div className="bg-white px-7 rounded shrink-0 tablet:shrink">
              <img src={getImageSrc(content?.logo?.fields)} />
            </div>
            <h5 className="text-2xl text-white font-semibold tablet:text-base tablet:text-center">
              {content?.logo?.fields?.content_text}
            </h5>
          </div>
        </section>
        <About
          title={content?.map?.fields?.content_title ?? ""}
          description={content?.map?.fields?.content_text ?? ""}
          image={getImageSrc(content?.map?.fields)}
          alt={content?.map?.fields?.alt_attribute ?? ""}
          hasButton={false}
          imagePadding="py-8 tablet:px-4"
          forceImageDisplayOnMobile
          dnaColor="#EBE3C7"
        />
        <About
          title={content?.fifthAbout?.fields?.content_title ?? ""}
          description={content?.fifthAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.fifthAbout?.fields)}
          alt={content?.fifthAbout?.fields?.alt_attribute ?? ""}
          link={content?.fifthAbout?.fields?.href_attribute ?? "#"}
          orientation="inverted"
          theme="beige-200"
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}

export default Maintenance;
