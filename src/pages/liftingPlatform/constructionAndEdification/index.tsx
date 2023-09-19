import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";

import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";
import { RightImgWithLeftButtons } from "@/components/ProductTypeAndSegment/RightImgWithLeftButtons";
import { Benefits } from "@/components/ProductTypeAndSegment/Benefits";

import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";
import { useRouter } from "next/router";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { building } from "@/components/ProductTypeAndSegment/utils";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Header } from "@/components/shared/Header/Header";

export default function ConstructionAndEdification() {
  const router = useRouter();
  const { id } = router.query;
  const [infosToShow, setInfosToShow] = useState<any>(null);
  const [banner, setBanner] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [texts, setTexts] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("construcao_edificacao");
    const texts = await getText("construcao_edificacao");
    setBanner(images.banner[0]);
    setSegments(images.segments);
    setTexts(
      texts.segments_text?.find(
        (x: any) => x.fields.content_page === "construcao_edificacao"
      )
    );
  }, []);

  useEffect(() => {
    getContent();
    setInfosToShow(building);
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
            img={segments[1]?.fields.native.links[0].href}
            headerText={segments[1]?.fields.content_title}
            paragraphText={segments[1]?.fields.content_text}
          />
        )}
        {segments && (
          <RightImgWithLeftButtons
            img={segments[0]?.fields.native.links[0].href}
            headerText={texts?.fields.title}
            textCards={texts?.fields.text_field}
            buttonProps={{
              text: texts?.fields.buttonText?.length
                ? texts?.fields.buttonText[0]
                : "",
              link: texts?.fields.hrefButton?.length
                ? texts?.fields.hrefButton[0]
                : "",
            }}
            width={texts?.fields.text_field.length >= 8 ? "" : undefined}
            imageHeight={
              texts?.fields.text_field.length >= 8 ? "h-[564px]" : undefined
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
