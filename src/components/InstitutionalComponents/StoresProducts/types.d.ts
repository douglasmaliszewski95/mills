interface cardProps {
    title: string;
    src: string;
    description: string;
    id: string;
    link?: string;
}

interface StoresProductsProps {
    cards: cardProps[];
}

export { StoresProductsProps,cardProps }