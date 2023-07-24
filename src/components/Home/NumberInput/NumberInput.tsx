import Image from "next/image";
import minusSign from "@/assets/minus-sign.svg";
import plusSign from "@/assets/plus-sign.svg";
import { NumberInputProps } from "./types";
import { onlyNumbersRegex } from "@/utils/regex";

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { value, setValue } = props;

  const increment = () => setValue(value + 1);
  const decrement = () => value > 0 && setValue(value - 1);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumbersRegex.test(e.target.value)) {
      setValue(Number(e.target.value));
    }
  };

  return (
    <div className="flex gap-1 border-b-[1px] border-green-800 pt-[4px]">
      <div
        onClick={decrement}
        className="rounde-sm bg-gray-200 flex justify-center items-center w-[16px] h-[19px] cursor-pointer"
      >
        <img src={minusSign} alt="Sinal de subtração" />
      </div>
      <input
        className="text-xs text-green-800 text-opacity-40 max-w-[32px] text-center focus:outline-orange-500 focus:outline-1"
        maxLength={4}
        value={value}
        onChange={onInputChange}
      />
      <div
        onClick={increment}
        className="rounde-sm bg-gray-200 flex justify-center items-center w-[16px] h-[19px] cursor-pointer"
      >
        <img src={plusSign} alt="Sinal de adição" />
      </div>
    </div>
  );
};
