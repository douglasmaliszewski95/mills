export interface BestSolutionsCardProps {
  imagePath: string;
  title: string;
  alt: string;
}

/*
import React from 'react';
import { BestSolutionsCardProps } from './BestSolutionsCard.types';
import Image from 'next/image';


export const BestSolutionsCard = (props: BestSolutionsCardProps) => {
  const { imagePath, title, alt } = props;
  
  return (
    <li className="flex flex-col gap-2 max-h-[100px]">
      <Image width={64} height={64} src={imagePath} alt={alt} className="h-[64px] max-w-none w-none"  />
      <p className="text-center text-orange leading-5">{title}</p>
    </li>
  )
}
*/