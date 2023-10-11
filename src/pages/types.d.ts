interface Banner {
  id: string;
  src: string;
  srcMobile: string;
  title: string;
  buttonTitle: string;
  href?: string;
  alt?: string;
}

interface Card {
  id: string;
  image: string;
  title: string;
  alt: string;
}

interface ServiceCard {
  id: string;
  image: string;
  title: string;
  alt: string;
  article: string;
  url: string;
}

export interface HomeSectionsProps {
  banners?: Banner[];
  ourProducts?: Card[];
  ourServices?: ServiceCard[];
  numbers: {
    bannerDesktop: string;
    bannerMobile: string;
  };
}
