import Image from "next/image";
import lineUp from "@/assets/img/linesUp.png";
import { OpinionProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useCallback, useEffect, useState } from "react";
import { getText } from "@/services/hooks/getText";

export const Opinion = ({ content, theme = "rentalLight" }: OpinionProps) => {
  const { isMobile } = useScreenWidth();

  const themeStyle = theme === "rentalHeavy" ? "bg-green-800" : "bg-orange-500";

  return (
    <section className={`flex justify-cente text-white ${themeStyle} `}>
      <div
        style={{
          backgroundImage: `url(${isMobile ? null : lineUp.src})`,
        }}
        className="flex justify-center py-11 bg-no-repeat w-full tablet:flex-col tablet:py-0"
      >
        <div className="flex justify-end desktop:hidden">
          {/* <Image src={lineUp} alt="barUp" width="212" /> */}
        </div>
        <div className="flex container justify-between tablet:flex-col tablet:pb-11 tablet:pt-4 tablet:px-4">
          <div className="flex items-center">
            <h3 className="font-semibold text-3xl tablet:text-base tablet:mb-5">
              Opinião de nossos clientes
            </h3>
          </div>
          <div className="max-w-[444px]">
            <p className="text-lg font-semibold mb-2 tablet:text-sm">
              {content?.fields?.title}
            </p>
            <span className="italic text-sm tablet:text-[10px]">
              {content?.fields?.subtitle?.[0]}
            </span>
            <p className="font-normal mt-4 tablet:text-xs">
              {content?.fields?.text_field?.[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
