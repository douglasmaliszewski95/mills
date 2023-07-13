import { BestSolutionsCard } from "./BestSolutionsCard/BestSolutionsCard";
import {
  heavyMachines,
  solutionsInHeight,
  generatorsAndCompressors,
  moldsAndShoring,
  equipmentSales,
  aboutMills,
  sustainabilityJourney,
  co2Calculator,
} from "@/assets/BestSolutions";

export const BestSolutions = () => {
  const cards = [
    {
      id: "1",
      imagePath: heavyMachines.src,
      title: "Máquinas Pesadas",
      alt: "Ícone referente a máquinas pesadas",
    },
    {
      id: "2",
      imagePath: solutionsInHeight.src,
      title: "Soluções em Altura",
      alt: "Ícone referente a soluções em altura",
    },
    {
      id: "3",
      imagePath: generatorsAndCompressors.src,
      title: "Geradores e Compressores",
      alt: "Ícone referente a geradores e compressores",
    },
    {
      id: "4",
      imagePath: moldsAndShoring.src,
      title: "Fôrmas e Escoramentos",
      alt: "Ícone referente a fôrmas e escoramentos",
    },
    {
      id: "5",
      imagePath: equipmentSales.src,
      title: "Venda de Equipamentos",
      alt: "Ícone referente a venda de equipamentos",
    },
    {
      id: "6",
      imagePath: aboutMills.src,
      title: "Sobre a mills",
      alt: "Ícone referente ao item sobre a mills",
    },
    {
      id: "7",
      imagePath: sustainabilityJourney.src,
      title: "Jornada de Sustentabilidade",
      alt: "Ícone referente a jornada de sustentabilidade",
    },
    {
      id: "8",
      imagePath: co2Calculator.src,
      title: "Calculadora de Emissão de CO2",
      alt: "Ícone referente a calculadora de CO2",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center px-[168px] gap-6 py-16">
      <p className="text-green-800 font-semibold text-[28px] text-center">
        A Mills possui as melhores soluções em Locação de Equipamentos e
        Plataforma Elevatória:
      </p>
      <ul className="flex gap-8 px-[38px]">
        {cards.map((card) => (
          <BestSolutionsCard key={card.id} {...card} />
        ))}
      </ul>
    </section>
  );
};
