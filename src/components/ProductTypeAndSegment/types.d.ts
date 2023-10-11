import { TextCMS } from "@/types";

export interface RightImgWithLeftButtonsProps {
  img: string;
  headerText: string;
  textCards?: string[];
  buttonProps?: ButtonProps;
  width?: string;
  imageHeight?: string;
}

export interface RightImgWithLeftTextProps {
  img: string;
  headerText: string;
  buttonProps?: ButtonProps;
  text: string;
  bgColor?: string;
  bgImage?: true | false;
  textColor?: string;
  showMobile?: true | false;
  reverse?: true | false;
  variant?: "default" | "outlined" | "disabled" | "inverted";
  theme?: string;
  bgWidth?: string;
}

export interface LeftImgWithRightTextProps {
  img: string;
  headerText?: string;
  paragraphText?: string;
  buttonProps?: ButtonProps;
  variant?: "orange" | "green";
  bgImage?: true | false;
  hideImageInMobileMode?: true | false;
  reverse?: true | false;
  paddingBottom?: string;
  isTalkToSpecialist?: boolean;
}

export interface DividerTextProps {
  text: string;
}

export interface BenefitsProps {
  headerText?: string;
  cards?: CardsProps[];
  theme?: string;
}

export interface OpinionProps {
  headerText?: string;
  paragraphText?: string;
  spanText?: string;
  testimonial?: string;
  content?: TextCMS;
  theme?: "rentalHeavy" | "rentalLight";
}

export interface PlatformsProps {
  bgColor?: string;
}

interface CardBackground {
  image: string;
  headerText: string;
  buttonText: string;
}

interface TalkToSpecialistProps {
  headerText: string;
  buttonProps?: ButtonProps;
}

interface CardsProps {
  icon: any;
  header: string;
  text: string;
}

interface ButtonProps {
  text: string;
  link?: string;
}

interface LiftingPlatformsProps {
  headerText: string;
  textCards?: string[];
  buttonProps?: ButtonProps;
}
