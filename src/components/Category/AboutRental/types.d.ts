import { StaticImageData } from "next/image";

interface Item {
  id: string;
  title: string;
  description: string;
  image: Image | StaticImageData;
  alt: string;
}

export interface AboutRentalProps {
  title: string;
  description: string;
  items: Item[];
}
