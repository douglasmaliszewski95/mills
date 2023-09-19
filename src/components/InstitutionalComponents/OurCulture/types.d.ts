interface cultureCardsProps {
  id?: number;
  src: string;
  cardTitle: string;
  cardDescription: string;
}

interface ourCultureProps {
  cultureCards: cultureCardsProps[];
  title: string;
  description: string;
}

export { cultureCardsProps, ourCultureProps };
