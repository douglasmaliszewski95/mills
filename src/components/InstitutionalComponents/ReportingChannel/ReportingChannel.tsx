import { DnaBottom } from "@/assets/DnaBottom";
import { Section } from "@/components/shared/Section/Section";
import { ReportingChannelProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const ReportingChannel: React.FC<ReportingChannelProps> = (props) => {
  const { src } = props;
  const { isMobile, screenWidth } = useScreenWidth();
  return (
    <section className="relative">
      {!isMobile && (
        <>
          <div className="absolute bottom-[2px] left-3">
            <DnaBottom color="#ebe3c7" opacity="1" />
          </div>
          </>
      )}
          <div className={`absolute bottom-[2px] right-3`}>
            <DnaBottom color="#ebe3c7" opacity="1" />
          </div>
       
      <Section
        sectionClass="bg-white"
        containerClass="flex flex-row tablet:flex-col tablet:gap-2 gap-12 h-[480px] tablet:px-4"
      >
        <div className="w-[50%] tablet:w-full relative flex items-center justify-center">
          <img
            src={src}
            className={`bottom-[-10.5rem] tablet:bottom-[-37rem] absolute ${
              screenWidth <= 770 &&
              screenWidth >= 435 &&
              "tablet:bottom-[-47rem]"
            } ${
              screenWidth <= 430 &&
              screenWidth >= 378 &&
              "tablet:bottom-[-40rem]"
            } ${
              screenWidth <= 376 &&
              screenWidth >= 322 &&
              "tablet:bottom-[-37rem]"
            } ${screenWidth <= 321 && "tablet:bottom-[-36rem]"}`}
          />
          <div
            className={`absolute text-white ${
              screenWidth <= 770 &&
              screenWidth >= 435 ?
              "tablet:left-[13rem]" : "tablet:left-[15%]"
            } font-semibold text-2xl flex gap-8 flex-col w-[180px] top-[9rem] ${screenWidth <= 321 ? "tablet:top-[18rem]" : "tablet:top-[16rem]"} tablet:left-[15%] left-[20%] tablet:text-sm tablet:w-[110px]`}
          >
            <h1>Nosso compromisso com a ética e a transparência </h1>
            <h1 className="w-[95%]">Ligue para<br/> 0800 882 0616</h1>
          </div>
        </div>
        <div className="w-[50%] tablet:w-full text-green-800 flex flex-col gap-4 tablet:pt-0 pt-24">
          <h1 className="font-semibold text-2xl tablet:text-base">
            Canal de Denúncias
          </h1>
          <p className="font-normal text-lg tablet:text-xs">
            Esse canal é exclusivo da Mills para comunicar de forma segura e
            anônima sobre condutas que violem os princípios éticos, os padrões
            de conduta e/ou a legislação vigente.
          </p>
          <p className="font-normal text-lg tablet:text-xs">
            Denuncie atitudes que possam ferir o nosso Código de Conduta. É
            rápido, seguro e sigiloso.
          </p>
        </div>
      </Section>
    </section>
  );
};
