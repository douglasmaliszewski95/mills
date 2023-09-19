import { DnaTop } from "@/assets/DnaTop";
import { Section } from "@/components/shared/Section/Section";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ExcavatorFunctionProps } from "./types";
import { DnaBottom } from "@/assets/DnaBottom";

export const ExcavatorFunction: React.FC<ExcavatorFunctionProps> = (props) => {
  const {
    description,
    functions = [],
    title,
    imagePos = "top",
    dnaColor = "#F37021",
    hasImage = false,
  } = props;

  const { isMobile } = useScreenWidth();

  return isMobile ? (
    <section className="relative text-green-800">
      {imagePos === "top" ? (
        <div className={`absolute right-0 top-1 object-fit`}>
          <DnaTop color={dnaColor} width="full" height="80" />
        </div>
      ) : (
        <div className={`absolute bottom-0 right-1 object-fit`}>
          <DnaBottom color={dnaColor} />
        </div>
      )}

      <Section
        sectionClass="bg-gray-50"
        containerClass="flex flex-col-reverse gap-6 py-40 tablet:py-4"
      >
        <div
          className={`w-[50%] tablet:w-[100%] flex flex-col ${hasImage && 'pb-20'} gap-2 tablet:gap-4 tablet:px-4 ${
            imagePos === "top" ? "tablet:pt-20" : "tablet:pt-0"
          }`}
        >
          <h1 className="text-2xl font-semibold tablet:text-base">{title}</h1>
          <p className="text-lg font-normal tablet:text-xs">{description}</p>
        </div>
        {hasImage && (
          <div className="w-[100%]">
            <img src={hasImage}></img>
          </div>
        )}
      </Section>
      {!hasImage && (
        <div
          className={`w-[50%] tablet:w-full flex flex-col ${
            isMobile ? "bottom-0 h-auto" : "top-0 right-0"
          } h-full gap-2 pl-6 py-6 bg-gray-50 tablet:py-0 ${
            imagePos === "top" ? "tablet:pb-6" : "tablet:pb-28"
          } `}
        >
          {functions.map((item: string, index: number) => (
            <div
              key={index}
              className="bg-white rounded-l-lg h-[49px] flex items-center pl-4 text-lg font-normal tablet:text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  ) : (
    <section className="relative text-green-800">
      {imagePos === "top" ? (
        <div className={`absolute top-1 left-3 object-fit`}>
          <DnaTop color={dnaColor} />
        </div>
      ) : (
        <div className={`absolute bottom-1 left-3 object-fit`}>
          <DnaBottom color={dnaColor} />
        </div>
      )}

      <Section
        sectionClass="bg-gray-50"
        containerClass={`flex flex-row tablet:px-8 gap-6 ${
          hasImage ? "justify-center items-center" : "py-36"
        }  tablet:py-4 tablet:my-4 tablet:h-[600px]`}
      >
        <div className="w-[50%] tablet:w-[80%] flex flex-col gap-2 tablet:gap-4 tablet:pt-20">
          <h1 className="text-2xl font-semibold tablet:text-base">{title}</h1>
          <p className="text-lg font-normal tablet:text-xs">{description}</p>
        </div>
        {hasImage && (
          <div className="w-[50%]">
            <img src={hasImage}></img>
          </div>
        )}
      </Section>
      {!hasImage && (
        <div
          className={`w-[50%] tablet:w-full absolute flex flex-col ${
            isMobile ? "bottom-0 h-auto" : "top-0 right-0"
          } h-full gap-2 pl-6 py-6 bg-gray-50 tablet:py-0 tablet:pb-6 justify-center`}
        >
          {functions.map((item: string, index: number) => (
            <div
              key={index}
              className="bg-white rounded-l-lg h-[49px] flex items-center pl-4 text-lg font-normal tablet:text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
