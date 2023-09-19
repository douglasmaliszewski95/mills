import { Image } from "@/types";
import ThemeProps from "@/types/commonTypes";

interface Segments {
  id: string;
  title: string;
  image: string;
  hoverImage: string;
  alt: string;
  content_order: string;
  href: string;
}

export interface SegmentsProps {
  segments: Segments[] | undefined;
  isHome?: boolean;
  title?: string;
  texts?: string[];
  theme?: ThemeProps;
  bgColor?: string;
}
