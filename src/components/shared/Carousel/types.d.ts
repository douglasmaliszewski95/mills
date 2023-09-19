import { Component } from "react";

export interface CarouselProps {
  children: ReactNode;
  className?: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  darkOrangeDot?: boolean;
  nextArrow?: any;
  prevArrow?: any;
  spacing?: string;
  marginLeft?: string;
  hasDots?: boolean;
  variableWidth?: boolean;
  adaptiveHeight?: boolean,
  infinite?: boolean;
  smallDots?: boolean;
}
