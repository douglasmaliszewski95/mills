import { StaticImageData } from "next/image";

export interface AboutProps {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
}
