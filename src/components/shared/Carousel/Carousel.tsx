import { useState } from "react";
import { CarouselProps } from "./types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode } from "react";
import { isStringLiteral } from "typescript";

export const Carousel: React.FC<CarouselProps> = (props) => {
  const {
    children,
    className,
    darkOrangeDot,
    hasDots = true,
    nextArrow = <></>,
    prevArrow = <></>,
    slidesToShow = 1,
    slidesToScroll = 1,
    marginLeft,
    spacing = "-32",
  } = props;
  const [selectedSlide, setSelectedSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    swapToSlide: true,
    nextArrow,
    prevArrow,
    slidesToScroll,
    slidesToShow,
    appendDots: (dots: ReactNode) =>
      !hasDots ? (
        <></>
      ) : (
        <ul style={{ marginBottom: `${spacing}px`, marginLeft: marginLeft }}>
          {dots}
        </ul>
      ),
    customPaging: (index: number) => {
      const isSelected = index * slidesToScroll === selectedSlide;
      const classNameDots = isSelected
        ? `${
            darkOrangeDot ? "bg-orange-800" : "bg-orange-500"
          } flex items-center rounded-full w-[12px] h-[12px] bg-orange-500`
        : "rounded-full w-[8px] h-[8px] bg-gray-400 flex items-center mt-[2px]";

      return <div className={classNameDots}></div>;
    },
    afterChange: (index: number) => {
      setSelectedSlide(index);
    },
  };

  return (
    <Slider {...settings} className={className}>
      {children}
    </Slider>
  );
};
