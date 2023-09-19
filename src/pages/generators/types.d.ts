import { ImageCMS, TextCMS } from "@/types";

export interface GeneratorsContent {
  [key: string]: ImageCMS;
  banner: ImageCMS | undefined;
  applications: ImageCMS[];
}

export interface GeneratorsTextContent {
  gerador_diesel: TextCMS[];
  products: string[];
  [key: string]: TextCMS;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  position: number;
}
