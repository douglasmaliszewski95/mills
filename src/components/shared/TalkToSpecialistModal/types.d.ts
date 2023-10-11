import { ReactNode } from "react";

export interface TalkToSpecialistModalProps {
  children?: ReactNode;
}

export type FormValues = {
  name: string;
  email: string;
  phone: string;
  comment?: string;
};
