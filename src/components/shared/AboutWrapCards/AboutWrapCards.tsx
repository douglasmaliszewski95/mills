import React from "react";
import { Section } from "../Section/Section";
import { AboutWrapCardsProps } from "./types";
import { getImageSrc } from "@/utils/images";

export const AboutWrapCards: React.FC<AboutWrapCardsProps> = (props) => {
  const { image, title, cards } = props;

  return (
    <Section
      sectionClass="bg-beige-100"
      containerClass="flex gap-12 tablet:flex-col tablet:gap-0"
    >
      <div className="basis-1/2">
        <img src={image} />
      </div>
      <div className="basis-1/2 flex flex-col justify-center tablet:px-4 tablet:py-6">
        <h5 className="text-green-800 text-2xl font-semibold mb-7 tablet:text-base tablet:max-w-[80%]">
          {title}
        </h5>
        <div className="flex flex-wrap gap-x-2 gap-y-4 tablet:flex-col tablet:gap-[6px]">
          {cards?.map((text: string, index: number) => (
            <p
              key={index}
              className="text-green-800 bg-white p-3 tablet:p-[10px] rounded tablet:w-full tablet:text-center tablet:text-sm"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
};
