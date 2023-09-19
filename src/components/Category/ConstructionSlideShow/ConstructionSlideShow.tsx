import { getImageSrc } from "@/utils/images";
import { Section } from "../../shared/Section/Section";
import { ConstructionSlideShowProps } from "./types";
import { useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Carousel } from "@/components/shared/Carousel/Carousel";

export const ConstructionSlideShow: React.FC<ConstructionSlideShowProps> = (
  props
) => {
  const { cards, mobileTheme = "white", theme = "beige-200" } = props;

  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    setSelectedCard(cards[0]);
  }, [cards]);

  return (
    <Section
      containerClass="flex gap-12 tablet:flex-col tablet:gap-6 tablet:pb-8"
      sectionClass={`bg-${theme} tablet:bg-${mobileTheme}`}
    >
      <div className="basis-1/2 pt-16 pb-[84px] tablet:pt-8 tablet:pb-0">
        <h4
          className={`text-${
            theme === "orange-500" ? "white" : "green-800"
          } font-semibold text-2xl mb-10 tablet:mb-6 max-w-[68%] tablet:max-w-full tablet:text-base tablet:px-4`}
        >
          Confira as principais obras em que a Mills esteve presente
        </h4>
        {isMobile ? (
          <div className="max-w-[100%] px-4">
            <Carousel variableWidth infinite={false}>
              {cards.map((image) => (
                <div
                  style={{
                    width: "104px",
                    height: "88px",
                  }}
                  key={image?.description}
                  className="w-[100px] h-[88px] rounded bg-cover bg-no-repeat pr-1"
                  onClick={() => setSelectedCard(image)}
                >
                  <div
                    style={{
                      backgroundImage: `url(${getImageSrc(image?.fields)})`,
                    }}
                    className="h-full bg-cover bg-no-repeat rounded"
                  >
                    <div
                      className={`w-full h-full cursor-pointer ${
                        selectedCard?.name !== image.name && "bg-black/80"
                      } rounded`}
                    ></div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-rows-2 grid-cols-4 w-full gap-y-5 gap-x-1">
            {cards.map((image, index) => (
              <div
                style={{
                  backgroundImage: `url(${getImageSrc(image?.fields)})`,
                }}
                className="w-[136px] h-[120px] rounded bg-cover bg-no-repeat"
                onClick={() => setSelectedCard(image)}
                key={image?.description}
              >
                <div
                  className={`w-full h-full cursor-pointer ${
                    selectedCard?.description !== image.description &&
                    "bg-black/80"
                  } rounded`}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isMobile ? (
        <div className="mx-4 relative">
          <img className="w-full" src={getImageSrc(selectedCard?.fields)} />
          <div className="absolute bottom-0 h-[200px] w-full px-8 pb-6 bg-gradient-to-b from-transparent to-black flex items-end justify-center">
            <p className="text-white font-semibold text-xs">
              {selectedCard?.fields?.content_text}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="basis-1/2 relative bg-no-repeat bg-cover h-full w-full"
          style={{
            backgroundImage: `url(${getImageSrc(selectedCard?.fields)})`,
          }}
        >
          <div className="absolute bottom-0 h-[200px] w-full px-16 pb-8 bg-gradient-to-b from-transparent to-black flex items-end justify-center">
            <p className="text-white font-semibold text-lg">
              {selectedCard?.fields?.content_text}
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};
