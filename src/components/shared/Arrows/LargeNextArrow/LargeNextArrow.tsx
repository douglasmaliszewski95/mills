import LargeChevronRight from "@/assets/large-orange-chevron-right.svg";
import LargeChevronRightWhite from "@/assets/large-white-chevron-right.svg";
import LargeChevronRightGreen from "@/assets/large-green-chevron-right.svg";
import { ArrowProps } from "@/types";
import Image from "next/image";

export const LargeNextArrow: React.FC<ArrowProps> = (props) => {
  const {
    onClick,
    width = 48,
    height = 48,
    customProps,
    arrowBorderRightDistance,
    arrowColor = "orange",
  } = props;
  const customClass = `absolute top-[50%] p-0 ${
    arrowBorderRightDistance ? arrowBorderRightDistance : "right-12"
  } cursor-pointer ${customProps}`;

  if (arrowColor === "white") {
    return (
      <Image
        className={customClass}
        onClick={onClick}
        height={height}
        width={width}
        src={LargeChevronRightWhite}
        alt="Seta apontando para direita"
      />
    );
  }

  if (arrowColor === "green") {
    return (
      <Image
        className={customClass}
        onClick={onClick}
        height={height}
        width={width}
        src={LargeChevronRightGreen}
        alt="Seta apontando para direita"
      />
    );
  }

  return (
    <Image
      className={customClass}
      onClick={onClick}
      height={height}
      width={width}
      src={LargeChevronRight}
      alt="Seta apontando para direita"
    />
  );
};
