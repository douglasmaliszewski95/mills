import { Section } from "@/components/shared/Section/Section";
import { WhenToUseProps } from "./types";
import checkBorder from "@/assets/check-border.svg";
import Image from "next/image";

export const WhenToUse: React.FC<WhenToUseProps> = (props) => {
  const { title, cards } = props;

  return (
    <Section sectionClass="py-12 tablet:pt-6 tablet:pb-8 tablet:px-4">
      <h4 className="text-2xl font-semibold text-green-800 mb-12 tablet:mb-8 tablet:text-base">
        {title}
      </h4>
      <div className="flex gap-5 tablet:gap-4 tablet:flex-col">
        {cards?.map((text, index) => (
          <div
            key={index}
            className="basis-1/3 rounded bg-beige-200 px-7 py-8 tablet:pb-6 flex flex-col items-center tablet:text-center"
          >
            <Image
              width={52}
              height={52}
              alt="Certo"
              src={checkBorder}
              className="my-7 tablet:mt-0 tablet:mb-6"
            />
            <p className="text-green-800 tablet:text-xs">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};
