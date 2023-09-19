interface MainWorkCardProps {
    src: string;
    title: string;
    id?: number;
}

interface MainWorkProps {
    workCardsData?: MainWorkCardProps[];
    title: string;
}