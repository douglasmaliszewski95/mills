import { Image } from "@/types";

export interface CardProps {
  title: string;
  image: string;
  hoverImage: string;
  alt: string;
  content_order: string;
  href: string;
  theme: "rentalLight" | "rentalHeavy";
  props?: any;
}
