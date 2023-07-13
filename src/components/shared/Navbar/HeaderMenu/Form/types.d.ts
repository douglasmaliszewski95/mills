export interface RequestQuoteFormType {
  name: string;
  email: string;
  phone: string;
  comment?: string;
}

export interface FormProps {
  onSubmit: (data: RequestQuoteFormType) => void;
}
