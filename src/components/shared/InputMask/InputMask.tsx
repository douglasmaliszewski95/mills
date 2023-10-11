import { default as InputMaskLib } from "react-input-mask";
import { InputMaskProps } from "./types";
import React from "react";

export const InputMask = (props: InputMaskProps) => {
  const { value, onChange, mask, className, register, name, placeholder } =
    props;

  return (
    <InputMaskLib
      name={name}
      {...register(name)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      mask={mask}
      maskChar=""
      className={className}
    />
  );
};
