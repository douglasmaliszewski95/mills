import { SustainabilityJourneyCardProps } from "./types";

export const SustainabilityJourneyCard: React.FC<
  SustainabilityJourneyCardProps
> = (props) => {
  const { image, description, text, title, links } = props;

  return (
    <div className="flex flex-row tablet:flex-col justify-between items-center">
      <img
        src={image}
        className="object-cover w-[570px] tablet:w-full h-[401px] tablet:h-[215px] rounded-lg"
      />
      <div className="w-[48%] flex tablet:relative flex-col text-green-800 tablet:w-full tablet:h-[260px]">
        <h3 className="font-semibold text-2xl w-[60%] tablet:w-[90%] tablet:text-base tablet:mt-4">
          {title}
        </h3>
        <p className="font-normal text-lg pt-2 w-[80%] tablet:w-full tablet:text-xs">
          {text}
        </p>
        {description === "jornada sustentabilidade02" && (
          <p className="text-lg py-6 tablet:pt-6 tablet:text-xs">
            Versão resumida em{" "}
            <a className="text-orange-500 underline-offset-4">English</a> ou{" "}
            <a className="text-orange-500 underline-offset-4">Português</a>
          </p>
        )}
        <a href={links}>
          <button
            className={`text-sm bg-orange-500 tablet:absolute tablet:bottom-2 text-white font-semibold rounded-3xl tablet:w-full h-[37px] w-[60%] ${
              description !== "jornada sustentabilidade02" && "mt-8"
            }`}
          >
            {description === "jornada sustentabilidade02"
              ? "Ver relatório completo"
              : "Calculadora de emissão de CO2"}
          </button>
        </a>
      </div>
    </div>
  );
};
