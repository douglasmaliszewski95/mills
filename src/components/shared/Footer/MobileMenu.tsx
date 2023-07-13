import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "@/assets/ChevronDown";
import { ChevronUp } from "@/assets/ChevronUp";

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root
      className="w-full mb-4"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <span>Conheça a Mills</span>
        <Collapsible.Trigger asChild>
          <button>
            {open ? <ChevronUp width="10" /> : <ChevronDown width="10" />}
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content>
        <div className="flex flex-col gap-4 bg-white rounded-sm mt-2 pt-4 pb-6 pl-6 text-orange-500 font-medium text-sm">
          <span>Mills Cotia</span>
          <span>Mills Cachoeirinha</span>
          <span>Mills Serra</span>
          <span>Mills Osasco</span>
          <span>Mills Camaçari</span>
          <span>Mills Pinheiros</span>
          <span>Mills Rio de Janeiro</span>
          <span>Mills Contagem</span>
          <span>Mills Uberlândia</span>
          <span>Mills Fortaleza</span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default MobileMenu;
