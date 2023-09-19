import { Image } from "@/types";

export interface CardProps {
  image: string;
  title: string;
  alt: string;
  href: string;
  isCarrossel?: boolean;
}
