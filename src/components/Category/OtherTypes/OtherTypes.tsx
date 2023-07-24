import { Section } from "@/components/shared/Section/Section";
import { OtherTypesProps } from "./types";

export const OtherTypes: React.FC<OtherTypesProps> = (props) => {
  const { title, description, cards } = props;

  return (
    <Section
      containerClass="flex gap-12 tablet:gap-8 tablet:flex-col"
      sectionClass="py-[66px] tablet:py-8 tablet:px-4"
    >
      <div className="basis-1/2 flex flex-col h-full justify-center">
        <h5 className="text-green-800 font-semibold text-2xl mb-6 pr-7 tablet:text-base tablet:pr-[20%]">
          {title}
        </h5>
        <div className="flex flex-col gap-6 pr-[90px] tablet:pr-0">
          {description.map((text, index) => (
            <p
              key={`${text.substring(0, 5)}${index}}`}
              className="text-green-800 text-lg tablet:text-xs"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="basis-1/2 flex tablet:flex-col gap-3">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="basis-1/2 bg-cover bg-no-repeat tablet:bg-center h-full rounded-lg flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${card.backgroundImage})` }}
          >
            <div className="w-full h-full flex items-center bg-black/50 rounded-lg tablet:px-7 tablet:py-[120px] justify-center">
              <p className="text-white text-[20px] px-4 font-semibold tablet:text-base">
                {card.label}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};
