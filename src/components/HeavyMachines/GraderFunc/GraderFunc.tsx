import { Section } from "@/components/shared/Section/Section";
import { GraderFuncProps, SquareProps } from "./types";
import { DnaTop } from "@/assets/DnaTop";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const GraderFunc: React.FC<GraderFuncProps> = (props) => {
  const { description, squaresInfo = [], title } = props;

  const { isMobile } = useScreenWidth();

  return (
    <section className="relative">
      {!isMobile && (
        <div className={`absolute right-[-5rem] top-1 object-fit`}>
          <DnaTop color="#F37021" />
        </div>
      )}
      <Section
        sectionClass="bg-gray-50"
        containerClass="flex flex-col tablet:px-4 text-green-800 gap-6 py-16 tablet:py-6 tablet:gap-2 "
      >
        <h3 className="text-2xl font-semibold tablet:text-base">{title}</h3>
        <p className="text-lg font-normal w-[60%] tablet:w-full tablet:text-xs">
          {description}
        </p>
        <div className="flex flex-row gap-6 mt-4 tablet:flex-col ">
          {squaresInfo.map((square: SquareProps) => (
            <div key={square.id} className="bg-gray-800 h-[200px] tablet:px-4 tablet:h-[45px] w-full rounded-lg items-center flex flex-col gap-6 tablet:gap-4 justify-center tablet:flex-row">
              <img
                src={square.src}
                className="tablet:w-[17px] tablet:h-[17px]"
              />
              <h4 className="text-lg w-[70%] tablet:w-full desktop:text-center tablet:text-sm">
                {square.title}
              </h4>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
};
