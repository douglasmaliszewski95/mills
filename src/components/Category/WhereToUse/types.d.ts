import { Image } from "@/types";

interface Segment {
  id: string;
  title: string;
  image: Image;
  alt: string;
}

export interface WhereToUseProps {
  title: string;
  descriptions: string[];
  segments: Segment[];
}
