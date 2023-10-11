// import { useRouter } from "next/router";
// import { Card } from "./Card/Card";
import { MeetOurProductsProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import Slider from "react-slick";

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
  //const router = useRouter();
  const { isMobile } = useScreenWidth();

  const width = isCarrossel ? "w-[126px]" : "w-[100%]";
  const carrosselStyle = isCarrossel
    ? "gap-2 tablet:flex-row tablet:gap-4"
    : "gap-2 tablet:flex-col tablet:gap-4";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile && theme === "rentalLight" ? 5 : isMobile && theme === "rentalHeavy" ? 2 : 5,
    slidesToScroll: 1,
    centerMode: theme === "rentalLight" ? false : true,
    centerPadding: theme === "rentalLight" ? "0" : isMobile && theme === "rentalHeavy" ? "-95px" : "10px",
    initialSlide: theme === "rentalLight" ? 0 : isMobile && theme === "rentalHeavy" ? 1 : 2
  };

  return (
    <section
      className={`flex justify-center pb-20 pt-24 font-ibm-font bg-gray-50 tablet:px-4 tablet:py-6`}
    >
      <div className="max-w-[1200px] w-full">
        <h2
          className={` text-2xl font-semibold mb-10 tablet:text-lg tablet:mb-3 ${
            theme === "rentalLight" ? "text-orange-500" : "text-green-800"
          }`}
        >
          Conheça nossos produtos
        </h2>
        {isMobile && theme === "rentalLight" && (
          <div className={`flex ${carrosselStyle} overflow-auto`}>
            {cards?.map((card: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex justify-center relative text-center w-[226px] h-[472px] bg-center bg-no-repeat bg-cover tablet:bg-fit rounded tablet:${width} tablet:h-[330px]`}
                  style={{ backgroundImage: `url(${card?.image})` }}
                >
                  <div
                    className={`flex justify-center rounded items-end relative text-center w-[226px] h-[472px] bg-gradient-to-t from-black to-transparent tablet:${width} tablet:h-[330px]`}
                  >
                    <img className="absolute w-[226px] h-[472px] -z-10" src={card?.image} />
                    <div
                      className={`z-index-1 pb-[93px] h-[150px] font-semibold whitespace-pre-line text-white bottom-[20%] text-lg tablet:text-xs tablet:bottom-[10%] tablet:h-0 tablet:w-[85%]`}
                    >
                      <a href={card?.href ?? "#"} aria-label={card?.title} >
                        <p className="text-2xl px-4">{card?.title ?? null}</p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={`${carrosselStyle} overflow-auto ${isMobile && theme === "rentalLight" ? "hidden" : ""}`}>
          <Slider {...settings}>
            {cards?.map((card: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex justify-center relative text-center w-[226px] h-[472px] bg-center bg-no-repeat bg-cover tablet:bg-fit rounded tablet:${width} tablet:h-[330px]`}
                  style={{ backgroundImage: `url(${card?.image})` }}
                >
                  <div
                    className={`flex justify-center rounded items-end relative text-center w-[226px] h-[472px] bg-gradient-to-t from-black to-transparent tablet:${width} tablet:h-[330px]`}
                  >
                    <img className="absolute w-[226px] h-[472px] -z-10" src={card?.image} />
                    <div
                      className={`z-index-1 pb-[93px] h-[150px] font-semibold whitespace-pre-line text-white bottom-[20%] text-lg tablet:text-xs tablet:bottom-[10%] tablet:h-0 tablet:w-[100%]`}
                    >
                      <a href={card?.href ?? "#"} >
                        <p className="text-2xl px-4">{card?.title ?? null}</p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section >
  );
};
