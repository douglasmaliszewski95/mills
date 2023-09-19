import { ImageCMS } from "@/types";

export interface CompressorsContent {
  [key: string]: ImageCMS;
  applications: ImageCMS[];
}

export interface CompressorsContentText {
  products: string[];
  sellParts: string;
}
