export interface InputSelectorProps {
  name: string;
  className?: string;
  options: string[];
  placeholder?: string;
  watch?: UseFormWatch<FormInputs>;
  additionalProps?: any;
  disabled?: boolean;
  setValue: (
    name: example | exampleRequired,
    value: string,
    additionalProps
  ) => void;
  theme?: string;
}
