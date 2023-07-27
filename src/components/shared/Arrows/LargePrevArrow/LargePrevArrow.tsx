import LargeChevronLeft from "@/assets/large-orange-chevron-left.svg";
import { ArrowProps } from "@/types";
import Image from "next/image";

export const LargePrevArrow: React.FC<ArrowProps> = (props) => {
  const { onClick, width = 48, height = 48, customProps } = props;
  const customClass = `absolute z-50 top-[50%] p-0 left-12 cursor-pointer ${customProps}`;

  return (
    <Image
      className={customClass}
      onClick={onClick}
      height={height}
      width={width}
      src={LargeChevronLeft}
      alt="Seta apontando para esquerda"
    />
  );
};
