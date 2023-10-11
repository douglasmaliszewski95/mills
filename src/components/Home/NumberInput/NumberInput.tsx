import Image from "next/image";
import minusSign from "@/assets/minus-sign.svg";
import plusSign from "@/assets/plus-sign.svg";
import { trashIco } from "@/assets";
import { NumberInputProps } from "./types";
import {  watchCart } from "@/services/hooks/useCurrentSiteTheme";
import { onlyNumbersRegex } from "@/utils/regex";
import { useContext } from "react";

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { value, setValue, showTrash = false, wFull = false } = props;
  const {setWatch, watch} = useContext(watchCart)
  const increment = () => setValue(value + 1);
  const decrement = () => {
    value === 1 && setWatch(watch + 1)
    value > 0 && setValue(value - 1)
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumbersRegex.test(e.target.value)) {
      setValue(Number(e.target.value));
    }
  };

  return (
    <div
      className={`flex gap-1 border-b-[1px] border-green-800 pt-[4px] ${
        wFull && "w-full justify-between"
      } 1tablet:w-full tablet:justify-between`}
    >
      {value <= 1 && showTrash ? (
        <div
          onClick={decrement}
          className="rounde-sm flex justify-center items-center w-[16px] h-[19px] cursor-pointer"
        >
          <Image src={trashIco} alt="lixo icone" />
        </div>
      ) : (
        <div
          onClick={decrement}
          className="rounde-sm bg-gray-200 flex justify-center items-center w-[16px] h-[19px] cursor-pointer"
        >
          <Image src={minusSign} alt="Sinal de subtração" />
        </div>
      )}

      <input
        className={`text-xs text-green-800 ${
          wFull ? "max-w-full" : "max-w-[32px]"
        } text-center focus:outline-orange-500 focus:outline-1 ${
          value > 0 ? "" : "text-opacity-40"
        } `}
        maxLength={4}
        value={value}
        onChange={onInputChange}
      />
      <div
        onClick={increment}
        className="rounde-sm bg-gray-200 flex justify-center items-center w-[16px] h-[19px] cursor-pointer"
      >
        <Image src={plusSign} alt="Sinal de adição" />
      </div>
    </div>
  );
};
