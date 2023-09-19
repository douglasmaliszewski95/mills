import { StaticImageData } from "next/image";

export interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface AboutRentalProps {
  title: string;
  description?: string;
  items: Item[];
  theme?: "orange-500" | "white" | "gray-50";
  textColor?: string;
  iconFont?: "base";
  largeDescription?: boolean;
  forceTitleDisplay?: boolean;
}
