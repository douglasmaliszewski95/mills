import { Image } from "@/types";

interface Card {
  id: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export interface UtilizationsProps {
  title: string;
  description: string;
  theme?: "orange";
  cards: Card[];
  page?: string;
}
