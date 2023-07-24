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
}

export interface LeftImgWithRightTextProps {
  img: string;
  headerText: string;
  paragraphText: string;
  buttonProps?: ButtonProps;
  variant?: "orange" | "green";
}

export interface DividerTextProps {
  text: string;
}

export interface BenefitsProps {
  headerText: string;
  cards: CardsProps[];
}

export interface OpinionProps {
  headerText: string;
  paragraphText: string;
  spanText: string;
  testimonial: string;
}

export interface PlatformsProps {
  headerText: string;
  image: string;
  cards: CardBackground[];
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
}
