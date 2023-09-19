interface ServiceCard {
  id: string;
  image: string;
  title: string;
  alt: string;
  article: string;
  url: string;
  href: string;
}

export interface OurServicesProps {
  serviceCards: ServiceCard[] | undefined;
  theme?: string;
}
