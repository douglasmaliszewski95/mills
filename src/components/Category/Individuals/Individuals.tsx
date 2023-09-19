import { IndividualsProps } from "./types";

export const Individuals: React.FC<IndividualsProps> = (props) => {
  const { title, cards } = props;

  return (
    <section className="bg-orange-500 flex justify-center items-center py-8 tablet:pb-6">
      <div className="w-full"></div>
      <div className="w-[1200px] shrink-0 flex gap-12 tablet:gap-8 items-center tablet:flex-col tablet:w-full">
        <div className="basis-1/2 px-4">
          <h3 className="text-white text-3xl font-semibold pr-10 tablet:pr-0 tablet:text-base">
            {title ?? null}
          </h3>
        </div>
        <div className="basis-1/2 tablet:w-full flex flex-col gap-3 tablet:pl-4">
          {cards.map((text, index) => (
            <div
              key={index}
              className="py-4 px-8 bg-white rounded-l tablet:pl-4 tablet:h-[52px] tablet:flex tablet:items-center"
            >
              <p className="text-green-800 font-semibold leading-[21px] tablet:text-xs">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="h-full flex flex-col gap-3">
          {cards.map((index) => (
            <div key={index} className="bg-white h-[53px] w-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
};
