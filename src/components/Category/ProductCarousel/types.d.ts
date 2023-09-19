import { Product } from "@/types";

export interface ProductCarouselProps {
  backgroundColor: string;
  title: string;
  href: string;
  paragraphs: string[];
  products: Product[];
  variant?: "white";
}
