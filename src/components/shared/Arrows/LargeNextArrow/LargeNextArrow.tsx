import LargeChevronRight from "@/assets/large-orange-chevron-right.svg";
import { ArrowProps } from "@/types";
import Image from "next/image";

export const LargeNextArrow: React.FC<ArrowProps> = (props) => {
  const { onClick, width = 48, height = 48, customProps } = props;
  const customClass = `absolute top-[50%] p-0 right-12 cursor-pointer ${customProps} h-[${height}px] w-[${width}px]`;

  return (
    <img
      className={customClass}
      onClick={onClick}
      src={LargeChevronRight}
      alt="Seta apontando para direita"
    />
  );
};
