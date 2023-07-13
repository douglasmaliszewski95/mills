import { default as InputMaskLib } from "react-input-mask";
import { InputMaskProps } from "./types";

export const InputMask: React.FC<InputMaskProps> = (props) => {
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
