import { CheckboxProps } from "./types";
import { CheckIcon } from "@radix-ui/react-icons";

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { checked, onToggle } = props;

  return (
    <div
      className={`${
        checked ? "bg-orange-500" : "border-2 border-black/50"
      } rounded-sm w-[16px] h-[16px] cursor-pointer`}
      onClick={() => onToggle(checked)}
    >
      {checked && <CheckIcon color="white" />}
    </div>
  );
};
