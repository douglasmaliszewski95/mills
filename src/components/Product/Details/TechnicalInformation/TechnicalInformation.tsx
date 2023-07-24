import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronUp } from "@/assets/ChevronUp";
import { ChevronDown } from "@/assets/ChevronDown";
import { TechnicalInformationProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const TechnicalInformation: React.FC<TechnicalInformationProps> = (
  props
) => {
  const [open, setOpen] = useState(false);
  const { technicalInfo } = props;

  const { isMobile } = useScreenWidth();

  return (
    <Collapsible.Root className="w-full" open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className="flex justify-between w-full py-4">
          <p className="text-green-800 font-semibold">Informações Técnicas</p>
          <button>
            {open ? <ChevronUp /> : <ChevronDown color="#F37021" />}
          </button>
        </div>
      </Collapsible.Trigger>
      {isMobile && open && (
        <div className="w-full h-[1px] bg-gray-200 tablet:mb-6"></div>
      )}
      <Collapsible.Content className={`flex flex-col gap-2 ${open && "mb-8"}`}>
        <p className="text-green-800 text-sm font-medium">
          {technicalInfo.brand}
        </p>
        <p className="text-green-800 text-sm font-medium">
          {technicalInfo.displayName}
        </p>
        {technicalInfo.specs.map(({ label, value }, index) => (
          <p
            key={index}
            className="text-green-800 text-sm font-medium"
          >{`${label}: ${!!value ? value : "N/A"}`}</p>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
