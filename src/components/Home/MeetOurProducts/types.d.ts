interface Card {
  id: string;
  image: string;
  title: string;
  alt: string;
}

export interface MeetOurProductsProps {
  cards: Card[] | undefined;
}
