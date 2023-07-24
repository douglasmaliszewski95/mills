import { Image } from "@/types";

interface Card {
  id: string;
  title: string;
  image: Image;
  alt: string;
}

export interface UtilizationsProps {
  title: string;
  description: string;
  theme?: "orange";
  cards: Card[];
}
