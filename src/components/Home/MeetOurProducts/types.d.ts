import { ThemeProps } from "@/types/commonTypes";

interface Card {
  id: string;
  image: string;
  title: string;
  alt: string;
  href: string;
}

export interface MeetOurProductsProps extends ThemeProps {
  cards: Card[] | undefined;
  isCarrossel?: boolean;
}
