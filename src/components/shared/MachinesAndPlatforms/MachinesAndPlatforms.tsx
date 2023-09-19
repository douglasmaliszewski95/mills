import Image from "next/image";
import React, { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Separator from "@radix-ui/react-separator";
import { chevronDown } from "@/assets";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";
import { useRouter } from "next/router";
import { HtmlRenderer } from "@/components/HtmlRender/htmlRender";

export const MachinesAndPlatforms: React.FC = () => {
  const router = useRouter();
  const { platformsForAllBrazil, machinesForAllBrazil } = useGetCMSShared();
  const [openIndex, setOpenIndex] = useState(-1);
  const [theme, setTheme] = useState<"rentalLight" | "rentalHeavy">(
    "rentalLight"
  );

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
            <h2
              className={`text-3xl font-bold ${
                theme === "rentalLight" ? "text-orange-500" : "text-green-800"
              } tablet:text-lg`}
            >
              {theme === "rentalLight"
                ? platformsForAllBrazil?.title
                : machinesForAllBrazil?.title}
            </h2>
          </div>
          <div className="mt-16">
            {platformsForAllBrazil?.sections?.map(
              (item: any, index: number) => {
                const isOpen = index === openIndex;
                return (
                  <Collapsible.Root
                    className="flex flex-col gap-3 w-[350px] tablet:w-[275px]"
                    open={isOpen}
                    onOpenChange={() => handleOpenCollapse(index)}
                    key={index}
                  >
                    <div className="flex justify-between gap-11 mb-3 tablet:flex-col tablet:mt-6">
                      <div className="flex flex-col">
                        <div className="flex justify-between w-[350px] text-sm font-normal text-gray-300 tablet:w-[275px]">
                          <p>
                            <HtmlRenderer htmlContent={item?.fields.title} />
                          </p>
                          <Collapsible.Trigger asChild>
                            <button>
                              <Image
                                src={chevronDown}
                                className={`transform ${
                                  isOpen
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
                        <div className="flex flex-wrap gap-5">
                          {item?.fields.text_field.map(
                            (subItem: string, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="w-[330px] flex flex-col justify-between gap-3"
                                >
                                  <div className="flex gap-14 text-sm font-normal text-gray-300">
                                    <p className="tablet:text-left">
                                      {subItem}
                                    </p>
                                  </div>
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
        </div>
      </div>
    </section>
  );
};
