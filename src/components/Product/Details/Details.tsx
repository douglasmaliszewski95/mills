import { LargeChevronLeft } from "@/assets/LargeChevronLeft";
import { Section } from "@/components/shared/Section/Section";
import { DetailsProps } from "./types";
import Image from "next/image";
import worker from "@/assets/worker.svg";
import analytics from "@/assets/analytics.svg";
import download from "@/assets/download.svg";
import Button from "@/components/shared/Button/Button";
import { TechnicalInformation } from "./TechnicalInformation/TechnicalInformation";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { useRouter } from "next/router";

export const Details: React.FC<DetailsProps> = (props) => {
  const { product, addToCart } = props;
  const {
    id,
    brand,
    primaryFullImageURL,
    displayName,
    primaryImageAltText,
    x_pressoDoSoloKgcm,
    x_alcanceHorizontalM,
    x_alturaDeTrabalhoM,
    x_emissoMdiaKgDeCOH,
    x_capacidadeDeCargaKg,
    x_consumoCombustvelLhminMx,
    x_alimentacao,
    x_rampaMxima,
    x_capacidadeDoTanqueL,
    x_peso,
    height,
    width,
    description,
    needEquipment = true,
    needTraining = true,
  } = product;

  const router = useRouter();

  const specs = [
    {
      label: "Alcance horizontal",
      value: x_alcanceHorizontalM,
    },
    {
      label: "Altura do trabalho",
      value: x_alturaDeTrabalhoM,
    },
    {
      label: "Peso",
      value: x_peso,
    },
    {
      label: "Emissão Média",
      value: `${x_emissoMdiaKgDeCOH} Kg de CO2 por hora`,
    },
  ];

  const onClick = () => {
    router.back();
  };

  const technicalInformation = {
    brand,
    displayName,
    specs: [
      ...specs,
      {
        label: "Capacidade de carga",
        value: `${x_capacidadeDeCargaKg} kg`,
      },
      {
        label: "Comprimento",
        value: `${length} m`,
      },
      {
        label: "Altura",
        value: `${height} m`,
      },
      {
        label: "Largura",
        value: `${width} m`,
      },
      {
        label: "Alimentação",
        value: x_alimentacao,
      },
      {
        label: "Capacidade do Tanque",
        value: x_capacidadeDoTanqueL,
      },
      {
        label: "Rampa máxima",
        value: x_rampaMxima,
      },
      {
        label: "Consumo de Combustível",
        value: x_consumoCombustvelLhminMx,
      },
      {
        label: "Pressão ao Solo",
        value: `${x_pressoDoSoloKgcm} (kg/cm²)`,
      },
    ],
  };

  return (
    <Section containerClass="pb-[110px] tablet:pb-8 tablet:px-4">
      <button
        onClick={onClick}
        className="flex items-baseline gap-2 mt-3 cursor-pointer mb-8"
      >
        <LargeChevronLeft color="#F37021" />
        <p className="text-orange-500 text-sm">Voltar</p>
      </button>
      <div className="flex tablet:flex-col">
        <div className="basis-1/2 pr-[78px] tablet:pr-0">
          <h5 className="text-green-800 font-semibold leading-4 pr-[89px]">
            {`${brand} ${id}`}
          </h5>
          <h2 className="text-[30px] tablet:text-base text-green-800 font-semibold leading-8 mb-8">
            {displayName}
          </h2>
          <ImageOCC
            imageName={primaryFullImageURL}
            alt={primaryImageAltText}
            className="w-full mt-8 tablet:mt-0 tablet:mb-8 tablet:max-h-[184px] object-contain"
          />
        </div>
        <div className="basis-1/2 pr-[138px] tablet:pr-0">
          <p className="text-green-800 mb-7 tablet:text-xs">{description}</p>
          <div className="mb-6">
            {specs?.map(({ label, value }, index) => (
              <p
                key={`${label}${index}`}
                className="w-full text-green-800 text-sm"
              >
                <b>{label}</b>: {value}
              </p>
            ))}
          </div>
          {needEquipment && (
            <div className="mb-3 flex py-4 pr-4 pl-6 border-[2px] border-green-800/80 rounded gap-3">
              <img
                className="w-[25px] h-[25px]"
                src={worker}
                alt="Operário"
                width={25}
                height={25}
              />
              <p className="text-sm text-green-800 tablet:text-xs">
                Equipamentos de proteção necessários para a operação do
                equipamento: botas, capacetes e coletes.
              </p>
            </div>
          )}
          {needTraining && (
            <div className="mb-3 flex py-4 pr-4 pl-6 border-[2px] border-green-800/80 rounded gap-3">
              <img
                className="w-[25px] h-[25px]"
                src={analytics}
                alt="Operário"
              />
              <p className="text-sm text-green-800 tablet:text-xs">
                Este equipamento só pode ser operado após treinamento prévio.
              </p>
            </div>
          )}
          <div className="w-full h-[1px] bg-gray-200 mt-8 tablet:mt-6"></div>
          <div className="flex justify-between w-full py-4">
            <p className="text-green-800 font-semibold tablet:text-sm">{`Manual ${brand}`}</p>
            <button>
              <img
                className="w-[22px] h-[22px]"
                src={download}
                width={22}
                height={22}
                alt="Download"
              />
            </button>
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <TechnicalInformation technicalInfo={technicalInformation} />
          <div className="w-full h-[1px] bg-gray-200 mb-8 tablet:mb-6"></div>
          <Button className="w-full" onClick={() => addToCart(id)}>
            <p className="text-sm font-semibold px-[40px]">
              Incluir no orçamento
            </p>
          </Button>
        </div>
      </div>
    </Section>
  );
};
