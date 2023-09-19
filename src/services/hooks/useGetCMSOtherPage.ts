import { getImage } from "@/services/hooks/getImage";
import { getImageSrc, getMobileImageName } from "@/utils/images";
import { useEffect, useState } from "react";
import { getText } from "@/services/hooks/getText";
import {
  FormattedResponseProps,
  SegmentsProps,
} from "@/types/responseCMSTypes";

export const useGetCMSOtherPage = () => {
  const [content, setContent] = useState<FormattedResponseProps | null>(null);
  const [banner, setBanner] = useState<FormattedResponseProps | any>();
  const [millsServices, setMillsServices] = useState<
    FormattedResponseProps | any
  >();
  const [graffitiAndUrban, setGraffitiAndUrban] = useState<
    FormattedResponseProps | any
  >();
  const [harvestingMachines, setHarvestingMachines] = useState<
    FormattedResponseProps | any
  >();
  const [muralPainting, setMuralPainting] = useState<
    FormattedResponseProps | any
  >();
  const [verticalCemetery, setVerticalCemetery] = useState<
    FormattedResponseProps | any
  >();
  const [cheeseDrying, setCheeseDrying] = useState<
    FormattedResponseProps | any
  >();
  const [movementOfPartsStock, setMovementOfPartsStock] = useState<
    FormattedResponseProps | any
  >();
  const [millsHasTheSolution, setMillsHasTheSolution] = useState<
    FormattedResponseProps | any
  >();
  const [allPlatformsWeHave, setAllPlatformsWeHave] = useState<
    FormattedResponseProps | any
  >();
  const [otherTexts, setOtherTexts] = useState<any>();

  const handleGetImages = async () => {
    const contents: any = await getImage("outros");
    const shared: any = await getImage("shared");
    const texts: any = await getText("outros");

    const descriptionsToRemove = [
      "segments plataformas elevatorias outros01",
      "segments plataformas elevatorias outros02",
      "segments plataformas elevatorias outros03",
      "segments plataformas elevatorias outros04",
      "segments plataformas elevatorias outros05",
      "segments plataformas elevatorias outros06",
      "segments plataformas elevatorias outros07",
    ];
    const descriptionsToKeep = [
      "plataforma elevatoria articulada",
      "plataforma elevatoria telescopica",
      "plataforma elevatória tesoura",
    ];
    const graffitiAndUrbanFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros01"
    );
    const harvestingMachinesFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros02"
    );
    const muralPaintingFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros03"
    );
    const verticalCemeteryFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros04"
    );
    const cheeseDryingFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros05"
    );
    const movementOfPartsStockFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros06"
    );
    const millsHasTheSolutionFiltered = contents.segments.filter(
      (item: SegmentsProps) =>
        item.description === "segments plataformas elevatorias outros07"
    );
    const contentFiltered = (contents.segments = contents.segments.filter(
      (item: SegmentsProps) => !descriptionsToRemove.includes(item.description)
    ));
    const filteredList = shared.segments.filter((item: SegmentsProps) =>
      descriptionsToKeep.includes(item.description)
    );

    setGraffitiAndUrban({
      image: graffitiAndUrbanFiltered[0]?.fields?.native.links[0].href,
      headerText: graffitiAndUrbanFiltered[0]?.fields?.content_title,
      paragraphText: graffitiAndUrbanFiltered[0]?.fields?.content_text,
    });
    setHarvestingMachines({
      image: harvestingMachinesFiltered[0]?.fields?.native.links[0].href,
      headerText: harvestingMachinesFiltered[0]?.fields?.content_title,
      paragraphText: harvestingMachinesFiltered[0]?.fields?.content_text,
    });
    setMuralPainting({
      image: muralPaintingFiltered[0]?.fields?.native.links[0].href,
      headerText: muralPaintingFiltered[0]?.fields?.content_title,
      paragraphText: muralPaintingFiltered[0]?.fields?.content_text,
    });
    setVerticalCemetery({
      image: verticalCemeteryFiltered[0]?.fields?.native.links[0].href,
      headerText: verticalCemeteryFiltered[0]?.fields?.content_title,
      paragraphText: verticalCemeteryFiltered[0]?.fields?.content_text,
    });
    setCheeseDrying({
      image: cheeseDryingFiltered[0]?.fields?.native.links[0].href,
      headerText: cheeseDryingFiltered[0]?.fields?.content_title,
      paragraphText: cheeseDryingFiltered[0]?.fields?.content_text,
    });
    setMovementOfPartsStock({
      image: movementOfPartsStockFiltered[0]?.fields?.native.links[0].href,
      headerText: movementOfPartsStockFiltered[0]?.fields?.content_title,
      paragraphText: movementOfPartsStockFiltered[0]?.fields?.content_text,
    });
    setMillsHasTheSolution({
      image: millsHasTheSolutionFiltered[0]?.fields?.native.links[0].href,
      headerText: millsHasTheSolutionFiltered[0]?.fields?.content_title,
      paragraphText: millsHasTheSolutionFiltered[0]?.fields?.content_text,
    });

    setBanner({
      title: "Outros",
      backgroundImage: contents.banner_outros[0].fields.native.links[0].href,
    });

    setMillsServices({
      header: "A Mills oferece alguns serviços para a sua empresa, como:",
      cardList: contentFiltered
        .map((card: any) => {
          return {
            bgImg: card.fields.native.links[0].href,
            text: card.fields.content_title,
            order: card.fields.content_order,
            size: card.fields.metadata,
          };
        })
        .sort((a: any, b: any) => a.order - b.order),
    });
    setAllPlatformsWeHave({
      headerText:
        "Conheça cada tipo de plataforma e descubra a ideal para o seu projeto",
      cards: filteredList
        .map((card: any) => {
          return {
            image: card.fields.native.links[0].href,
            headerText: card.fields.content_title,
            order: card.fields.content_order,
            imageMobile: card?.mobileObj.fields.native.links[0].href,
            buttonText: "Ver modelos",
          };
        })
        .sort((a: any, b: any) => a.order - b.order),
    });
    setOtherTexts({
      divider: texts?.other_text[0]?.fields?.content_text_json.text,
    });
  };
  useEffect(() => {
    handleGetImages();
  }, []);

  return {
    content,
    banner,
    millsServices,
    graffitiAndUrban,
    harvestingMachines,
    muralPainting,
    verticalCemetery,
    cheeseDrying,
    movementOfPartsStock,
    millsHasTheSolution,
    allPlatformsWeHave,
    otherTexts,
  };
};
