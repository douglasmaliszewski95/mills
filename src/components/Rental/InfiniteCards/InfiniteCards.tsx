import { DnaTop } from "@/assets/DnaTop";
import { InfiniteCardsProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const InfiniteCards: React.FC<InfiniteCardsProps> = (props) => {
  const { title, description, cards } = props;

  const { isDesktop } = useScreenWidth();

  return (
    <section className="bg-beige-200 flex pb-12 tablet:py-8 pt-[72px]">
      {isDesktop && (
        <div className="absolute mt-[-60px] left-3">
          <DnaTop color="#F37021" />
        </div>
      )}
      <div className="grow"></div>
      <div className="container grow flex tablet:flex-col gap-24 tablet:gap-6 items-center">
        <div className="basis-1/2 pt-12 tablet:px-4 tablet:pt-0">
          <h4 className="text-2xl mb-8 font-semibold text-green-800 pr-48 tablet:pr-0 tablet:text-base tablet:mb-6">
            {title}
          </h4>
          <p className="text-green-800 text-lg tablet:text-xs">{description}</p>
        </div>
        <div className="basis-1/2 flex flex-col gap-6 tablet:w-full tablet:pl-4">
          {cards?.map((text) => (
            <div
              key={text}
              className="bg-green-800 py-7 pl-12 tablet:py-5 tablet:pl-7 rounded-l-lg"
            >
              <p className="text-white font-semibold text-lg tablet:text-sm">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="grow flex flex-col gap-6">
        {cards?.map((index) => (
          <div key={index} className="bg-green-800 h-full w-full"></div>
        ))}
      </div>
    </section>
  );
};
