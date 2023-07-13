import { StaticImageData } from "next/image";

export interface Image {
  blurHeight: number;
  blurWidth: number;
  height: number;
  src: string;
  width: number;
}

interface Spec {
  name: string;
  value: string;
}

export interface Product {
  id?: string;
  image: StaticImageData | Image;
  model: string;
  description: string;
  specs: Spec[];
}

export type Inputs = {
  example: string;
  exampleRequired: string;
};

export interface RequestQuoteFormType {
  name: string;
  email: string;
  phone: string;
  comment?: string;
}

export interface ArrowProps {
  onClick?: () => void;
  width?: number;
  height?: number;
  customProps?: string;
}
