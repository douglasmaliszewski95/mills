import Image from "next/image";
import React, { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Separator from "@radix-ui/react-separator";
import { chevronDown } from "@/assets";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";
import { useRouter } from "next/router";
import { HtmlRenderer } from "@/components/HtmlRender/htmlRender";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const MachinesAndPlatforms: React.FC = () => {
  const router = useRouter();
  const { isMobile } = useScreenWidth();
  const { platformsForAllBrazil, machinesForAllBrazil } = useGetCMSShared();
  const [openIndex, setOpenIndex] = useState(-1);
  const [theme, setTheme] = useState<"rentalLight" | "rentalHeavy">(
    "rentalLight"
  );
  const list: any = theme === "rentalLight" ? platformsForAllBrazil : machinesForAllBrazil;

  useEffect(() => {
    if (router.asPath.includes("pesadas")) return setTheme("rentalHeavy");
    return setTheme("rentalLight");
  }, []);

  const handleOpenCollapse = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  return (
    <section>
      <div className="flex items-center flex-col py-14 font-ibm-font bg-white px-24 w-full tablet:px-4 tablet:pt-6">
        <div className="container w-full">
          <div className="flex flex-wrap justify-between tablet:flex-col">
            <h3
              className={`text-3xl font-bold ${theme === "rentalLight" ? "text-orange-500" : "text-green-800"
                } tablet:text-lg`}
            >
              {theme === "rentalLight"
                ? platformsForAllBrazil?.title
                : machinesForAllBrazil?.title}
            </h3>
          </div>
          <div className="flex justify-between">
            <div className="mt-16 tablet:mt-5">
              {list?.[isMobile ? "mobileSections" : "sections"]?.map(
                (item: any, index: number) => {
                  const isOpen = index === openIndex;
                  return (
                    <Collapsible.Root
                      className="flex flex-col gap-3 w-[330px] tablet:w-[275px]"
                      open={isOpen}
                      onOpenChange={() => handleOpenCollapse(index)}
                      key={index}
                    >
                      <div className="gap-11 mb-3 tablet:flex-col tablet:mt-6">
                        <div className="flex flex-col">
                          <div className="flex justify-between w-[330px] text-xs font-normal text-gray-300 tablet:w-[275px]">
                            <div>
                              <HtmlRenderer htmlContent={item?.fields.title} />
                            </div>
                            <Collapsible.Trigger asChild>
                              <button>
                                <Image
                                  src={chevronDown}
                                  className={`transform ${isOpen
                                    ? "rotate-180 transition duration-500"
                                    : ""
                                    }`}
                                  alt="chevronDown"
                                />
                              </button>
                            </Collapsible.Trigger>
                          </div>
                          <Separator.Root
                            className="bg-gray-400 h-px w-full mt-3"
                            decorative
                            orientation="vertical"
                          />
                        </div>
                        <Collapsible.Content>
                          <div className="flex flex-wrap gap-5 py-10">
                            {item?.fields.text_field.map(
                              (subItem: string, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="w-full flex flex-col justify-between gap-3"
                                  >
                                    <a href={item?.fields.hrefButton?.[index]}>
                                      <div className="flex gap-14 text-xs font-normal text-gray-300">
                                        <HtmlRenderer
                                          htmlContent={subItem}
                                          className="tablet:text-left"
                                        />
                                      </div>
                                    </a>
                                    <Separator.Root
                                      className="bg-gray-400 h-px w-full"
                                      decorative
                                      orientation="vertical"
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </Collapsible.Content>
                      </div>
                    </Collapsible.Root>
                  );
                }
              )}
            </div>
            <div className="flex h-[230px] grid grid-cols-2 mt-16 gap-4 tablet:mt-3 tablet:hidden">
              {/* {[0, 1].map((columnIndex) => (
                <ul
                  key={columnIndex}
                  className="flex flex-col font-medium font-ibm-font text-sm text-orange-500 leading-7"
                > */}
                  {list?.listItems?.fields.text_field
                    .map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex mb-1 items-center gap-2 cursor-pointer"
                        >
                          <a href={list?.listItems?.fields.hrefButton[index]}>
                            <button
                              className="flex w-[330px] flex-col justify-items-start gap-3"
                            >
                              <div className="flex gap-14 text-xs font-normal text-gray-300">
                                <HtmlRenderer htmlContent={item} />
                              </div>
                              <Separator.Root
                                className="bg-gray-400 h-px w-full"
                                decorative
                                orientation="vertical"
                              />
                            </button>
                          </a>
                        </div>
                      );
                    })
                  }
                {/* </ul>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
