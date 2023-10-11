import { ReactNode } from "react";

export interface WhatsappFormModalProps {
  children?: ReactNode;
}

export type FormValues = {
  name: string;
  email: string;
  ddd: string;
  telephone: string;
};
