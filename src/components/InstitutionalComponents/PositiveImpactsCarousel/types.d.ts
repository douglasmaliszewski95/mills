interface PositiveImpactsCarouselCardsProps {
    title: string;
    description: string;
    src: string;
    id: number
    link: string;
    btnTitle: string;
}

interface PositiveImpactsCarouselProps {
    title: string;
    cards: PositiveImpactsCarouselCardsProps[];
}

export {PositiveImpactsCarouselProps, PositiveImpactsCarouselCardsProps}