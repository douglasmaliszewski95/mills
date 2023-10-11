import { Section } from "@/components/shared/Section/Section";
import verticalLines from "@/assets/verticalLineGray.svg";
import verticalLinesGray from "@/assets/verticalLinesDarkGray.svg";
import Image from "next/image";
import dnaBottom from "@/assets/dna-top-orange.svg";
import dnaBottomWhite from "@/assets/dna-bottom.svg";
import { AboutWithButtonProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "@/components/shared/Button/Button";

export const AboutWithButton: React.FC<AboutWithButtonProps> = (props) => {
  const {
    btnText = "",
    multipleBtns = [],
    description,
    src,
    title,
    link = "",
    orientation = "normal",
    theme = "orange-500",
    type = "singleBtn",
  } = props;

  const { isMobile } = useScreenWidth();

  return type === "singleBtn" ? (
    <section className="relative">
      {!isMobile && (
        <div
          className={`absolute  ${
            orientation === "normal"
              ? "right-0 top-1"
              : "left-0 bottom-2 pl-12"
          }`}
        >
          <img
            src={theme === "orange-500" ? dnaBottomWhite.src : dnaBottom.src}
            className="w-full rotate-180 "
          />
        </div>
      )}
      <Section
        containerClass={`flex ${
          orientation === "normal" ? "flex-row" : "flex-row-reverse"
        } tablet:flex-col tablet:h-auto tablet:pb-4 gap-16 tablet:gap-2`}
        sectionClass={`bg-${theme}`}
      >
        <div className="w-[45%] tablet:w-full tablet:h-[235px] tablet:pt-0">
          <img src={src} className="w-full h-full" />
        </div>
        <div
          className={`w-[50%] tablet:w-full ${
            theme === "white" ? "text-green-800" : "text-white"
          } pt-20 tablet:p-4`}
        >
          <h3 className="font-semibold text-2xl tablet:text-base">{title}</h3>
          <p className="text-lg mt-6 tablet:text-xs tablet:mt-4">
            {description}
          </p>
          <a href={link}>
            <Button
              className={`max-w-[264px] w-full ${
                description !== undefined && "mt-7"
              } tablet:max-w-[992px]`}
              variant={theme === "orange-500" ? "inverted" : "default"}
            >
              <p className="py-[2px] text-sm font-semibold">{btnText}</p>
            </Button>
          </a>
        </div>
      </Section>
    </section>
  ) : (
    <Section
      containerClass="flex flex-row tablet:flex-col-reverse tablet:flex-col tablet:h-auto tablet:gap-0 h-[560px] gap-16"
      sectionClass="bg-green-800"
    >
      <div className="text-white w-[45%] tablet:w-full tablet:py-6 py-20 tablet:px-4">
        <h3 className="text-2xl font-semibold tablet:text-base">{title}</h3>
        <p className="text-lg font-normal tablet:mt-4 mt-8 tablet:text-xs">
          {description}
        </p>
        <div className="grid grid-cols-2 tablet:grid-cols-1 gap-4 mt-6">
          {multipleBtns?.map((text: string, index: number) => {
            return (
              <button
                key={index}
                className="bg-orange-500 h-[38px] rounded-md text-base font-semibold drop-shadow-2xl tablet:text-sm"
              >
                <a
                  href={
                    text === "Pá carregadeira"
                      ? "/maquinas-pesadas/pa-carregadeira"
                      : `/maquinas-pesadas/${text
                          .replace(" ", "-")
                          .toLowerCase()}`
                  }
                  target="blank"
                >
                  {text}
                </a>
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-[50%] tablet:w-full">
        <img src={src} className="w-full h-full" />
      </div>
    </Section>
  );
};
