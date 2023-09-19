interface BtnProps {
    title: string;
    link: string;
}

interface RelationshipManualProps{
    title: string;
    description: string;
    firstBtn: BtnProps;
    secondBtn: BtnProps;
}

export { BtnProps, RelationshipManualProps }