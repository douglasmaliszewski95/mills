import { Item } from "@/components/Category/AboutRental/types";
import { ImageCMS } from "@/types";

interface Individuals {
  text: string;
  textCards: string[];
}

export interface InfrastructureContent {
  [key: string]: ImageCMS;
  cards: Item[];
}

export interface InfrastructureContentText {
  individuals: Individuals;
  products: string[];
  sellParts: string;
}
