import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Section } from "@/components/shared/Section/Section";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useState } from "react";

export const MainWorks: React.FC<MainWorkProps> = (props) => {
  const { title, workCardsData = [] } = props;
  const [currentWork, setCurrentWork] = useState({
    src: workCardsData[0]?.src,
    title: workCardsData[0]?.title,
    
  });

  const { isMobile } = useScreenWidth();

  return (
    <Section
      sectionClass={`${isMobile ? "bg-white" : "bg-beige-200"} `}
      containerClass="flex flex-row tablet:flex-col tablet:mb-10"
    >
      <div className="w-[50%] tablet:w-full py-20 tablet:py-10">
        <h3 className="text-green-800 text-2xl font-semibold tablet:w-full w-[386px] tablet:text-base tablet:pl-[18px]">
          {title}
        </h3>
        {isMobile ? (
          <Carousel className="pl-[18px] mt-6" hasDots={false} slidesToShow={3}>
            {workCardsData.map((card, index) => (
              <button
                className={`max-w-[101px] mr-[10px] h-[89px] rounded-xl ${
                  card.title === currentWork.title ? "" : "filter grayscale"
                }`}
                key={index}
                onClick={() =>
                  setCurrentWork({
                    src: card.src,
                    title: card.title,
                  })
                }
              >
                <img
                  src={card.src}
                  className="w-full h-[full] rounded-lg"
                ></img>
              </button>
            ))}
          </Carousel>
        ) : (
          <div className="grid gap-y-16 gap-x-6 spacing-2 grid-cols-4 mt-8 w-[90%] tablet:w-full ">
            {workCardsData.map((card, index) => (
              <button
                className={`w-[135px] h-[119px] tablet:w-[101px] h-[89px] rounded-xl ${
                  card.title === currentWork.title ? "" : "filter grayscale"
                }`}
                key={index}
                onClick={() =>
                  setCurrentWork({
                    src: card.src,
                    title: card.title,
                  })
                }
              >
                <img
                  src={card.src}
                  className="w-full h-[119px] rounded-lg"
                ></img>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-[50%] tablet:h-[232px] tablet:w-full relative flex justify-center tablet:px-[18px]">
        <img
          src={currentWork.src}
          className="max-w-full tablet:w-full max-h-full"
        ></img>
        <h2 className="absolute bottom-[50px] tablet:bottom-[20px] text-lg tablet:text-xs text-white tablet:w-[60%] font-semibold w-[500px]">
          {currentWork.title}
        </h2>
      </div>
    </Section>
  );
};
