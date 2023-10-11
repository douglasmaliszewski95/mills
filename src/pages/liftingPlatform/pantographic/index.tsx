import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { Guide } from "@/components/Category/Guide/Guide";
import { Utilizations } from "@/components/Category/Utilizations/Utilizations";
import { FindSize } from "@/components/Category/FindSize/FindSize";
import { OtherTypes } from "@/components/Category/OtherTypes/OtherTypes";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { useCallback, useEffect, useState } from "react";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { getImageSrc } from "@/utils/images";
import parse from "html-react-parser";
import { updateParagraphs } from "@/utils/texts";
import useScreenWidth from "@/services/hooks/useScreenWidth";

const Pantographic: React.FC = () => {
  const [banner, setBanner] = useState<any>();
  const [section, setSection] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [guideTexts, setGuideTexts] = useState<any>();
  const [idealSize, setIdealSize] = useState<any>();
  const [utilization, setUtilization] = useState<any>();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    updateParagraphs();
  }, [banner, section, segments, price, guideTexts, idealSize, utilization]);

  const getContent = useCallback(async () => {
    const [
      images,
      texts
    ]: any = await Promise.all([
      getImage("pantografica_tesoura"),
      getText("pantografica_tesoura")
    ]);

    let filterSection = [];
    let filterSegments = [];
    let filterGuides = [];
    for (let i = 1; i <= images.pantographic_scissors.length; i++) {
      const search = images.pantographic_scissors.find(
        (x: any) => x.fields.content_order === i
      );
      if (search) filterSection.push(search);
    }

    for (let i = 1; i <= images.icon_uses_platform.length; i++) {
      const search = images.icon_uses_platform.find(
        (x: any) => x.fields.content_order === i
      );
      if (search)
        filterSegments.push({
          id: search.id,
          title: search.fields.content_title,
          image: search.fields.native.links[0].href,
          alt: search.fields.alt_attribute,
        });
    }

    for (let i = 0; i < texts.guide_cards?.[0].fields.subtitle.length; i++) {
      filterGuides.push({
        id: texts.guide_cards[0].id,
        title: texts.guide_cards[0].fields.subtitle[i],
        description: texts.guide_cards[0].fields.text_field[i],
      });
    }

    setBanner(images.banner[0]);
    setSection(filterSection);
    setSegments(filterSegments);
    setPrice(images.price[0]);
    setGuideTexts(filterGuides);
    setIdealSize(texts.ideal_size[0]);
    setUtilization({
      title: texts.platform_use[0].fields.title,
      text: parse(texts.platform_use[0].fields.text_field[0]),
    });
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
              name: "Pantográfica ou Tesoura",
              href: "/plataformas-elevatorias/pantografica-ou-tesoura",
            },
          ]}
        />
        <About
          title={section ? section[0]?.fields.content_title : ""}
          description={section ? section[0]?.fields.content_text : ""}
          image={section ? section[0]?.fields.native.links[0].href : ""}
          link={section?.[0]?.fields?.href_attribute ?? "#"}
          alt="Imagem"
          buttonTitle="Ver Modelos"
        />
        <About
          title={section ? section[1]?.fields.content_title : ""}
          theme="orange-500"
          color="white"
          orientation="inverted"
          description={section ? section[1]?.fields.content_text : ""}
          image={section ? section[1]?.fields.native.links[0].href : ""}
          alt="Imagem"
          hasButton={false}
        />
        <Guide cards={guideTexts || []} />
        <Utilizations
          cards={segments ? segments : []}
          title={utilization?.title || ""}
          description={utilization?.text || ""}
          page="Tesoura"
        />
        <About
          image={price ? price.fields.native.links[0].href : ""}
          alt={price ? price.fields.alt_attribute : ""}
          title={price ? price.fields.content_title : ""}
          description={[price ? price?.fields.content_text : ""]}
          hasButton={false}
          orientation="inverted"
          theme="gray-50"
        />
        <FindSize
          title={idealSize?.fields.title || ""}
          slides={idealSize?.fields.text_field || []}
        />
        <OtherTypes title="Plataforma Elevatória Tesoura" />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Pantographic;
