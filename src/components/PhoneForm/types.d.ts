import { ReactNode } from "react";

export interface PhoneFormModalProps {
  children?: ReactNode;
}

export type FormValues = {
  motivo: string;
  name: string;
  ddd: string;
  telephone: string;
};
