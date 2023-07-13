import { Product } from "@/types";

export interface ProductCarouselProps {
  backgroundColor: string;
  title: string;
  paragraphs: string[];
  products: Product[];
  variant?: "white";
}
