export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  name?: string;
  error?: FieldError | undefined;
  className?: string;
  register?: UseFormRegister<Inputs>;
  type?: any;
  mask?: string;
  color?: "green" | "white";
  marginOnError?: boolean;
}
