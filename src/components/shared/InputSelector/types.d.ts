interface state {
  code: string;
  name: string;
}

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

export interface InputStateSelectorProps {
  name: string;
  className?: string;
  options: state[];
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
