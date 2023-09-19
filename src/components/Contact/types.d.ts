export interface ContactFormProps {
  img: string;
  headerText?: string;
  paragraphText?: string;
  buttonProps?: ButtonProps;
  variant?: "orange" | "green";
  bgImage?: true | false;
  hideImageInMobileMode?: true | false;
  reverse?: true | false;
  onSubmit: SubmitHandler;
}

export type ContactFormType = {
  name: string;
  email: string;
  telefone: string;
  cnpj: string;
  motivo: string;
  comentarios?: string;
}