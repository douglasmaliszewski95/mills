import { Section } from "@/components/shared/Section/Section";
import { AdvantagesProps } from "./types";
import { getImageSrc } from "@/utils/images";
import { useEffect, useState } from "react";

export const Advantages: React.FC<AdvantagesProps> = (props) => {
  const { title, cards, theme = "green-800" } = props;

  const isBeige = theme === "beige-200";

  return (
    <Section
      sectionClass={`bg-${theme} py-[56px] tablet:pt-6 tablet:pb-8 tablet:px-4`}
    >
      <h4
        className={`${
          isBeige ? "text-green-800" : "text-white"
        } text-2xl font-semibold mb-8 tablet:text-base tablet:max-w-[80%]`}
      >
        {title ?? null}
      </h4>
      <div className="flex tablet:flex-col gap-3 justify-between">
        {cards?.map((card, index) => (
          <div
            key={index}
            className={`bg-white ${
              cards?.length === 4 ? "basis-1/4" : "basis-1/6"
            } ${
              isBeige && "tablet:border-green-800 tablet:border-[1px]"
            } rounded flex flex-col tablet:flex-row items-center pb-[54px] pt-[34px] tablet:pt-4 tablet:pb-4 gap-2 tablet:gap-5 tablet:px-7`}
          >
            <img
              src={getImageSrc(card?.fields)}
              className="h-[52px] tablet:h-[40px] tablet:w-full tablet:max-w-[40px]"
            />
            <p
              className={`text-sm text-green-800 text-center px-[14px] tablet:px-0 tablet:text-left ${
                isBeige && "tablet:text-xs"
              }`}
            >
              {card?.fields?.content_title || card?.fields?.content_text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
