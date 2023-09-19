import { ImageCMS, TextCMS } from "@/types";
import { Section } from "../Section/Section";
import { CarouselTabsProps } from "./types";
import { useState } from "react";
import { LargeChevronLeft } from "@/assets/LargeChevronLeft";
import { LargeChevronRight } from "@/assets/LargeChevronRight";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "@/assets/ChevronDown";
import { ChevronUp } from "@/assets/ChevronUp";

export const CarouselTabs: React.FC<CarouselTabsProps> = (props) => {
  const { tabs, theme = "orange-500", bgTheme = "white" } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const { isMobile } = useScreenWidth();
  const [currentValue, setCurrentValue] = useState("item-1");

  const isGreen = theme === "green-800";
  const isBeige = bgTheme === "beige-200";

  return isMobile ? (
    <Accordion.Root
      className={`bg-${bgTheme} px-4`}
      type="single"
      onValueChange={(value) => setCurrentValue(value)}
      defaultValue="item-1"
      collapsible
    >
      {tabs?.map((tab: TextCMS, index) => (
        <Accordion.Item
          key={tab?.description}
          value={`item-${index + 1}`}
          className={`border-b-[1px] ${
            isBeige && "border-[#CCCCCC]"
          } data-[state=closed]:opacity-60`}
        >
          <Accordion.Trigger
            className={`text-sm gap-4 flex text-${theme} justify-between items-center text-left font-semibold py-8`}
          >
            <p className="w-full">{tab?.fields?.title}</p>
            {currentValue === `item-${index + 1}` ? (
              <ChevronUp color="#004042" width="22" height="10" />
            ) : (
              <div className="mr-1">
                <ChevronDown color="#004042" width="20" height="9" />
              </div>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <p className="text-green-800 text-xs pb-8">
              {tab?.fields?.text_field?.[0]}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ) : (
    tabs && (
      <Section sectionClass={`bg-${bgTheme}`} containerClass="flex gap-12">
        <div className="basis-1/2 py-8">
          {tabs?.map((tab: ImageCMS, index) => {
            const isSelected = selectedTab === index;

            return (
              <div
                key={tab?.description}
                onClick={() => setSelectedTab(index)}
                className={`${
                  index !== tabs.length - 1 && "border-b-[2px]"
                } py-8 flex items-center justify-between cursor-pointer gap-16 ${
                  !isSelected && "opacity-60"
                }`}
              >
                <p className={`text-lg text-${theme} font-semibold`}>
                  {tab?.fields?.title}
                </p>
                <div className="h-[36px] w-[20px]">
                  {isSelected ? (
                    <LargeChevronLeft
                      color={isGreen ? "#004042" : "#F37021"}
                      width="20"
                      height="36"
                    />
                  ) : (
                    <LargeChevronRight
                      color={isGreen ? "#004042" : "#F37021"}
                      width="20"
                      height="36"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`basis-1/2 ${
            isBeige ? "bg-white" : isGreen ? "bg-green-800" : "bg-beige-200"
          } px-16 flex items-center`}
        >
          <p
            className={`${
              isBeige
                ? "text-green-800"
                : isGreen
                ? "text-white"
                : "text-green-800"
            } text-lg`}
          >
            {tabs[selectedTab]?.fields?.text_field?.[0]}
          </p>
        </div>
      </Section>
    )
  );
};
