import { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  blur?: string;
  sectionClass?: string;
  containerClass?: string;
  backgroundImage?: string;
  divGradient?: string;
  backgroundLines?: {
    src: string;
    position: string;
  };
}
