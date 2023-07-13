import { Card } from "./Card/Card";
import { MeetOurProductsProps } from "./types";

export const MeetOurProducts: React.FC<MeetOurProductsProps> = (props) => {
  const { cards } = props;

  return (
    <section className="flex justify-center pb-20 pt-24 font-ibm-font bg-gray-50 tablet:px-4 tablet:py-6">
      <div className="max-w-[1200px] w-full">
        <p className="text-orange-500 text-2xl font-semibold mb-10 tablet:text-lg tablet:mb-3">
          Conheça nossos produtos
        </p>
        <div className="flex gap-2 tablet:flex-col tablet:gap-4">
          {cards?.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
