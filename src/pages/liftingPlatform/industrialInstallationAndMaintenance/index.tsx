import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";

import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";
import { RightImgWithLeftButtons } from "@/components/ProductTypeAndSegment/RightImgWithLeftButtons";
import { Benefits } from "@/components/ProductTypeAndSegment/Benefits";

import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";
import { useRouter } from "next/router";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { getImage } from "@/services/hooks/getImage";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { getText } from "@/services/hooks/getText";
import { Header } from "@/components/shared/Header/Header";

export default function IndustrialInstallationAndMaintenance() {
  const router = useRouter();
  const { id } = router.query;
  const [infosToShow, setInfosToShow] = useState<any>(null);
  const [banner, setBanner] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [texts, setTexts] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("instalacao_manutencao_industrial");
    const texts = await getText("instalacao_manutencao_industrial");
    setBanner(images.banner[0]);
    setSegments(images.segments);
    setTexts(texts.types_services[0]);
  }, []);

  useEffect(() => {
    getContent();
  }, [id]);

  return (
    <>
      <Header />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Segmentos",
              href: "#",
            },
            { name: banner?.fields.content_title, href: "#" },
          ]}
          title={banner?.fields.content_title}
          backgroundImage={banner?.fields.native.links[0].href}
        />

        {segments && (
          <LeftImgWithRightText
            img={segments[0]?.fields.native.links[0].href}
            headerText={segments[0]?.fields.content_title}
            paragraphText={segments[0]?.fields.content_text}
          />
        )}
        {segments && (
          <RightImgWithLeftButtons
            img={segments[1]?.fields.native.links[0].href}
            headerText={texts?.fields.title}
            textCards={texts?.fields.text_field}
            buttonProps={{
              text: texts?.fields?.buttonText[0],
              link: texts?.fields?.hrefButton[0],
            }}
            width={
              infosToShow?.sectionWithRightImage?.textCards.length >= 8
                ? ""
                : undefined
            }
            imageHeight={
              infosToShow?.sectionWithRightImage?.textCards.length >= 8
                ? "h-[564px]"
                : undefined
            }
          />
        )}
        <Benefits />
        <Opinion />
        <Platforms />

        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
