import Image from "next/image";
import {
  accessToBuilding,
  bottomLines,
  construction,
  highCleaning,
  highPainting,
  industrialInstallation,
  inventary,
  propertyInstallation,
  topLines,
} from "@/assets/IdealEquipmentRental";
import { IdealEquipmentRentalCard } from "./IdealEquipmentRentalCard/IdealEquipmentRentalCard";

export const IdealEquipmentRental: React.FC = () => {
  const cards = [
    {
      id: "0",
      label: "Instalação e Manutenção Industrial",
      image: industrialInstallation,
      alt: "Ferramentas cruzadas",
    },
    {
      id: "1",
      label: "Construção e Edificação",
      image: construction,
      alt: "Esboço de casa",
    },
    {
      id: "2",
      label: "Limpeza em Altura",
      image: highCleaning,
      alt: "Limpador de vidro",
    },
    {
      id: "3",
      label: "Instalação e Manutenção Predial",
      image: propertyInstallation,
      alt: "Prédio e engrenagem",
    },
    {
      id: "4",
      label: "Pintura em Altura",
      image: highPainting,
      alt: "Rolo de pintura",
    },
    {
      id: "5",
      label: "Acesso a Prédios e Lajes",
      image: accessToBuilding,
      alt: "Plataforma elevatória",
    },
    {
      id: "6",
      label: "Inventário e Organização do Estoque",
      image: inventary,
      alt: "Caixas empilhadas",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <div className="flex justify-end w-full">
        <Image src={topLines} alt="Linhas verticais" />
      </div>
      <div className="container text-center flex flex-col gap-10">
        <p className="text-3xl text-orange font-semibold">
          Locação de Equipamentos ideias para cada tipo de uso
        </p>
        <p className="text-green-800">
          Executar projetos em altura requer segurança, evite riscos e aumente
          sua <br /> produtividade com nossas plataformas.
        </p>
        <div className="flex justify-between">
          {cards.map((card) => (
            <IdealEquipmentRentalCard key={card.id} {...card} />
          ))}
        </div>
      </div>
      <div className="flex justify-start w-full">
        <Image src={bottomLines} alt="Linhas verticais" />
      </div>
    </section>
  );
};
