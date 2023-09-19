import { ImageCMS, TextCMS } from "@/types";

export interface TransportContent {
  banner: ImageCMS;
  firstAbout: ImageCMS;
  secondAbout: ImageCMS;
  differentials: Item[];
  aboutCarousel: ImageCMS[];
  simpleInformation: TextCMS;
}
