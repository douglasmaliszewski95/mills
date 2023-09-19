import { getImage } from "@/services/hooks/getImage";
import { getImageSrc, getMobileImageName } from "@/utils/images";
import { useEffect, useState } from "react";
import { getText } from "@/services/hooks/getText";

export const useGetCMSAssemblyStructure = () => {
  const [banner, setBanner] = useState<any>();

  const handleGetImages = async () => {
    const contents: any = await getImage("montagem-de-estrutura-para-eventos");

    setBanner({
      title: "Montagem de Estrutura para Eventos",
      backgroundImage: "",
      // backgroundImage: contents?.banner_outros[0]?.fields.native.links[0].href,
    });
  };
  useEffect(() => {
    handleGetImages();
  }, []);

  return {
    banner,
  };
};
