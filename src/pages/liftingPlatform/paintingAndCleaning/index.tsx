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
import { updateParagraphs } from "@/utils/texts";
import { getText } from "@/services/hooks/getText";
import { About } from "@/components/shared/About/About";

export default function PaintingAndCleaning() {
  const router = useRouter();
  const { id } = router.query;
  const [infosToShow, setInfosToShow] = useState<any>(null);
  const [banner, setBanner] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [customerReviews, setCustomerReviews] = useState<any>();
  const [segmentsTitle, setSegmentsTitle] = useState<string>("");

  useEffect(() => {
    updateParagraphs();
  }, [banner, segments, infosToShow]);

  const getContent = useCallback(async () => {
    const images = await getImage("pintura_limpeza_altura");
    const texts = await getText("pintura_limpeza_altura");
    setBanner(images.banner[0]);
    setSegments(images.segments);

    setCustomerReviews(texts?.customer_reviews?.[0]);
    setSegmentsTitle(texts?.icon_segments_text[0]?.fields?.title);
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
              href: "/plataformas-elevatorias",
            },
            {
              name: banner?.fields.content_title,
              href: "/plataformas-elevatorias/pintura-e-limpeza-em-altura",
            },
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
          <About
            title={segments[1]?.fields?.content_title}
            description={[segments[1]?.fields?.content_text]}
            image={segments[1]?.fields?.native?.links[0]?.href}
            alt={segments[1]?.fields?.alt_attribute}
            link={segments[1]?.fields?.href_attribute ?? "#"}
            theme="green-800"
            color="white"
            buttonVariant="inverted"
          />
        )}

        <Benefits headerText={segmentsTitle} />
        <Opinion content={customerReviews} />
        <Platforms />

        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
