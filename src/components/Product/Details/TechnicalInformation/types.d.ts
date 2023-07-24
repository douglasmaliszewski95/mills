interface Spec {
  label: string;
  value: string;
}

export interface TechnicalInformationProps {
  technicalInfo: {
    brand: string;
    displayName: string;
    specs: Spec[];
  };
}
