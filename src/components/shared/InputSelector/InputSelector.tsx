import React, { ReactNode, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { InputSelectorProps } from "./types";
import chevronDown from "@/assets/chevron-down.svg";
import chevronUp from "@/assets/chevron-up.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";

export const InputSelector: React.FC<InputSelectorProps> = (props) => {
  const {
    name,
    options,
    watch,
    placeholder = "",
    className = "",
    setValue = () => null,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const value = watch(name);

  return (
    <Select.Root
      onOpenChange={(open) => setIsOpen(open)}
      name={name}
      onValueChange={(value) => {
        if (value) {
          setValue(name, value);
        }
      }}
    >
      <Select.Trigger
        className={`${className} data-[state=open]:outline-2 outline-none pr-3 w-full flex items-center justify-between text-green-800 data-[placeholder]:text-green-800/[.36] text-sm data-[placeholder]:leading-5 data-[placeholder]:text-xs border-b-[1px] border-green-800 py-1`}
      >
        <Select.Value placeholder={placeholder}>{value}</Select.Value>
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
          className="w-[var(--radix-select-trigger-width)] shadow"
        >
          <Select.Viewport>
            <Select.Group className="p-4 pb-2 shadow-md bg-white rounded-b w-full">
              {options.map((value, index) => (
                <Select.Item
                  key={index}
                  value={value}
                  className={`cursor-pointer text-green-800 text-sm p-1 ${
                    index < options.length - 1 &&
                    "border-b-[1px] border-gray-200"
                  } data-[highlighted]:outline-none`}
                >
                  {value}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
