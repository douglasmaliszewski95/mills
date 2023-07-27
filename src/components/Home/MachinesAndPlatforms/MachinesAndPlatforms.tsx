import Image from "next/image";
import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Separator from "@radix-ui/react-separator";
import { chevronDown } from "@/assets";
import { listItems } from "./utils";

export const MachinesAndPlatforms: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <div className="flex items-center flex-col py-14 font-ibm-font bg-white px-24 w-full tablet:px-4 tablet:pt-6">
        <div className="container w-full">
          <div className="flex flex-wrap justify-between tablet:flex-col">
            <h2 className="text-3xl font-bold text-orange-500 tablet:text-lg">
              Plataformas elevatórias em <br className="desktop:hidden" />
              todo o Brasil
            </h2>
          </div>
          <div className="flex justify-between mt-16 tablet:flex-col tablet:mt-6">
            <div className="flex flex-col gap-5">
              {listItems.map((item, index) => {
                return (
                  <Collapsible.Root
                    className="flex flex-col gap-3 w-full"
                    open={open}
                    onOpenChange={setOpen}
                    key={index}
                  >
                    <div>
                      <div className="flex justify-between w-full gap-14 text-sm font-normal text-gray-300">
                        <p>
                          Aluguel de plataformas elevatórias no
                          <span className="font-bold"> sudeste</span>
                        </p>
                        <Collapsible.Trigger asChild>
                          <button>
                            <Image src={chevronDown} alt="chevron" />
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
                      <p>Open</p>
                    </Collapsible.Content>
                  </Collapsible.Root>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 tablet:mt-3">
              {listItems.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-col justify-items-start gap-3"
                  >
                    <div className="flex gap-14 text-sm font-normal text-gray-300">
                      <p>
                        Aluguel de plataformas elevatórias em
                        <span className="font-bold"> Cotia, SP</span>
                      </p>
                    </div>
                    <Separator.Root
                      className="bg-gray-400 h-px w-full"
                      decorative
                      orientation="vertical"
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 tablet:mt-3">
              {listItems.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-col justify-items-start gap-3"
                  >
                    <div className="flex gap-14 text-sm font-normal text-gray-300">
                      <p>
                        Aluguel de plataformas elevatórias em
                        <span className="font-bold"> Cotia, SP</span>
                      </p>
                    </div>
                    <Separator.Root
                      className="bg-gray-400 h-px w-full"
                      decorative
                      orientation="vertical"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
