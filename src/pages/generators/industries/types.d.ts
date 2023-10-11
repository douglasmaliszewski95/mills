import { Item } from "@/components/Category/AboutRental/types";
import { ImageCMS } from "@/types";

export interface IndustriesContent {
  [key: string]: ImageCMS;
  cards: Item[];
}

export interface TextContent {
  products: TextCMS;
  sellParts: string;
  link?: string;
}
