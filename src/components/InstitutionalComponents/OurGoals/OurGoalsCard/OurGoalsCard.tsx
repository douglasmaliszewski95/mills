import { Section } from "@/components/shared/Section/Section";
import { GoalsCardProps } from "../types";
import React from "react";

export const OurGoalsCard: React.FC<GoalsCardProps> = (props) => {
  const { cardDescription, cardTitle, id, src } = props;
  return (
    <Section containerClass="flex tablet:flex-col tablet:h-[414px]">
      <div className="w-[44%] tablet:h-[161px] tablet:w-full bg-green-800 tablet:rounded-t-xl rounded-l-xl">
        <img src={src} className="w-full h-full object-fit" />
      </div>
      <div
        className={`bg-green-800 text-white tablet:h-[253px] 
        items-center tablet:items-start px-20 tablet:px-8 
        flex flex-row tablet:flex-col tablet:w-full w-[56%] 
        tablet:rounded-b-lg roundedr-xl`}
      >
        <h3 className="text-[200px] tablet:text-[100px] absolute">{id}</h3>
        <div className="pl-32 tablet:pt-32 tablet:pl-2">
          <h2 className="text-lg font-semibold mb-2 tablet:text-sm">
            {cardTitle}
          </h2>
          <p className="text-base font-normal tablet:text-xs tablet:font-normal tablet:mb-4">
            {cardDescription}
          </p>
        </div>
      </div>
    </Section>
  );
};
