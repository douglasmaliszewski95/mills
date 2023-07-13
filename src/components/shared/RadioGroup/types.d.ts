interface Option {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  id: string;
  options: Option[];
  onChange?: (value: string) => void;
  index?: number;
}
