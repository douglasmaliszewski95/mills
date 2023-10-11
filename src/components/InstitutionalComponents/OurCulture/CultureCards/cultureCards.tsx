import React from "react";
import { cultureCardsProps } from "../types";

export const CultureCard: React.FC<cultureCardsProps> = (props) => {
  const { cardDescription, src, cardTitle } = props;

  return (
    <div className="bg-white flex items-center flex-row  tablet:w-full w-[562px] h-[107px] tablet:h-[134px] px-8">
      <img className="w-[53px] h-[60px] pr-4" src={src} />
      <div className="flex flex-col align-center justify-center text-green-800 h-[70px] gap-1">
        <h3 className="text-lg font-semibold tablet:text-sm">{cardTitle}</h3>
        <h6 className="text-base font-normal tablet:text-xs">{cardDescription}</h6>
      </div>
    </div>
  );
};
