import { getImage } from "@/services/hooks/getImage";
import { getImageSrc, getMobileImageName } from "@/utils/images";
import { useEffect, useState } from "react";
import { getText } from "@/services/hooks/getText";
import {
  FormattedResponseProps,
  SegmentsProps,
} from "@/types/responseCMSTypes";

export const useGetCMSIndustrialInstallation = () => {
  const [banner, setBanner] = useState<FormattedResponseProps>();

  const handleGetImages = async () => {
    const contents: any = await getImage("estrutura_eventos");
    const texts: any = await getText("");

    // const descriptionsToRemove = [
    //   "segments plataformas elevatorias outros01",
    //   "segments plataformas elevatorias outros02",
    //   "segments plataformas elevatorias outros03",
    //   "segments plataformas elevatorias outros04",
    //   "segments plataformas elevatorias outros05",
    //   "segments plataformas elevatorias outros06",
    //   "segments plataformas elevatorias outros07",
    // ];
    // const descriptionsToKeep = [
    //   "plataforma elevatoria articulada",
    //   "plataforma elevatoria telescopica",
    //   "plataforma elevatória tesoura",
    // ];
    // const graffitiAndUrbanFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros01"
    // );
    // const harvestingMachinesFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros02"
    // );
    // const muralPaintingFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros03"
    // );
    // const verticalCemeteryFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros04"
    // );
    // const cheeseDryingFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros05"
    // );
    // const movementOfPartsStockFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros06"
    // );
    // const millsHasTheSolutionFiltered = contents.segments.filter(
    //   (item: SegmentsProps) =>
    //     item.description === "segments plataformas elevatorias outros07"
    // );
    // const contentFiltered = (contents.segments = contents.segments.filter(
    //   (item: SegmentsProps) => !descriptionsToRemove.includes(item.description)
    // ));

    setBanner({
      title: "Outros",
      backgroundImage: "contents.banner_outros[0].fields.native.links[0].href",
    });
  };
  useEffect(() => {
    handleGetImages();
  }, []);

  return {
    banner,
  };
};
