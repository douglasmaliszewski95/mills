interface CertificationsCardProps {
  src: string;
  description: string;
  title: string;
  description: string;
  id?: number;
}

interface TextWithCarouselProps {
  theme: string;
  title: string;
  description: string;
  certificationCard: CertificationsCardProps[];
}

export { TextWithCarouselProps, CertificationsCardProps };
