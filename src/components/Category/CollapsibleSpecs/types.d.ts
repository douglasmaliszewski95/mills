import { ImageCMS } from "@/types";

interface Card {
  title: string;
  icon: ImageCMS | undefined;
}

export interface CollapsibleSpecsProps {
  title: string;
  text: string;
  cards: Card[];
}
