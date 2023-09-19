import useScreenWidth from "@/services/hooks/useScreenWidth";
import { OverflowCardsProps } from "./types";
import { DnaBottom } from "@/assets/DnaBottom";

export const OverflowCards: React.FC<OverflowCardsProps> = (props) => {
  const { title, description, cards } = props;

  const { isDesktop } = useScreenWidth();

  return (
    <section className="bg-green-800 flex py-10 tablet:py-8 relative tablet:pt-7">
      {isDesktop && (
        <div className="absolute left-3 bottom-3">
          <DnaBottom color="white" />
        </div>
      )}
      <div className="grow"></div>
      <div className="container grow flex tablet:flex-col tablet:gap-6 items-center">
        <div className="basis-1/2 tablet:px-4 tablet:pt-0 pr-24 pb-24 tablet:pb-0">
          <h4 className="text-2xl mb-8 font-semibold text-white tablet:text-base tablet:mb-4">
            {title}
          </h4>
          <p className="text-white text-lg tablet:text-xs tablet:leading-5">
            {description}
          </p>
        </div>
        <div className="basis-1/2 flex flex-col gap-4 tablet:w-full tablet:pl-4">
          {cards?.map((text) => (
            <div
              key={text}
              className="bg-white py-4 pl-10 tablet:py-3 rounded-l-lg tablet:pl-4 tablet:rounded-l tablet:pr-12"
            >
              <p className="text-green-800 tablet:text-xs">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grow flex flex-col gap-4">
        {cards?.map((index) => (
          <div key={index} className="bg-white h-full w-full"></div>
        ))}
      </div>
    </section>
  );
};
