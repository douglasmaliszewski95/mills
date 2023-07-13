import { Banner } from "@/pages/types";

export interface ArrowProps {
  onClick?: () => void;
  width?: number;
  height?: number;
  customProps?: string;
}

export interface BannerCarouselProps {
  banners: Banner[] | undefined;
}
