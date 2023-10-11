import { getImage } from "@/services/hooks/getImage";
//import { getImageSrc, getMobileImageName } from "@/utils/images";
import { useEffect, useState } from "react";
import { getText } from "@/services/hooks/getText";
import { ImageCMS } from "@/types";

export const useGetCMSAssemblyStructure = () => {
  const [banner, setBanner] = useState<any>();
  const [firstSegment, setFirstSegment] = useState<any>();
  const [secondSegment, setSecondSegment] = useState<any>();
  const [segmentCards, setSegmentCards] = useState<any>();
  const [icons, setIcons] = useState<any>();

  const handleGetImages = async () => {
    const contents: any = await getImage("estrutura_eventos");
    const texts: any = await getText("estrutura_eventos");

    const first = contents?.segments?.find(
      ({ description }: ImageCMS) => description.includes("eventos01")
    );

    const second = contents?.segments?.find(
      ({ description }: ImageCMS) => description.includes("eventos02")
    );

    const filterIcons = contents?.segments.filter(
      ({ description }: ImageCMS) => description.includes("icon")
    );

    setBanner({
      title: contents?.banner_estrutura_eventos?.[0].fields.content_title,
      img: contents?.banner_estrutura_eventos?.[0].fields.native.links[0].href,
      mobileImg: contents?.banner_estrutura_eventos?.[0].mobileObj?.fields.native.links[0].href
    });

    setFirstSegment({
      title: first?.fields.content_title,
      text: first?.fields.content_text,
      img: first?.fields.native.links[0].href
    });

    setSecondSegment({
      title: second?.fields.content_title,
      text: second?.fields.content_text,
      img: second?.fields.native.links[0].href
    });

    setSegmentCards({
      title: texts?.events_structure?.[0].fields.title,
      cards: texts?.events_structure?.[0].fields.text_field,
      btnText: texts?.events_structure?.[0].fields.buttonText[0],
      link: texts?.events_structure?.[0].fields.hrefButton[0]
    })

    setIcons({
      title: texts?.rent_events_text?.[0].fields.title,
      icons: filterIcons
        ?.sort((a: any, b: any) => a?.fields.content_order - b?.fields.content_order)
        .map((item: any) => {
          return {
            header: item.fields.content_title,
            text: item.fields.content_text,
            icon: item.fields.native.links[0].href
          }
        })
    });
  };
  useEffect(() => {
    handleGetImages();
  }, []);

  return {
    banner,
    firstSegment,
    secondSegment,
    segmentCards,
    icons
  };
};
