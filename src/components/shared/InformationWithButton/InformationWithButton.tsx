import { Section } from "../Section/Section";
import verticalLines from "@/assets/verticalLineGray.svg";
import verticalLinesGray from "@/assets/verticalLinesDarkGray.svg";
import Image from "next/image";
import { InformationWithButtonProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { DnaBottom } from "@/assets/DnaBottom";

export const InformationWithButton: React.FC<InformationWithButtonProps> = (
  props
) => {
  const {
    buttonTitle,
    description,
    title,
    imagePosition = "bottom",
    theme = "bg-green-800",
    showDna = true,
    buttonColor,
    buttonTextColor,
    width = "w-full",
    paddingY = "py-16",
    buttonLink,
    dnaColor,
    image = "",
  } = props;
  const { isMobile } = useScreenWidth();

  const className =
    imagePosition === "bottom"
      ? "absolute right-3 bottom-2 w-[45%] tablet:w-[80%]"
      : "absolute rotate-180 right-3 top-2 tablet:w-[80%]";

  return !image ? (
    <section className="relative overflow-x-hidden">
      {!isMobile && showDna && (
        <div className={className}>
          <DnaBottom color={dnaColor} />
        </div>
      )}
      <Section
        containerClass={`flex flex-row tablet:px-4 tablet:flex-col tablet:py-8 ${paddingY}`}
        sectionClass={theme}
      >
        <div
          className={`w-[50%] tablet:w-full ${theme === "bg-beige-200" ? "text-green-800" : "text-white"
            }`}
        >
          <h3
            className={`text-2xl font-semibold ${description ? "mb-6" : "0"
              } tablet:text-base ${width}`}
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm font-normal tablet:text-sm ">{description}</p>
          )}
        </div>
        <div className="flex relative justify-center items-center tablet:w-full w-[50%] tablet:mt-4">
          <a
          target="_blank"
            href={buttonLink}
            className={`${buttonColor} flex items-center justify-center rounded-3xl ${buttonTextColor} font-semibold text-sm w-[265.14px] tablet:w-full h-[37px]`}
          >
            {buttonTitle}
          </a>
        </div>
      </Section>
      {isMobile && <div className="relative flex justify-end">
        <div className="absolute bottom-[5px] right-[-10px]">
          <DnaBottom width="380" height="60" color="#FFFFFF" />
        </div>
      </div>}
    </section>
  ) : (
    <Section
      containerClass={`flex flex-row tablet:flex-col-reverse tablet:pb-8 ${paddingY} gap-4`}
      sectionClass={theme}
    >
      <div
        className={`w-[50%] tablet:w-full flex flex-col justify-center tablet:px-4 ${theme === "bg-beige-200" ? "text-green-800" : "text-white"
          }`}
      >
        <h3
          className={`text-2xl font-semibold ${description ? "mb-6" : "0"
            } tablet:text-base ${width}`}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm font-normal tablet:text-sm ">{description}</p>
        )}

        <a
        target="_blank"
          href={buttonLink ? buttonLink : ''}
          className={`${buttonColor} mt-2 flex items-center justify-center rounded-3xl ${buttonTextColor} font-semibold text-sm w-[265.14px] tablet:w-full h-[37px]`}
        >
          {buttonTitle}
        </a>
      </div>
      <div className="flex relative justify-center h-[257px] items-center tablet:w-full w-[50%] tablet:mt-0">
        <img src={image} className="h-[257px] w-full" />
      </div>
    </Section>
  );
};
