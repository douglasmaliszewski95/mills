interface IntCardProps {
  title: string;
  description: string;
  buttonText: string;
  src: string;
  id?: number;
  link?: string;
}

interface InterestCardsProps {
  title: string;
  cards: IntCardProps[];
}

export { IntCardProps, InterestCardsProps };
