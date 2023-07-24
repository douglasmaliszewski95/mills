import { Section } from "@/components/shared/Section/Section";
import { InformationProps } from "./types";

export const Information: React.FC<InformationProps> = (props) => {
  const { title, description, theme = "green-800" } = props;
  const color = theme === "white" ? "green-800" : "white";

  return (
    <Section
      sectionClass={`bg-${theme} py-[60px] tablet:px-4 tablet:pt-[88px] tablet:pb-8`}
    >
      <h3
        className={`text-${color} text-2xl font-semibold mb-6 tablet:text-base`}
      >
        {title}
      </h3>
      <p className={`text-${color} text-lg tablet:text-xs pr-[116px]`}>
        {description}
      </p>
    </Section>
  );
};
