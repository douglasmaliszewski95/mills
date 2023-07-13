import React, { useCallback, useState } from "react";
import { InputProps } from "./types";
import { inputStyles } from "./styles";
import { InputMask } from "../InputMask/InputMask";

export const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    placeholder = "",
    label,
    className,
    error,
    mask,
    color = "white",
    register = () => null,
    marginOnError = false,
  } = props;

  const [maskedValue, setMaskedValue] = useState("");

  const changeMaskedValue = useCallback(({ target: { value } }: any) => {
    const formattedString = value.replace(/\D/g, "");
    setMaskedValue(formattedString);
  }, []);

  return (
    <div
      className={`${className} flex flex-col ${
        marginOnError && error && "mb-4"
      }`}
    >
      <label
        className={`${
          color === "green" ? "text-green-800" : "text-white"
        } text-sm mb-4`}
      >
        {label}
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          name={name ?? ""}
          value={maskedValue}
          placeholder={placeholder}
          onChange={changeMaskedValue}
          register={register}
          className={inputStyles({
            intent: color,
          })}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          {...register(name)}
          className={inputStyles({
            intent: color,
          })}
        />
      )}
      {error && (
        <p className="text-red-600 mb-[-16px] text-xs">{error.message}</p>
      )}
    </div>
  );
};
