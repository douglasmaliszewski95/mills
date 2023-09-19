interface IntegrityAndQualityModalProps {
    title: string;
    description: string[];
    id?: number;
}

interface IntegrityAndQualityProps {
    title: string;
    description: string;
    buttons: IntegrityAndQualityModalProps[];
}

export { IntegrityAndQualityProps, IntegrityAndQualityModalProps }