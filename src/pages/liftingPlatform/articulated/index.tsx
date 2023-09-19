import { About } from "@/components/shared/About/About";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { OtherTypes } from "@/components/Category/OtherTypes/OtherTypes";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { Information } from "@/components/Category/Information/Information";
import { Banner } from "@/components/shared/Banner/Banner";
import { Utilizations } from "@/components/Category/Utilizations/Utilizations";
import { useCallback, useEffect, useState } from "react";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { getImageSrc } from "@/utils/images";
import { ImageCMS } from "@/types";
import SearchCMS from "@/dtos/SearchCMS";

const Articulated: React.FC = () => {
  const [banner, setBanner] = useState<any>();
  const [section, setSection] = useState<any>();
  const [segments, setSegments] = useState<any>();
  const [icons, setIcons] = useState<any>();
  const [iconsText, setIconsText] = useState<any>();
  const [norms, setNorms] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("plataformas_elevatorias_articulada");
    const texts = await getText("plataformas_elevatorias_articulada");

    let filterIcons = [];

    for (let i = 1; i <= images.icon_main_applications.length; i++) {
      const search = images.icon_main_applications.find(
        (x: any) => x.fields.content_order === i
      );
      if (search)
        filterIcons.push({
          id: search.id,
          title: search.fields.content_title,
          image: search.fields.native.links[0].href,
          alt: search.fields.alt_attribute,
        });
    }

    const orderedSegments = images?.articulated_platforms?.sort(
      (a: SearchCMS, b: SearchCMS) =>
        a?.description?.localeCompare(b?.description)
    );

    setBanner(images.banner_plataformas_elevatorias_articulada[0]);
    setSection(images.plataformas_elevatorias[0]);
    setSegments(orderedSegments);
    setIcons(filterIcons);
    setIconsText(texts.icon_main_applications_text[0]);
    setNorms(texts.norms[0]);
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          backgroundImage={banner && getImageSrc(banner?.fields)}
          title={banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: "Plataformas Elevatórias",
              href: "/plataformas-elevatorias",
            },
            {
              name: "Lança Articulada",
              href: "/plataformas-elevatorias/articulada",
            },
          ]}
        />
        <About
          title={segments ? segments?.[0].fields.content_title : ""}
          description={segments ? segments?.[0].fields.content_text : ""}
          image={segments?.[0].fields.native.links[0].href}
          alt={segments ? segments?.[0].fields.alt_attribute : ""}
          link={segments ? segments?.[0]?.fields.href_attribute : ""}
        />
        <About
          title={segments ? segments?.[1].fields.content_title : ""}
          description={segments ? segments?.[1].fields.content_text : ""}
          image={segments?.[1].fields.native.links[0].href}
          alt={segments ? segments?.[1].fields.alt_attribute : ""}
          hasButton={false}
          orientation="inverted"
          theme="beige-200"
        />
        <Information
          title={norms ? norms?.fields.title : ""}
          description={norms ? norms?.fields.text_field[0] : ""}
        />
        <About
          title={segments ? segments?.[2].fields.content_title : ""}
          description={segments ? segments?.[2].fields.content_text : ""}
          image={segments?.[2].fields.native.links[0].href}
          alt={segments ? segments?.[2].fields.alt_attribute : ""}
          hasButton={false}
        />
        <Utilizations
          title={iconsText ? iconsText?.fields.title : ""}
          description={iconsText ? iconsText?.fields.text_field[0] : ""}
          cards={icons || []}
          theme="orange"
        />
        <About
          title={section ? section?.fields.content_title : ""}
          description={section ? section?.fields.content_text : ""}
          image={section ? section?.fields.native.links[0].href : ""}
          alt={section ? section?.fields.alt_attribute : ""}
          hasButton={false}
          orientation="inverted"
          theme="beige-200"
        />
        <OtherTypes title="Plataforma Elevatória Articulada" />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Articulated;
