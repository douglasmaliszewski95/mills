import { Section } from "@/components/shared/Section/Section";
import { CollapsibleSpecsProps } from "./types";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { getImageSrc } from "@/utils/images";
import { ChevronUp } from "@/assets/ChevronUp";
import { ChevronDown } from "@/assets/ChevronDown";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const CollapsibleSpecs: React.FC<CollapsibleSpecsProps> = (props) => {
  const { title, text, cards } = props;
  const [open, setOpen] = useState("");
  const { isMobile, isDesktop } = useScreenWidth();

  const isOpen = open === title;

  return (
    <Section
      sectionClass="bg-orange-500"
      containerClass="flex gap-12 tablet:gap-5 items-center tablet:flex-col tablet:px-4"
    >
      <div className="basis-1/2 pr-[112px] tablet:pr-0">
        <h5 className="text-white font-semibold text-2xl mb-6 tablet:mb-4 tablet:mt-8 tablet:text-base">
          {title ?? null}
        </h5>
        <p className="text-white text-lg tablet:text-xs">{text}</p>
      </div>
      <div
        className={`basis-1/2 flex flex-col tablet:w-full ${
          isDesktop && open === "" ? "gap-6 py-16" : "gap-[10px] py-6"
        }`}
      >
        {cards &&
          cards.map(({ title, icon }, index) => (
            <Collapsible.Root
              key={index}
              className={`bg-white rounded ${
                open === title ? "py-8 tablet:py-6" : "py-3 tablet:pb-2"
              } px-10 tablet:px-4 tablet:w-full`}
              open={open === title}
              onOpenChange={() => setOpen(open === title ? "" : title)}
            >
              <Collapsible.Trigger asChild>
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-4 tablet:gap-2 items-center">
                    <img
                      className="max-w-[50px] w-full tablet:max-w-[20px] tablet:max-w-[20px] max-h-[50px] h-full"
                      src={icon?.fields && getImageSrc(icon?.fields)}
                    />
                    <p className="text-2xl text-green-800 font-semibold tablet:text-sm">
                      {icon?.fields?.content_title}
                    </p>
                  </div>
                  {open === title ? (
                    <ChevronUp
                      color="#004042"
                      width="32"
                      height={isMobile ? "10" : "20"}
                    />
                  ) : (
                    <ChevronDown
                      color="#004042"
                      width="32"
                      height={isMobile ? "10" : "20"}
                    />
                  )}
                </div>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <p className="mt-5 text-green-800 pr-[62px] tablet:pr-0 tablet:text-xs">
                  {icon?.fields?.content_text}
                </p>
              </Collapsible.Content>
            </Collapsible.Root>
          ))}
      </div>
    </Section>
  );
};
