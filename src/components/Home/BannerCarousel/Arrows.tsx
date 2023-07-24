import Image from "next/image";
import chevronLeft from "@/assets/orange-chevron-left.svg";
import chevronRight from "@/assets/orange-chevron-right.svg";
import { ArrowProps } from "./types";

export const NextArrow: React.FC<ArrowProps> = (props) => {
  const { onClick, width = 48, height = 48, customProps } = props;
  const customClass = `absolute top-[50%] p-0 right-12 cursor-pointer ${customProps} w-[${width}px] h-[${height}px]`;

  return (
    <img
      className={customClass}
      onClick={onClick}
      src={chevronRight}
      alt="Seta apontando para direita"
    />
  );
};

export const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { onClick, width = 48, height = 48, customProps } = props;
  const customClass = `absolute z-10 top-[50%] p-0 left-12 cursor-pointer ${customProps} w-[${width}px] h-[${height}px]`;
  return (
    <img
      className={customClass}
      onClick={onClick}
      src={chevronLeft}
      alt="Seta apontando para a esquerda"
    />
  );
};
