import { Section } from "@/components/shared/Section/Section";
import { InterestCardsProps, IntCardProps } from "./types";

export const InterestCards: React.FC<InterestCardsProps> = (props) => {
  const { cards = [], title } = props;

  const IntCard = (card: IntCardProps, index: number) => {
    return (
      <div key={index} className="flex flex-col w-[382px] tablet:w-full ">
        <img src={card.src} className="w-[full] h-[155px] rounded-t-lg" />
        <div className="bg-white text-green-800 px-6 pt-6 rounded-b-lg flex flex-col relative h-80 tablet:h-56">
          <h1 className="text-lg font-semibold tablet:text-sm">{card.title}</h1>
          <p className="text-base font-normal mt-4 tablet:text-xs">
            {card.description}
          </p>

          <a
            href={card.link}
            className="flex items-center justify-center absolute bottom-[20px] bg-orange-500 text-white rounded-3xl h-[37px] tablet:w-[85%] tablet:h-[33px] tablet:text-sm font-semibold w-[85%]"
          >
            {card.buttonText ? card.buttonText : "Clique aqui"}
          </a>
        </div>
      </div>
    );
  };

  return (
    <Section
      sectionClass="bg-beige-200"
      containerClass="mt-10 mb-20 tablet:mb-8 tablet:px-4"
    >
      <h1 className="font-semibold text-2xl text-green-800 tablet:text-base">
        {title}
      </h1>
      <div className="flex flex-row tablet:flex-col gap-6 tablet:mt-6 mt-12">
        {cards.map((card: IntCardProps, index: number) => IntCard(card, index))}
      </div>
    </Section>
  );
};
