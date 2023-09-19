import { useRouter } from "next/router";
import { Card } from "./Card/Card";
import { MeetOurProductsProps } from "./types";

export const MeetOurProducts: React.FC<MeetOurProductsProps | any> = (
  props
) => {
  const {
    image,
    title,
    href,
    cards,
    theme = "rentalLight",
    isCarrossel = false,
  } = props;
  console.log({ cards });
  const router = useRouter();

  const width = isCarrossel ? "w-[126px]" : "w-[100%]";
  const carrosselStyle = isCarrossel
    ? "flex gap-2 tablet:flex-row tablet:gap-4"
    : "flex gap-2 tablet:flex-col tablet:gap-4";

  return (
    <section
      className={`flex justify-center pb-20 pt-24 font-ibm-font bg-gray-50 tablet:px-4 tablet:py-6`}
    >
      <div className="max-w-[1200px] w-full">
        <p
          className={` text-2xl font-semibold mb-10 tablet:text-lg tablet:mb-3 ${
            theme === "rentalLight" ? "text-orange-500" : "text-green-800"
          }`}
        >
          Conheça nossos produtos
        </p>
        <div className={`${carrosselStyle} overflow-auto`}>
          {cards?.map((card: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex justify-center relative text-center w-[226px] h-[472px] bg-center bg-no-repeat bg-cover rounded tablet:${width} tablet:h-[330px] cursor-pointer`}
                style={{ backgroundImage: `url(${card?.image})` }}
                onClick={() => router.push(href)}
              >
                <div
                  className={`flex justify-center items-end relative text-center w-[226px] h-[472px] bg-gradient-to-t from-black to-transparent tablet:${width} tablet:h-[330px]`}
                >
                  <div
                    className={`z-index-1 pb-[93px] h-[150px] font-semibold whitespace-pre-line text-white bottom-[20%] text-lg tablet:text-xs tablet:bottom-[10%] tablet:h-0 tablet:w-[85%]`}
                  >
                    <p>{card?.title ?? null}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
