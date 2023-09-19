interface SustainabilityJourneyButtonsCardProps {
    src: string;
    title: string;
    description: string;
    id: number
}

interface SustainabilityJourneyButtonsProps {
    title: stirng;
    cards: SustainabilityJourneyButtonsCardProps[]
    ods: odsInterface[];
}

interface odsInterface {
    src: string;
    description: string;
}


export { SustainabilityJourneyButtonsProps, SustainabilityJourneyButtonsCardProps, odsInterface }