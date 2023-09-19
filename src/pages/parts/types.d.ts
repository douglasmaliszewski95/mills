import { Item } from "@/components/Category/AboutRental/types";
import { ImageCMS, TextCMS } from "@/types";

export interface TransportContent {
  banner: ImageCMS;
  firstAbout: ImageCMS;
  secondAbout: ImageCMS;
  thirdAbout: ImageCMS;
  fourthAbout: ImageCMS;
  fifthAbout: ImageCMS;
  aboutSmallImage: ImageCMS;
  compressorParts: TextCMS;
  platformParts: TextCMS;
  brandsText: TextCMS;
  differentials: Item[];
  expertRecommendation: ImageCMS;
  orangeInformation: TextCMS;
  greenInformation: TextCMS;
  brands: ImageCMS[];
}
