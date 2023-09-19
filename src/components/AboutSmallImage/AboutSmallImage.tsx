import { DnaTop } from "@/assets/DnaTop";
import { Section } from "../shared/Section/Section";
import { AboutSmallImageProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import dnaTop from "@/assets/dna-top-white.svg";

export const AboutSmallImage: React.FC<AboutSmallImageProps> = (props) => {
  const {
    title,
    image,
    alt,
    theme = "beige-200",
    color = "green-800",
    imageFirst = false,
    imagePadding = "",
  } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section
      sectionClass={`bg-${theme} h-[504px] tablet:h-full tablet:pb-8 relative`}
      containerClass={`flex items-center tablet:px-4 ${
        imageFirst
          ? "flex-row-reverse tablet:flex-col-reverse"
          : "tablet:flex-col"
      }`}
    >
      {!imageFirst &&
        (isDesktop ? (
          <div className="absolute top-3 right-3">
            <DnaTop width="620" color="white" opacity="0.30" />
          </div>
        ) : (
          <div>
            <img src={dnaTop.src} className="absolute left-12" />
          </div>
        ))}
      <div
        className={`basis-1/2 tablet:basis-0 pr-20 tablet:pr-0 ${
          imageFirst ? "tablet:mt-10" : "tablet:mt-[90px]"
        }`}
      >
        <h4
          className={`text-${color} text-[24px] tablet:text-base font-semibold`}
        >
          {title}
        </h4>
      </div>
      <div
        className={`basis-1/2 tablet:basis-0 flex items-center justify-center tablet:mt-4 mb-7 tablet:mb-0 ${imagePadding}`}
      >
        <img src={image} alt={alt} />
      </div>
    </Section>
  );
};
