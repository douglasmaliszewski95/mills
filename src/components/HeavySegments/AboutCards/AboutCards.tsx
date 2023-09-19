import { Section } from "@/components/shared/Section/Section";
import { AboutCardsProps } from "./types";
import { getImageSrc } from "@/utils/images";

export const AboutCards: React.FC<AboutCardsProps> = (props) => {
  const { content, cards, title } = props;

  return (
    <Section
      sectionClass="bg-gray-400 tablet:bg-beige-200"
      containerClass="flex gap-12 tablet:gap-6 tablet:flex-col-reverse"
    >
      <div className="basis-1/2 flex flex-col justify-center gap-16 tablet:gap-6 pb-6 tablet:px-4">
        <h3 className="text-green-800 font-semibold text-2xl tablet:text-base">
          {title}
        </h3>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-2 gap-y-1 tablet:grid-cols-1 tablet:grid-rows-none">
          {cards?.map((text) => (
            <p
              key={text}
              className="text-green-800 text-center bg-white rounded py-4 tablet:rounded-lg tablet:bg-green-800 tablet:text-white tablet:text-sm"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="basis-1/2">
        <img src={getImageSrc(content?.fields)} />
      </div>
    </Section>
  );
};
