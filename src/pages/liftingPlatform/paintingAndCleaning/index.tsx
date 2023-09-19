import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";

import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";
import { Benefits } from "@/components/ProductTypeAndSegment/Benefits";

import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";

import { useRouter } from "next/router";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { clean } from "@/components/ProductTypeAndSegment/utils";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { getImage } from "@/services/hooks/getImage";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Header } from "@/components/shared/Header/Header";

export default function PaintingAndCleaning() {
  const router = useRouter();
  const { id } = router.query;
  const [infosToShow, setInfosToShow] = useState<any>(null);
  const [banner, setBanner] = useState<any>();
  const [segments, setSegments] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("pintura_limpeza_altura");
    setBanner(images.banner[0]);
    setSegments(images.segments);
  }, []);

  useEffect(() => {
    getContent();
    setInfosToShow(clean);
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
          <RightImgWithLeftText
            img={segments[1]?.fields.native.links[0].href}
            headerText={segments[1]?.fields.content_title}
            text={segments[1]?.fields.content_text}
            buttonProps={
              infosToShow?.sectionWithLeftTextRightImage?.buttonProps
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
