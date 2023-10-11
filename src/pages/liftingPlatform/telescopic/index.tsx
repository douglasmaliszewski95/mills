import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { About } from "@/components/shared/About/About";
import { WhenToUse } from "@/components/Category/WhenToUse/WhenToUse";
import { Information } from "@/components/Category/Information/Information";
import { OtherTypes } from "@/components/Category/OtherTypes/OtherTypes";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { useCallback, useEffect, useState } from "react";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { getImageSrc } from "@/utils/images";
import SearchCMS from "@/dtos/SearchCMS";
import { updateParagraphs } from "@/utils/texts";
import useScreenWidth from "@/services/hooks/useScreenWidth";

const Telescopic: React.FC = () => {
  const [banner, setBanner] = useState<any>();
  const [texts, setTexts] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [icons, setIcons] = useState<any>();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    updateParagraphs();
  }, [banner, texts, segments, icons]);

  const getContent = useCallback(async () => {
    const [
      images,
      texts
    ]: any = await Promise.all([
      getImage("plataformas_elevatorias_telescopica"),
      getText("plataformas_elevatorias_telescopica")
    ]);

    const filterIcons = images.icon_when_to_use
      ?.sort((a: any, b: any) => a?.fields.content_order - b?.fields.content_order)
      .map((icon: any) => {
        return {
          text: icon.fields.content_text,
          image: icon.fields.native.links[0].href,
        };
      });

    const orderedSegments = images?.telescopic_platforms?.sort(
      (a: SearchCMS, b: SearchCMS) =>
        a?.description?.localeCompare(b?.description)
    );

    setBanner(images.banner_telescopica[0]);
    setTexts(texts);
    setSegments(orderedSegments);
    setIcons(filterIcons);
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          backgroundImage={banner && getImageSrc(isMobile ? banner?.mobileObj?.fields : banner?.fields)}
          title={banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: "Plataformas Elevatórias",
              href: "/plataformas-elevatorias",
            },
            {
              name: "Lança Telescópica",
              href: "/plataformas-elevatorias/telescopica",
            },
          ]}
        />
        <About
          title={segments ? segments?.[0].fields.content_title : ""}
          description={segments ? segments?.[0].fields.content_text : ""}
          image={segments?.[0].fields.native.links[0].href}
          alt={segments ? segments?.[0].fields.alt_attribute : ""}
          link={segments ? segments?.[0]?.fields?.href_attribute : ""}
        />
        <About
          title={segments ? segments?.[1].fields.content_title : ""}
          description={segments ? segments?.[1].fields.content_text : ""}
          image={segments?.[1].fields.native.links[0].href}
          alt={segments ? segments?.[1].fields.alt_attribute : ""}
          hasButton={false}
          orientation="inverted"
          theme="green-800"
          color="white"
        />
        <WhenToUse
          title="Quando usar a <br>Plataforma Elevatória Telescópica?"
          cards={icons || []}
        />
        <About
          title={segments ? segments?.[2].fields.content_title : ""}
          description={segments ? segments?.[2].fields.content_text : ""}
          image={segments?.[2].fields.native.links[0].href}
          alt={segments ? segments?.[2].fields.alt_attribute : ""}
          forceImageDisplayOnMobile
          theme="orange-500"
          color="white"
          hasButton={false}
        />
        <Information
          title={texts ? texts.question_01[0].fields.title : ""}
          description={texts ? texts.question_01[0].fields.text_field[0] : ""}
          theme="beige-200"
          position="bottom"
        />
        <Information
          title={texts ? texts.question_02[0].fields.title : ""}
          description={texts ? texts.question_02[0].fields.text_field[0] : ""}
          position="top"
        />
        <OtherTypes title="Plataforma Elevatória Telescópica" />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Telescopic;
