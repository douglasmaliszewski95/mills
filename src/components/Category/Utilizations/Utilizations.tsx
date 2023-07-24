import { Section } from "@/components/shared/Section/Section";
import { UtilizationsProps } from "./types";
import Image from "next/image";

export const Utilizations: React.FC<UtilizationsProps> = (props) => {
  const { title, description, cards, theme = "white" } = props;
  const isOrangeBg = theme === "orange";
  const smallFont = cards.length > 8;

  return (
    <Section
      containerClass="flex tablet:gap-6 tablet:flex-col"
      sectionClass={`pb-12 tablet:pb-8 pt-[76px] tablet:px-4 tablet:pt-6 ${
        isOrangeBg && "bg-orange-500"
      }`}
    >
      <div className="basis-1/2 flex flex-col justify-center h-full gap-[30px] tablet:gap-4 pr-[90px] tablet:pr-0">
        <h4
          className={`${
            isOrangeBg ? "text-white" : "text-green-800"
          } text-2xl font-semibold tablet:text-base tablet:mr-[20%]`}
        >
          {title}
        </h4>
        <div
          className={`${
            isOrangeBg ? "text-white" : "text-green-800"
          } text-green-800 text-lg tablet:text-xs`}
        >
          {description}
        </div>
      </div>
      <div className="basis-1/2 grid grid-cols-2 gap-4 tablet:grid-cols-1">
        {cards.map(({ id, title, image, alt }) => (
          <div
            key={id}
            className="px-6 py-[18px] bg-beige-200 rounded flex gap-4 items-center"
          >
            <img src={image.src} alt={alt} className="w-[32px] h-[32px]" />
            <p
              className={`text-green-800 tablet:text-sm ${
                smallFont ? "text-sm font-normal" : "font-semibold"
              }`}
            >
              {title}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
