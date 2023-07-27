import React from "react";
import { BestSolutionsCardProps } from "./BestSolutionsCard.types";
import Image from "next/image";

export const BestSolutionsCard = (props: BestSolutionsCardProps) => {
  const { imagePath, title, alt } = props;

  return (
    <li className="flex flex-col gap-2 max-h-[100px]">
      <div className="relative h-[64px]">
        <Image fill src={imagePath} alt={alt} />
      </div>
      <p className="text-center text-orange leading-5">{title}</p>
    </li>
  );
};
