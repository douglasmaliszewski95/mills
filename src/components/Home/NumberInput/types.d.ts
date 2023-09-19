export interface NumberInputProps {
  value: number;
  wFull?: boolean;
  setValue: (value: number) => void;
  showTrash?: true | false;
}
