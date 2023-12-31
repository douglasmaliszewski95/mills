import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Card } from "./Card/Card";
import { OurServicesProps } from "./types";

export const OurServices: React.FC<OurServicesProps> = (props) => {
  const { serviceCards, theme } = props;

  return (
    <section className="flex justify-center pt-12 font-ibm-font bg-beige-200 tablet:bg-gray-50 tablet:py-4">
      <div className="container pb-20 tablet:px-4">
        <h2
          className={`text-2xl  font-semibold mb-4 tablet:text-lg ${
            theme === "rentalHeavy" ? "text-green-800" : "text-orange-500"
          }`}
        >
          Serviços Mills para Locação de Equipamentos e Plataforma Elevatória
        </h2>
        <p className="text-lg text-green-800 mb-8 tablet:text-xs">
          Conheça os serviços disponíveis para simplificar seu dia a dia
        </p>
        <Carousel>
          {serviceCards?.map((card) => (
            <Card key={card.id} {...card} theme={theme} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};
