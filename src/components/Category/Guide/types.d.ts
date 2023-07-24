interface Card {
  id: string;
  title: string;
  description: string;
}

export interface GuideProps {
  cards: Card[];
}
