import { exclamationIco } from "@/assets";
import Image from "next/image";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { OurServicesProps } from "./types";
import * as Separator from "@radix-ui/react-separator";

export default function OurServices({
  title,
  children,
  tooltipText,
  href,
  checked = false,
  onClick,
}: OurServicesProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(checked);
  }, [checked]);
  return (
    <Collapsible.Root
      className="flex flex-col py-7 gap-3 bg-white w-full"
      open={open}
    >
      <div>
        <div className="flex items-center px-6 justify-between gap-14 text-sm font-normal text-green-800 tablet:gap-2 tablet:items-start">
          <div className="flex items-center gap-2 tablet:flex-col tablet:w-full">
            <p className="font-semibold tablet:w-full tablet:text-xs">
              {title}
            </p>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="tablet:w-full tablet:flex">
                    <Image
                      className="tablet:hidden"
                      src={exclamationIco}
                      alt="tooltip ico"
                    />
                    <a className="desktop:hidden text-orange-500 text-xs italic" href={href ?? ""}>
                      Saiba mais
                    </a>
                  </button>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                  <Tooltip.Content
                    className="max-w-[256px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-white px-3 py-[10px] text-[10px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                    sideOffset={5}
                    align="start"
                  >
                    <p className="text-green-800 text-[10px] leading-relaxed">{tooltipText}</p>
                    <br />
                    <a className="text-orange-500 mt-2" href={href ?? ""}>Saiba mais</a>
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <Collapsible.Trigger asChild>
            <Checkbox.Root
              className={`flex h-[18px] w-[18px] appearance-none items-center justify-center rounded-[4px] outline-none border ${
                open ? "bg-orange-500" : " bg-white"
              }`}
              id="c1"
              onClick={onClick}
            >
              <Checkbox.Indicator>
                <CheckIcon className="text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </Collapsible.Trigger>
        </div>
        <Separator.Root
          className={`bg-gray-30 h-px w-full my-6 ${open ? null : "hidden"}`}
          decorative
          orientation="vertical"
        />
      </div>
      <Collapsible.Content className="px-6 mb-3">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
