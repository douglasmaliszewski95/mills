interface AcknowledgmentsCardsProps {
  id?: number;
  cardTitle: string;
  cardDescription: string;
  src: string;
  id?: string;
  textColor?: string;
}

interface OurAcknowledgmentsProps {
  acknowledgmentsCards: AcknowledgmentsCardsProps[];
  title: string;
  theme?: string;
}

export { AcknowledgmentsCardsProps, OurAcknowledgmentsProps };
