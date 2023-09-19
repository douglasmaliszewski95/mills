interface GoalsCardProps {
  id?: number;
  cardTitle: string;
  cardDescription: string;
  src: string;
}

interface OurGoalsProps {
  goalsCards: GoalsCardProps[];
  title: string;
  description: string;
}

export { GoalsCardProps, OurGoalsProps };
