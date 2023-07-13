import React from "react";
import { RadioGroupProps } from "./types";
import { radioButtonStyles } from "./styles";

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { id, options, onChange = () => null } = props;

  return (
    <fieldset id={id} className="flex gap-4 justify-between">
      {options.map(({ value, label }) => (
        <div key={label} className="flex gap-2 w-full items-center">
          <input
            type="radio"
            id={id}
            name={id}
            value={value}
            onChange={() => onChange(value)}
            className={radioButtonStyles()}
          />
          <label>{label}</label>
        </div>
      ))}
    </fieldset>
  );
};
