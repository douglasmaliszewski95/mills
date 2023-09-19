import { Section } from "@/components/shared/Section/Section";
import { GlobalImpactProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const GlobalImpact: React.FC<GlobalImpactProps> = (props) => {
  const { description, firstImage, secondImage, title } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section
      containerClass="tablet:px-4 flex flex-row tablet:flex-col gap-6"
      sectionClass={`bg-white`}
    >
      <div className="flex flex-row w-[50%] tablet:w-full items-center tablet:justify-center tablet:items-center tablet:gap-0 gap-10">
        <img
          src={firstImage}
          className="w-[315px] tablet:h-[100px] h-[166px]"
        />
        <img
          src={secondImage}
          className="w-[145px] tablet:h-[100px] h-[177.16px]"
        />
      </div>

      <div className="flex flex-col text-green-800 w-[50%] tablet:w-full tablet:py-0 py-16 tablet:mb-10">
        <h1 className="font-semibold text-2xl w-[80%] tablet:w-full">
          {title}
        </h1>
        <p className="text-lg font-normal mt-6 w-[90%] tablet:w-full tablet:text-base tablet:font-normal">
          {description}
        </p>

        {!isMobile && (
          <div className="flex flex-col gap-4 w-[50%] tablet:w-full">
            <button className="h-[37px] bg-orange-500 text-white text-sm font-semibold mt-10 rounded-3xl">
              Acessar página Mills na ONU
            </button>
            <button className="h-[37px] bg-transparent border-[1px] border-orange-500 text-orange-500 rounded-3xl text-sm font-semibold">
              Saiba mais sobre as ODS
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};
