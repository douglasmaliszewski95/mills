import Image from "next/image";
import { BenefitsProps } from "./types";

export const Benefits: React.FC<BenefitsProps> = ({ headerText, cards }) => {
  return (
    <section className="flex justify-center text-green-800">
      <div className="flex justify-between container tablet:flex-col">
        <div className="flex flex-col py-16 tablet:pt-4 pb-8 tablet:px-4">
          <h3 className="font-semibold w-[610px] text-2xl tablet:text-base tablet:w-full">
            {headerText}
          </h3>
          <div className="flex flex-wrap gap-2 mt-16 tablet:mt-5">
            {cards?.map((cardItem, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4"
                >
                  <img
                    src={cardItem.icon}
                    alt="Relógio"
                    className="mb-3 tablet:w-10 tablet:mb-0"
                  />
                  <div className="flex flex-col items-center tablet:ml-6 tablet:items-start">
                    <h4 className="font-semibold mb-4 tablet:text-sm">
                      {cardItem.header}
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      {cardItem.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
