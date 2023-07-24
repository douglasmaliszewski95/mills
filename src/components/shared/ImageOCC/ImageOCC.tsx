/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { getImageOCC } from "@/services/hooks/getImageOCC";
import { useEffect, useState } from "react";
import { ImageOCCProps } from "./types";
import Image from "next/image";

export const ImageOCC: React.FC<ImageOCCProps> = (props) => {
  const { imageName, alt, className = "" } = props;

  const [imageUrl, setImageUrl] = useState("");

  const getImage = async () => {
    const imageUrl = (await getImageOCC(imageName)) || "";
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    if (imageName) {
      getImage();
    }
  }, [imageName]);

  return <img className={className} src={imageUrl} alt={alt} />;
};
