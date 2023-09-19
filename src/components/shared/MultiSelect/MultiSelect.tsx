import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface MultiSelectProps {
  options: { id: string; label: string }[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const handleOptionChange = (id: string) => {
    const updatedSelectedOptions = selectedOptions.includes(id)
      ? selectedOptions.filter((option) => option !== id)
      : [...selectedOptions, id];

    onChange(updatedSelectedOptions);
  };

  return (
    <Listbox as="div" className="space-y-2 font-ibm-font">
      {({ open }) => (
        <>
          <div
            className="flex flex-row gap-1 overflow-auto max-w-[323px]"
            style={{ marginBottom: "-20px" }}
          >
            {selectedOptions.map((selectedOption) => (
              <span
                key={selectedOption}
                className="px-2.5 py-1 text-xs border-orange-500 rounded border"
                style={{ whiteSpace: "nowrap" }}
              >
                {options.find((option) => option.id === selectedOption)?.label}
              </span>
            ))}
          </div>
          <Listbox.Button className="relative h-[25px] max-w-[323px] w-full border-b-green-800 border-b-[1px] text-start cursor-pointer text-green-800/40 text-xs">
            <span className="block truncate">
              {selectedOptions.length === 0 ? "Selecionar" : ""}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options
              static
              className="absolute mt-2 max-w-[323px] w-full bg-white divide-y divide-gray-200 rounded-md shadow border outline-none z-50"
            >
              {options.map((option) => (
                <Listbox.Option key={option.id} value={option.id}>
                  {({ active, checked }: any) => (
                    <div
                      className={`flex items-center p-4 cursor-pointer`}
                      onClick={() => handleOptionChange(option.id)}
                    >
                      <input
                        type="checkbox"
                        className={`form-checkbox h-5 w-5 mr-2 ${
                          checked || selectedOptions.includes(option.id)
                            ? "bg-orange-500 border-transparent"
                            : "border-gray-300"
                        }`}
                        checked={checked || selectedOptions.includes(option.id)}
                        readOnly
                      />
                      <span className={`${checked ? "font-semibold" : ""}`}>
                        {option.label}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default MultiSelect;
