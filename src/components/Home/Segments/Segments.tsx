import { Card } from "../../shared/Card/Card";
import { cards } from "./utils";

export const Segments: React.FC = () => {
  return (
    <section className="flex justify-center flex-wrap bg-gray-100 pt-11 pb-20 font-ibm-font tablet:px-4 tablet:py-6">
      <div className="container h-full">
        <h2 className="text-2xl text-orange-500 font-semibold mb-10 tablet:text-lg tablet:mb-6">
          Trabalhamos em diversos tipos de segmentos
        </h2>
        <div className="flex flex-wrap gap-2 justify-between h-full tablet:flex-col">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
