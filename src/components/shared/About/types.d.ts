import { StaticImageData } from "next/image";

export interface AboutProps {
  title: string;
  theme?: "orange-500" | "beige-200" | "green-800";
  color?: "white";
  hasButton?: boolean;
  orientation?: "inverted";
  description: string | string[];
  image: StaticImageData;
  alt: string;
  link?: string;
}
