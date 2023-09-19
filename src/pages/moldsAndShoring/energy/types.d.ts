import { ImageCMS } from "@/types";
import { informationCard } from "@/components/shared/About/types";

export interface About {
  title: string;
  description: string;
  informationCard?: informationCard[];
  href_attribute?: string;
}

export interface EnergyContent {
  banner: {
    src: string;
    title: string;
  };
  firstAbout: About;
  secondAbout: About;
  thirdAbout: About;
}
