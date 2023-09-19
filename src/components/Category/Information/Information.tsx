import { Section } from "@/components/shared/Section/Section";
import { InformationProps } from "./types";

export const Information: React.FC<InformationProps> = (props) => {
  const {
    title,
    description,
    theme = "green-800",
    titleSize,
    descriptionSize,
    width = "w-full",
  } = props;
  const color = theme === "green-800" ? "white" : "green-800";

  return (
    <Section sectionClass={`bg-${theme} py-16 tablet:px-4 tablet:py-8`}>
      <h3
        className={`text-${color} ${width} ${
          titleSize ? titleSize : "text-2xl"
        } font-semibold ${
          description && "mb-6"
        } tablet:text-xs tablet:font-normal`}
      >
        {title ?? null}
      </h3>
      <p
        className={`text-${color} ${
          descriptionSize ? descriptionSize : "text-lg"
        } tablet:text-base tablet:font-semibold tablet:pr-0 pr-[116px]`}
      >
        {description}
      </p>
    </Section>
  );
};
