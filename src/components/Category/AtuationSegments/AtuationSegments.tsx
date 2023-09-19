import { Section } from "@/components/shared/Section/Section";
import { AtuationSegmentsProps } from "./types";
import { getImageSrc } from "@/utils/images";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Component } from "react";

export const AtuationSegments: React.FC<AtuationSegmentsProps> = (props) => {
  const { title, description, cards } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section
      containerClass="flex gap-12 items-center tablet:flex-col tablet:px-4 tablet:pt-8 tablet:gap-6 tablet:pb-[74px]"
      sectionClass="bg-orange-500 relative"
    >
      <div className="basis-1/2 pr-[120px] tablet:pr-0">
        <h3 className="text-white font-semibold text-2xl mb-6 tablet:text-base">
          {title}
        </h3>
        <p className="text-white text-lg tablet:text-xs">{description}</p>
      </div>
      {isMobile ? (
        <div className="max-w-[100%] h-[192px]">
          <Carousel variableWidth hasDots={false} infinite={false}>
            {cards.map((image) => (
              <a key={image.name} href={image?.fields?.href_attribute ?? "#"}>
                <div style={{ width: "184px" }}>
                  <div
                    className="w-[176px] h-[192px] rounded-lg"
                    style={{
                      backgroundImage: `url(${getImageSrc(image?.fields)})`,
                    }}
                  >
                    <div className="w-full h-full bg-black/60 rounded-lg flex items-center justify-center pr-2">
                      <p className="text-lg text-white font-semibold text-center">
                        {image?.fields?.content_title}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="basis-1/2 grid grid-rows-2 grid-cols-3 gap-6 pt-10 pb-[54px] tablet:pt-0 tablet:pb-0">
          {cards.map((image) => (
            <a key={image.name} href={image?.fields?.href_attribute ?? "#"}>
              <div
                className="w-[176px] h-[192px] rounded-lg"
                style={{
                  backgroundImage: `url(${getImageSrc(image?.fields)})`,
                }}
              >
                <div className="w-full h-full bg-black/60 rounded-lg flex items-center justify-center px-4">
                  <p className="text-lg text-white font-semibold text-center">
                    {image?.fields?.content_title}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Section>
  );
};
