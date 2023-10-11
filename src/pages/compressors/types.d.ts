import { ImageCMS } from "@/types";

export interface CompressorsContent {
  [key: string]: ImageCMS;
  applications: ImageCMS[];
}

export interface CompressorsContentText {
  products: TextCMS;
  sellParts: string;
}
