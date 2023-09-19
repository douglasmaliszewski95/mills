import { ImageCMS, TextCMS } from "@/types";

export interface SanitationContent {
  banner: ImageCMS;
  firstAbout: ImageCMS;
  secondAbout: ImageCMS;
  thirdAbout: ImageCMS;
  differentials: Item[];
  constructionCards: ImageCMS[];
  carouselProducts: TextCMS;
}
