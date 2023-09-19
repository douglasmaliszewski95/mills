import LargeChevronLeft from "@/assets/large-orange-chevron-left.svg";
import LargeChevronLeftWhite from "@/assets/large-white-chevron-left.svg";
import { ArrowProps } from "@/types";
import Image from "next/image";

export const LargePrevArrow: React.FC<ArrowProps> = (props) => {
  const {
    onClick,
    width = 48,
    height = 48,
    customProps,
    arrowColor = "orange",
    arrowBorderRightDistance,
  } = props;
  const customClass = `absolute z-50 top-[50%] p-0 ${
    arrowBorderRightDistance ? arrowBorderRightDistance : "left-12"
  }  cursor-pointer ${customProps}`;

  if (arrowColor === "white") {
    return (
      <Image
        className={customClass}
        onClick={onClick}
        height={height}
        width={width}
        src={LargeChevronLeftWhite}
        alt="Seta apontando para esquerda"
      />
    );
  }

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
