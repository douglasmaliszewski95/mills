export interface InputMaskProps {
  mask: string;
  maskChar?: string;
  className: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: ({ target: { value: string } }) => void;
  register: UseFormRegister<Inputs>;
}
