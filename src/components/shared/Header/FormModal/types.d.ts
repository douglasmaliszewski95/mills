export interface FormModalProps {
  onSubmit: (data: RequestQuoteFormType) => void;
  open: boolean;
  closeModal: () => void;
}
