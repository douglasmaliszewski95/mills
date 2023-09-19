interface Card {
  backgroundImage: string;
  label: string;
  href: string;
}

export interface OtherTypesProps {
  title: string;
  description?: string[];
  cards?: Card[];
}
