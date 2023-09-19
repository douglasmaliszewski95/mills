interface SustainabilityJourneyCardProps {
    image: string;
    title: string;
    text: string;
    description: string;
    id: number
    links?: string; 
}

interface SustainabilityJourneyProps {
    cards: SustainabilityJourneyCardProps[];
}

export { SustainabilityJourneyCardProps, SustainabilityJourneyProps }