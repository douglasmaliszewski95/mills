import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { InputSelectorProps } from "./types";
import chevronDown from "@/assets/chevron-down.svg";
import chevronUp from "@/assets/chevron-up.svg";
import Image from "next/image";

export const InputSelector: React.FC<InputSelectorProps> = (props) => {
  const {
    name,
    options = [],
    watch,
    placeholder = "",
    className = "",
    setValue = () => null,
    additionalProps,
    disabled = false,
    theme = "rentalLight",
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const value = watch ? watch(name) : "";

  return (
    <Select.Root
      onOpenChange={(open) => setIsOpen(open)}
      name={name}
      value={value}
      onValueChange={(value) => {
        if (value) {
          setValue(name, value, additionalProps);
        }
      }}
      disabled={disabled}
    >
      <Select.Trigger
        className={`${className} data-[state=open]:outline-2 outline-none pr-3 w-full flex items-center justify-between ${
          theme === "rentalHeavy"
            ? "text-white"
            : value
            ? "text-green-800"
            : "text-gray-400"
        } data-[placeholder]:${
          theme === "rentalHeavy" ? "text-white" : "text-gray-400"
        }/[.36] text-sm data-[placeholder]:leading-5 data-[placeholder]:text-xs border-b-[1px]  py-1 ${
          theme === "rentalHeavy" ? "border-white" : "border-green-800"
        }`}
      >
        <Select.Value placeholder={placeholder}>
          <p>{value}</p>
        </Select.Value>
        <Select.Icon asChild>
          {isOpen ? (
            <Image src={chevronUp} alt="Seta apontando para cima" />
          ) : (
            <Image src={chevronDown} alt="Seta apontando para baixo" />
          )}
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="w-[var(--radix-select-trigger-width)] shadow z-[100]"
        >
          <Select.Viewport>
            <Select.Group className="p-4 pb-2 shadow-md bg-white rounded-b w-full max-h-[400px] overflow-auto">
              {options?.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value}
                  className={`cursor-pointer text-green-800 text-sm p-1 ${
                    index < options.length - 1 &&
                    "border-b-[1px] border-gray-200"
                  } data-[highlighted]:outline-none`}
                />
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ className, value }: any, forwardedRef: any) => {
    return (
      <Select.Item value={value} className={className} ref={forwardedRef}>
        {value}
      </Select.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";
