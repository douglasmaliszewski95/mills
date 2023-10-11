import Image from "next/image";
import { BenefitsProps } from "./types";
import { useCallback, useEffect, useState } from "react";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { DnaTop } from "@/assets/DnaTop";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import dnaTop from "@/assets/dna-top-green.svg";

export const Benefits: React.FC<BenefitsProps> = (props) => {
  const { isDesktop } = useScreenWidth();
  const { theme, headerText } = props;
  const [images, setImages] = useState<any>();
  const [texts, setTexts] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("shared");
    const texts = await getText("shared");
    let filterImages: any = [];

    for (let i = 1; i <= images.icon_segments.length; i++) {
      const search = images.icon_segments.find(
        (x: any) => x.fields.content_order === i
      );
      if (search) filterImages.push(search);
    }

    setImages(filterImages);
    if (texts?.icon_segments?.length >= 1)
      setTexts(
        theme === "rentalHeavy"
          ? texts?.heavy_machinery_segments[0]
          : texts?.icon_segments[0]
      );
  }, []);

  useEffect(() => {
    getContent();
  }, []);
  return (
    <section className="flex justify-center text-green-800 relative">
      {isDesktop && theme === "rentalHeavy" && (
        <div className="absolute mt-[10px] right-3 tablet:right-0">
          <DnaTop width="616" color="#004042" />
        </div>
      )}
      <div className="flex justify-between container tablet:flex-col">
        <div className="flex flex-col py-16 tablet:pt-4 pb-8 tablet:px-4">
          <h3 className="font-semibold w-[610px] text-2xl tablet:text-base tablet:w-full">
            {headerText ? headerText : texts?.fields.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-16 tablet:mt-5">
            {images?.map((image: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4"
                >
                  <img
                    src={image.fields.native.links[0].href}
                    alt={image.description}
                    className="mb-3 tablet:w-10 tablet:mb-0"
                  />
                  <div className="flex flex-col items-center tablet:ml-6 tablet:items-start">
                    <h4 className="font-semibold mb-4 tablet:text-sm">
                      {image.fields.content_title}
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      {image.fields.content_text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
