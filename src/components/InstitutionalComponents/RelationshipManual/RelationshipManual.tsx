import { DnaBottom } from "@/assets/DnaBottom";
import { Section } from "@/components/shared/Section/Section";
import { RelationshipManualProps } from "./types";

export const RelationshipManual: React.FC<RelationshipManualProps> = (
  props
) => {
  const { description, firstBtn, secondBtn, title } = props;
  return (
    <section className="relative">
      <div className="absolute top-[2px] right-2 rotate-180">
        <DnaBottom color="#ffff" />
      </div>

      <Section
        sectionClass="bg-beige-200"
        containerClass="flex flex-row tablet:flex-col gap-12 tablet:gap-6 tablet:px-4 tablet:py-0 tablet:pt-24 tablet:pb-10 py-24"
      >
        <div className="text-green-800 w-[50%] tablet:w-full">
          <h3 className="text-2xl font-semibold w-[90%] tablet:text-base tablet:w-full">
            {title}
          </h3>
          <p className="text-lg font-normal mt-6 tablet:text-xs tablet:mt-2">
            {description}
          </p>
        </div>
        <div className="w-[50%] tablet:w-full flex flex-col items-center justify-center text-white text-lg font-semibold gap-4">
          <a
            target="blank"
            href={firstBtn?.link}
            className="bg-orange-500 tablet:w-full w-[80%] tablet:h-[47.12px]  h-[67px] flex justify-center items-center rounded-md tablet:text-xs"
          >
            {firstBtn?.title}
          </a>
          <a
            target="blank"
            href={secondBtn?.link}
            className="bg-orange-500 tablet:w-full w-[80%] tablet:h-[47.12px]  h-[67px] flex justify-center items-center rounded-md tablet:text-xs"
          >
            {secondBtn?.title}
          </a>
        </div>
      </Section>
    </section>
  );
};
