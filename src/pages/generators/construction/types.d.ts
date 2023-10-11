import { ImageCMS } from "@/types";

export interface ConstructionContent {
  [key: string]: ImageCMS;
  cards: Item[];
}

export interface ConstructionContentText {
  products: TextCMS;
  sellParts: string;
}
