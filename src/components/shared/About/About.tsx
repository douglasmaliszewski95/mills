import { Section } from "@/components/shared/Section/Section";
import { AboutProps } from "./types";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import _ from "lodash";

export const About: React.FC<AboutProps> = (props) => {
  const {
    title,
    theme = "white",
    color = "green-800",
    hasButton = true,
    orientation = "",
    description,
    image,
    alt,
    link = "",
  } = props;
  const { isDesktop } = useScreenWidth();

  const imageFirst = orientation === "inverted";
  const descriptionArray = _.isArray(description) ? description : [description];

  return (
    <Section
      containerClass={`flex justify-between ${
        imageFirst ? "flex-row-reverse tablet:flex-col-reverse" : "tablet:mt-6"
      } tablet:flex-col gap-12 tablet:gap-6 tablet:mb-6`}
      sectionClass={`bg-${theme}`}
    >
      <div
        className={`basis-1/2 tablet:pl-4 ${
          !imageFirst && "pr-[62px]"
        } tablet:pr-4 tablet:mt-0 tablet:pb-0 h-full flex flex-col justify-center pb-0`}
      >
        <h2
          className={`text-${color} font-semibold text-2xl mb-7 tablet:text-base tablet:mb-2`}
        >
          {title}
        </h2>
        <div className="flex flex-col gap-3">
          {descriptionArray.map((text, index) => (
            <p
              key={`${text.substring(0, 5)}${index}`}
              className={`text-${color} text-lg tablet:text-xs`}
            >
              {text}
            </p>
          ))}
        </div>
        {hasButton && (
          <a href={link}>
            <Button className="max-w-[264px] w-full mt-7 tablet:max-w-[992px]">
              <p className="py-[2px] text-sm font-semibold">Ver modelos</p>
            </Button>
          </a>
        )}
      </div>
      {(isDesktop || imageFirst) && (
        <div className={`basis-1/2 relative`}>
          <Image
            className={`block ${
              imageFirst
                ? "object-top object-cover"
                : "object-fill object-right"
            }`}
            src={image}
            alt={alt}
          />
        </div>
      )}
    </Section>
  );
};
