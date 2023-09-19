import { Section } from "@/components/shared/Section/Section";
import { StoresProductsProps, cardProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const StoresProducts: React.FC<StoresProductsProps> = (props) => {
  const { cards = [] } = props;

  return (
    <Section
      containerClass="tablet:px-4 flex tablet:flex-col flex-row gap-6 my-12 tablet:my-8"
      sectionClass="bg-xwhite"
    >
      {cards.map((card: cardProps) => {
        return (
          <a href={card.link} key={card.id}>
            <div className="relative h-[477.04px] w-full" key={card.id}>
              <img src={card.src} className="w-[full]" alt="img card"></img>
              <div className="absolute bottom-0 h-full w-full px-8 pb-6 bg-gradient-to-b from-transparent to-black flex items-end justify-center rounded-lg">
                <div className="flex flex-col text-white gap-4 h-full justify-end">
                  <h1 className="text-2xl font-semibold">{card.title}</h1>
                  <p className="text-base font-normal">{card.description}</p>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </Section>
  );
};
