import { Section } from "@/components/shared/Section/Section";
import { InformationProps } from "./types";
import { DnaTop } from "@/assets/DnaTop";
import { DnaBottom } from "@/assets/DnaBottom";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const Information: React.FC<InformationProps> = (props) => {
  const {
    title,
    description,
    theme = "green-800",
    titleSize,
    descriptionSize,
    width = "w-full",
    position
  } = props;
  const color = theme === "green-800" ? "white" : "green-800";
  const { isMobile } = useScreenWidth();

  return (
    <Section sectionClass={`bg-${theme} py-16 tablet:px-4 tablet:py-8`}>
      {position === "top" && <div className="relative flex justify-end"><div className={isMobile ? "relative top-[-25px]" : "absolute top-[-50px]"}>
        <DnaTop width={isMobile ? "320" : "550"} height={isMobile ? "50" : "88"} color="white" opacity="0.30" />
      </div></div>}
      <h3
        className={`text-${color} ${width} ${titleSize ? titleSize : "text-2xl"
          } font-semibold ${description && "mb-6"
          } tablet:text-base tablet:font-semibold`}
      >
        {title ?? null}
      </h3>
      <p
        className={`text-${color} ${descriptionSize ? descriptionSize : "text-lg"
          } tablet:text-xs tablet:font-semibold tablet:pr-0 pr-[116px]`}
      >
        {description}
      </p>
      {position === "bottom" &&<div className="relative flex justify-end"><div className={isMobile ? "relative bottom-[-25px] right-[-10px]" : "absolute bottom-[-50px] right-[5px]"}>
        <DnaBottom width={isMobile ? "320" : "550"} height={isMobile ? "50" : "88"}  color="#FFFFFF" />
      </div></div>}
    </Section>
  );
};
