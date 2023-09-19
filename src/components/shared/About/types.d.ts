import { StaticImageData } from "next/image";

interface informationCard {
  title?: string;
  description?: string;
  src?: string;
}
export interface AboutProps {
  title: string;
  theme?: "orange-500" | "beige-200" | "green-800";
  color?: "white";
  hasButton?: boolean;
  buttonTitle?: string;
  buttonVariant?: string;
  orientation?: "inverted";
  description: string | string[];
  image: string;
  alt: string;
  link?: string;
  forceImageDisplayOnMobile?: boolean;
  forceDnaOnMobile?: boolean;
  dnaColor?: "#F37021" | "#004042";
  dnaWidth?: string;
  type?: "banner" | "carousel";
  informationCards?: informationCard[];
  imagePadding?: string;
  hideImage?: boolean;
  textFullLength?: boolean;
  mobileImageFirst?: boolean;
  dnaOnTop?: boolean;
  costumizedButtonClass?: string;
}
