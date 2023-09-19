import { ImageCMS } from "@/types";

export interface ConstructionContent {
  [key: string]: ImageCMS;
  cards: Item[];
}

export interface ConstructionContentText {
  products: string[];
  sellParts: string;
}
