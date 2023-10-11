import React from "react";
import { Section } from "@/components/shared/Section/Section";
import { CultureCard } from "./CultureCards/cultureCards";
import { ourCultureProps } from "./types";

export const OurCulture: React.FC<ourCultureProps> = (props) => {
  const { cultureCards = [], description, title } = props;

  return (
    <Section
      containerClass="flex items-center justify-between pt-20 tablet:pt-8 tablet:px-4"
      sectionClass="bg-beige-200"
    >
      <div className="grid grid-cols-2 gap-14 tablet:gap-4 w-full tablet:grid-cols-1">
        <div className="flex flex-col text-green-800 pt-10 tablet:pt-2">
          <h3 className="text-base font-normal tablet:text-xs">{title}</h3>
          <p className="text-[28px] tablet:text-base font-semibold mt-4">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-center pb-24 tablet:pb-8">
          <div className="flex flex-col gap-8">
            {cultureCards.map((cultureCard) => (
              <CultureCard
                key={cultureCard.id}
                cardDescription={cultureCard.cardDescription}
                cardTitle={cultureCard.cardTitle}
                src={cultureCard.src}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
