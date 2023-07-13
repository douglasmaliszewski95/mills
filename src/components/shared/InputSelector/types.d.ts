export interface InputSelectorProps {
  name: string;
  className?: string;
  options: string[];
  placeholder?: string;
  watch: UseFormWatch<FormInputs>;
  setValue: (name: example | exampleRequired, value: string) => void;
}
