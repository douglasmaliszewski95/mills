import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";

import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";
import { RightImgWithLeftButtons } from "@/components/ProductTypeAndSegment/RightImgWithLeftButtons";
import { Benefits } from "@/components/ProductTypeAndSegment/Benefits";

import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";
import { useRouter } from "next/router";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { maintenance } from "@/components/ProductTypeAndSegment/utils";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Header } from "@/components/shared/Header/Header";
import { updateParagraphs } from "@/utils/texts";

export default function InstallationAndMaintenance() {
  const router = useRouter();
  const { id } = router.query;
  const [infosToShow, setInfosToShow] = useState<any>(null);
  const [banner, setBanner] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [texts, setTexts] = useState<any>();
  const [segmentsTitle, setSegmentsTitle] = useState<string>("");

  useEffect(() => {
    updateParagraphs();
  }, [banner, segments, texts]);

  const getContent = useCallback(async () => {
    const images = await getImage("instalacao_manutencao_predial");
    const texts = await getText("instalacao_manutencao_predial");
    setBanner(images.banner[0]);
    setSegments(images.segments);
    setTexts({
      segments: texts?.segments_text?.find(
        (x: any) => x.fields.content_page === "instalacao_manutencao_predial"
      ),
      customerReviews: texts?.customer_reviews?.[0],
    });
    setSegmentsTitle(texts?.icon_segments_text[0]?.fields?.title);
  }, []);

  useEffect(() => {
    getContent();
    setInfosToShow(maintenance);
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
            img={segments[2]?.fields.native.links[0].href}
            headerText={segments[2]?.fields.content_title}
            paragraphText={segments[2]?.fields.content_text}
          />
        )}

        {segments && (
          <RightImgWithLeftButtons
            img={segments[0]?.fields.native.links[0].href}
            headerText={texts?.segments?.fields.title}
            textCards={texts?.segments?.fields.text_field}
            buttonProps={infosToShow?.sectionWithRightImage?.buttonProps}
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
        {segments && (
          <LeftImgWithRightText
            img={segments[1]?.fields.native.links[0].href}
            headerText={segments[1]?.fields.content_title}
            paragraphText={segments[1]?.fields.content_text}
            buttonProps={
              infosToShow?.sectionWithLeftTextRightImageGreen?.buttonProps
            }
            variant="green"
          />
        )}

        <Benefits headerText={segmentsTitle} />
        <Opinion content={texts?.customerReviews} />
        <Platforms />

        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
