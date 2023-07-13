interface ServiceCard {
  id: string;
  image: string;
  title: string;
  alt: string;
  article: string;
  url: string;
}

export interface OurServicesProps {
  serviceCards: ServiceCard[] | undefined;
}
